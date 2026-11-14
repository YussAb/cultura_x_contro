#!/usr/bin/env python3
"""Create a local release ZIP from runtime references. Does not deploy or use the network."""
import argparse
import hashlib
import json
import re
import subprocess
import zipfile
from pathlib import Path
from urllib.parse import urlsplit
from check_site import ROOT, SiteParser, local_asset


def runtime_files():
    parser = SiteParser()
    parser.feed((ROOT / 'index.html').read_text())
    files = {'index.html', 'netlify.toml', 'cultura-x-contro-phone.html', 'assets/maps/ATTRIBUTION.md'}
    for _, attrs in parser.nodes:
        values = [attrs.get('src', ''), attrs.get('href', '')]
        values += [s.strip().split()[0] for s in attrs.get('srcset', '').split(',') if s.strip()]
        for value in values:
            asset = local_asset(value)
            if asset:
                files.add(asset)
    # Keep local stylesheet assets if they are added in the future.
    for name in list(files):
        if name.endswith('.css'):
            pattern = r'''url\(\s*(?:"([^"]*)"|'([^']*)'|([^\)\s]+))\s*\)'''
            for matches in re.findall(pattern, (ROOT / name).read_text()):
                value = next(part for part in matches if part)
                if not urlsplit(value).scheme and not value.startswith('#'):
                    dependency = (ROOT / name).parent / value
                    files.add(dependency.resolve().relative_to(ROOT).as_posix())
    for name in files:
        target = (ROOT / name).resolve()
        if not target.is_relative_to(ROOT) or not target.is_file():
            raise SystemExit(f'Missing or invalid runtime asset: {name}')
    return sorted(files)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--version', default='0.1.0-rc.1')
    parser.add_argument('--output', type=Path, default=Path('/tmp/cultura-contro-release.zip'))
    args = parser.parse_args()
    subprocess.run(['python3', str(ROOT / 'scripts/check_site.py')], cwd=ROOT, check=True)
    files = runtime_files()
    revision = subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD'], cwd=ROOT, text=True).strip()
    manifest = {
        'version': args.version,
        'base_revision': revision,
        'includes_local_changes': bool(subprocess.check_output(
            ['git', 'status', '--porcelain', '--untracked-files=all', '--', *files],
            cwd=ROOT, text=True
        ).strip()),
        'note': 'Local release candidate. No deploy performed; live Netlify form delivery remains to be verified.',
        'files': {name: hashlib.sha256((ROOT / name).read_bytes()).hexdigest() for name in files}
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(args.output, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for name in files:
            archive.write(ROOT / name, arcname=name)
        archive.writestr('release-manifest.json', json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    print(f'Created {args.output}: {len(files)} runtime files, {args.output.stat().st_size / 1024 / 1024:.2f} MiB')
    print('No source PNGs, historical ZIPs, tests or development scripts included.')

if __name__ == '__main__':
    main()
