# Cultura X Contro

Sito statico per Cultura X Contro: manifesto, eventi, artisti, merch e iscrizione newsletter.

## Struttura

- `index.html`: pagina principale del sito.
- `styles.css`: layout responsive e animazioni di base.
- `art-direction.css`: redesign Ink & Defiance, tipografia e palette.
- `map.js`, `map.css`, `map-data.js`: atlante interattivo, con Piemonte e otto province esplorabili; le altre regioni sono bloccate.
- `assets/maps/ATTRIBUTION.md`: provenienza e licenza dei confini.
- `script.js`: navigazione, cambio lingua, cambio tema, popup newsletter e form.
- `assets/`: artwork della homepage e immagini merch.
- `foto1.png`: immagine artista.
- `netlify.toml`: configurazione Netlify.
- `cultura-x-contro-phone.html`: reindirizzamento alla homepage.
- `cultura-x-contro-netlify-ready.zip`: pacchetto storico; rigenerarlo prima di un deploy manuale.

## Deploy

Il sito è pronto per Netlify.

- Production branch consigliato: `main`.
- Publish directory: root del repository (`.`).
- Build command: nessuno, è un sito statico.
- `netlify.toml` mantiene la configurazione necessaria per pubblicare dalla root.

I form newsletter usano Netlify Forms. Dopo il deploy, le iscrizioni sono visibili nella sezione `Forms` del pannello Netlify.

## Workflow Git

- `main`: sito completo con redesign Ink & Defiance, branch di produzione.
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

## Mappa

Aprire `#mappa`, `#mappa/piemonte` o, ad esempio, `#mappa/piemonte/torino`. I testi iniziali descrivono i capoluoghi; Situazioni e Artisti sono da compilare. Contenuti IT/EN in `map.js`; confini SVG locali in `map-data.js`. Indietro e Avanti conservano il percorso, la posizione di scorrimento e la scheda aperta.
