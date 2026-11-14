#!/usr/bin/env python3
"""Dependency-free structural and regression checks. Never contacts external services."""
import json
import re
import subprocess
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.nodes = []
        self.stack = []
        self.forms = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        names = [name for name, _ in attrs]
        if len(names) != len(set(names)):
            self.errors.append(f"Duplicate attribute on <{tag}> at line {self.getpos()[0]}")
        attrs = dict(attrs)
        self.nodes.append((tag, attrs))
        if tag == 'form':
            if any(t == 'form' for t, _ in self.stack):
                self.errors.append('Nested form')
            self.forms.append({'attrs': attrs, 'fields': []})
        if tag in ('input', 'button'):
            for parent, data in reversed(self.stack):
                if parent == 'form':
                    if attrs.get('name'):
                        self.forms[-1]['fields'].append(attrs)
                    break
        if tag not in VOID:
            self.stack.append((tag, attrs))

    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1][0] != tag:
            self.errors.append(f'Unbalanced closing tag </{tag}> at line {self.getpos()[0]}')
        else:
            self.stack.pop()


def local_asset(value):
    url = urlsplit(value)
    if not value or url.scheme or url.netloc or value.startswith('#'):
        return None
    return unquote(url.path).lstrip('./')


def check():
    failures = []
    parser = SiteParser()
    parser.feed((ROOT / 'index.html').read_text())
    failures += parser.errors
    failures += [f'Unclosed <{tag}>' for tag, _ in parser.stack]
    nodes = parser.nodes
    ids = [a['id'] for _, a in nodes if 'id' in a]
    failures += [f'Duplicate id: {key}' for key, count in Counter(ids).items() if count > 1]
    id_set = set(ids)
    # Evaluate only the static translation dictionary, never site code or a browser.
    extraction = """
const fs = require('node:fs'), vm = require('node:vm');
const s = fs.readFileSync('script.js', 'utf8');
const literal = s.slice(s.indexOf('const translations = ') + 'const translations = '.length, s.indexOf('\\nlet currentLang')).trim().replace(/;$/, '');
process.stdout.write(JSON.stringify(vm.runInNewContext('(' + literal + ')')));
"""
    dictionaries = json.loads(subprocess.check_output(['node', '-e', extraction], cwd=ROOT, text=True))
    assets = set()
    for tag, attrs in nodes:
        for attribute in ('data-i18n', 'data-i18n-placeholder', 'data-i18n-aria-label', 'data-i18n-aria-roledescription'):
            if attribute in attrs:
                for lang in ('it', 'en'):
                    if attrs[attribute] not in dictionaries[lang]:
                        failures.append(f'Missing {lang} translation: {attrs[attribute]}')
        for attribute in ('for', 'aria-labelledby', 'aria-describedby', 'aria-controls'):
            for target in attrs.get(attribute, '').split():
                if target not in id_set:
                    failures.append(f'Broken {attribute}: {target}')
        if attrs.get('data-tab-target') and attrs['data-tab-target'] not in id_set:
            failures.append(f'Broken navigation: {attrs["data-tab-target"]}')
        if tag == 'img':
            if 'alt' not in attrs:
                failures.append(f'Missing alt: {attrs.get("src")}')
            if not attrs.get('width') or not attrs.get('height'):
                failures.append(f'Unreserved image dimensions: {attrs.get("src")}')
        for attr in ('src', 'href'):
            asset = local_asset(attrs.get(attr, ''))
            if asset:
                assets.add(asset)
        for item in attrs.get('srcset', '').split(','):
            asset = local_asset(item.strip().split()[0]) if item.strip() else None
            if asset:
                assets.add(asset)
    failures += [f'Missing local file: {p}' for p in sorted(assets) if not (ROOT / p).is_file()]
    registrations = {f['attrs'].get('name') for f in parser.forms if 'data-netlify' in f['attrs']}
    for form in parser.forms:
        attrs, fields = form['attrs'], form['fields']
        if 'newsletter-form' not in attrs.get('class', '').split():
            continue
        by_name = {f['name']: f for f in fields}
        if attrs.get('name') not in registrations:
            failures.append(f'Form not registered for Netlify: {attrs.get("name")}')
        for field in ('form-name', 'email', 'company', 'lang', 'source_section'):
            if field not in by_name:
                failures.append(f'Missing {field} in {attrs.get("name")}')
        if by_name.get('form-name', {}).get('value') != attrs.get('name'):
            failures.append(f'Wrong form-name in {attrs.get("name")}')
        if by_name.get('source_section', {}).get('value') != attrs.get('data-newsletter-source'):
            failures.append(f'Wrong source_section in {attrs.get("name")}')
    for name in ('script.js', 'map.js', 'map-data.js'):
        result = subprocess.run(['node', '--check', name], cwd=ROOT, capture_output=True, text=True)
        if result.returncode:
            failures.append(result.stderr)
    if failures:
        for failure in failures:
            print('FAIL:', failure)
        raise SystemExit(1)
    print(f'PASS: HTML structure, {len(ids)} unique IDs, IT/EN translations, {len(assets)} local assets and {len(parser.forms)} forms')
    subprocess.run(['node', '--test', 'tests/site.test.cjs'], cwd=ROOT, check=True)

if __name__ == '__main__':
    check()
