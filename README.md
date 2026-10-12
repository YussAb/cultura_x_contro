# Cultura X Contro

Sito statico per Cultura X Contro: pagina di produzione ridotta al popup di iscrizione newsletter.

## Struttura

- `index.html`: pagina principale con popup newsletter.
- `styles.css`: layout responsive del popup.
- `script.js`: validazione e invio del form newsletter.
- `netlify.toml`: configurazione Netlify.
- `cultura-x-contro-netlify-ready.zip`: pacchetto storico; rigenerarlo prima di usarlo per un deploy manuale.

## Deploy

Il sito è pronto per Netlify.

- Production branch consigliato: `main`.
- Publish directory: root del repository (`.`).
- Build command: nessuno, è un sito statico.
- `netlify.toml` mantiene la configurazione necessaria per pubblicare dalla root.

Il form newsletter usa Netlify Forms. Dopo il deploy, le iscrizioni sono visibili nella sezione `Forms` del pannello Netlify.

## Workflow Git

- `main`: release di produzione ridotta al popup newsletter.
- `dev`: base di sviluppo per nuove modifiche.
- `codex/full-site-before-newsletter-only`: snapshot del sito completo prima della riduzione.
- feature branch: creare nuovi branch partendo da `dev`, poi fare merge verso `dev` e infine verso `main` quando si vuole rilasciare.

Esempio:

```bash
git switch dev
git pull
git switch -c feature/nome-modifica
```

## Note

Il sito è statico e non richiede installazione di dipendenze. Per provarlo in locale basta aprire `index.html` nel browser.
