# Cultura X Contro - Deploy rapido

## Cosa c'e in questa cartella
- `index.html`: sito principale
- `styles.css`: stile di base
- `art-direction.css`: redesign Ink & Defiance
- `assets/ink-and-defiance-*.webp`: artwork responsive della homepage (480, 768 e 1024 px).
- Il tema iniziale è Bianco; le scelte successive vengono ricordate nel browser.
- `script.js`: navigazione, lingua e form newsletter
- `netlify.toml`: configurazione pronta per Netlify
- `cultura-x-contro-phone.html`: reindirizzamento alla homepage

## Deploy consigliato: Netlify
1. Vai su Netlify e fai login.
2. Collega il repository al branch `main`, oppure carica la cartella aggiornata tramite `Deploy manually`. Lo zip incluso è storico e va rigenerato prima dell’uso.
3. Se carichi la cartella cosi com'e, Netlify pubblichera `index.html` come homepage.
4. Dopo il primo deploy, il form `newsletter` iniziera a raccogliere le email in `Forms` nel pannello Netlify.

## Newsletter
- Il form usa validazione email HTML5 (`type=email`, `required`).
- Il form invia a Netlify Forms.
- C'e una protezione anti-spam base tramite honeypot (`company`).
- Ogni invio salva anche la lingua (`it/en`) e la sezione di origine.

## Nota importante
- Il sito e pronto anche per essere indicizzato, se vorrai renderlo pubblico normalmente.
- La mail evento ufficiale e `controcultura.collective@gmail.com`.

## Passo successivo consigliato
Quando vuoi una newsletter vera e propria, puoi sostituire Netlify Forms con Buttondown o un altro provider senza rifare il sito da zero.
