# Cultura X Contro

Sito statico di Cultura Contro e Onasty. Nessun framework o dipendenza frontend da installare.

## Anteprima locale

Dalla root del repository:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Aprire `http://localhost:8000/`. Il server è solo un’anteprima: non invia email.
I moduli verificano i campi e mostrano esplicitamente che nessun dato è stato inviato o salvato.

## Controlli prima di una release

Servono Python 3 e Node.js (con `node:test`, Node 18 o successivo), senza pacchetti aggiuntivi.

```bash
python3 scripts/check_site.py
```

Il comando verifica struttura HTML, ID e riferimenti accessibili, destinazioni dei menu,
traduzioni IT/EN, file locali, schema dei moduli e sintassi JavaScript. Esegue inoltre i test
su routing, moduli, errori di rete, doppi invii, modalità locale e focus da tastiera.

Per preparare una release candidate esclusivamente locale:

```bash
python3 scripts/package_release.py --version 0.1.0-rc.1 --output /tmp/cultura-contro-release.zip
```

Lo ZIP contiene solo i file di esecuzione referenziati dal sito, la configurazione Netlify,
l’attribuzione geografica e un manifest con gli hash SHA-256. Esclude originali dei poster,
vecchi ZIP, documentazione di sviluppo e test. Il comando non esegue commit, push o deploy.

## Navigazione attuale

- Home con video YouTube prima dei menu, separatore Resistenza / Connessione / Rivoluzione e newsletter.
- `#cultura-contro` con tre segnaposto per le stampe, seguiti da Visione, Selezione, Storie, Eventi e Mappa.
- `#onasty` con due foto, Profilo, video, timeline «Le radici del mio suono», Filosofia e barra dei link. Il vecchio `#artisti` resta valido.
- `#mixcloud`: Foundation e Deep Cuts, con copertine e descrizioni IT/EN.
- `#soundcloud`: Beat Tape 1, Beat Tape 2, Random Jamz.
- `#visione`, `#storie`: spazi ancora da popolare.
- `#mappa`: Italia, Piemonte e province (`#mappa/piemonte/torino`, ecc.).
- Merch e Manifesto restano nel codice, fuori dal menu principale di Cultura Contro.

L’introduzione mostra Benvenuti → Cultura × Contro → Onasty e apre direttamente il sito.
Il tema iniziale è scuro. Su smartphone IT/EN è visibile a fianco di Home e del menu.
Le gallerie affiancano le immagini su desktop e scorrono orizzontalmente su mobile.
Il player Onasty resta disponibile durante la navigazione. Dopo Play riproduce in sequenza
Beat Tape 1, Beat Tape 2 e Random Jamz, poi ricomincia dalla prima raccolta.

## Ingresso della ciurma e moduli

Cultura Contro e Onasty condividono il gioco della parola d’ordine (`contro`). Lo sblocco
rimane nella sessione della scheda; la bandiera lascia posto al contenuto con una dissolvenza.
È un ingresso narrativo nel browser, non un controllo di accesso per contenuti riservati.

- `newsletter`: iscrizione, con lingua e sezione di provenienza.
- `crew-access`: richiesta di accesso, separata dalla newsletter, senza promessa di ricontatto.

In produzione i moduli sono gestiti da Netlify Forms. Gli invii reali e il rilevamento del
nuovo form vanno verificati su Netlify quando si potrà eseguire un deploy autorizzato.
La validazione locale non certifica la consegna delle email.

## File principali

- `index.html`: contenuti, menu e moduli.
- `styles.css`: stili di base storici; `art-direction.css`: direzione visiva e adattamenti attuali.
- `script.js`: routing, lingua, tema, intro, galleria, ingresso e moduli.
- `beat-player.js`: riproduzione e rotazione delle raccolte tramite il player SoundCloud.
- `map.js`, `map.css`, `map-data.js`: atlante; attribuzione in `assets/maps/ATTRIBUTION.md`.
- `assets/` contiene immagini del sito e copertine della timeline. Le copertine di Mixcloud e SoundCloud arrivano dai rispettivi CDN.
- `foto1_raw.jpg` e `foto2_raw.jpg` sono le foto della galleria Onasty.

Lo stato della prima release locale e le verifiche ancora necessarie sono in `RELEASE-READINESS.md`.
Non usare `cultura-x-contro-netlify-ready.zip`: è un archivio storico, precedente al sito attuale.

## Branch

- `main`: base della prima versione pubblicata.
- `dev`: sviluppo delle modifiche successive, creato dalla stessa base di `main`.
- Per modifiche isolate si possono creare branch `codex/...` partendo da `dev`.

La preparazione e i controlli locali non richiedono push. Pubblicare su `main` remoto
può avviare il deploy automatico: farlo solo quando si vuole pubblicare una nuova versione.
