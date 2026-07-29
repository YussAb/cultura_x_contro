# Cultura X Contro

Sito statico per Cultura X Contro: manifesto, eventi, artisti, merch e iscrizione newsletter.

## Struttura

- `index.html`: pagina principale del sito.
- `styles.css`: tema, layout responsive e animazioni.
- `script.js`: navigazione, cambio lingua, cambio tema, popup newsletter e form.
- `assets/`: immagini merch.
- `foto1.png`: immagine artista.
- `netlify.toml`: configurazione Netlify.
- `cultura-x-contro-phone.html`: versione standalone con asset incorporati.
- `cultura-x-contro-netlify-ready.zip`: pacchetto pronto per deploy/manual upload.

## Deploy

Il sito è pronto per Netlify.

- Production branch consigliato: `main`.
- Publish directory: root del repository (`.`).
- Build command: nessuno, è un sito statico.
- `netlify.toml` mantiene la configurazione necessaria per pubblicare dalla root.

I form newsletter usano Netlify Forms. Dopo il deploy, le iscrizioni sono visibili nella sezione `Forms` del pannello Netlify.

## Workflow Git

- `main`: prima release stabile e branch collegato al deploy production.
- `dev`: base di sviluppo per nuove modifiche.
- feature branch: creare nuovi branch partendo da `dev`, poi fare merge verso `dev` e infine verso `main` quando si vuole rilasciare.

Esempio:

```bash
git switch dev
git pull
git switch -c feature/nome-modifica
```

## Note

Il sito è statico e non richiede installazione di dipendenze. Per provarlo in locale basta aprire `index.html` nel browser.
