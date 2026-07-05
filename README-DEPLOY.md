# Cultura X Contro - Deploy rapido

## Cosa c'e in questa cartella
- `index.html`: sito principale
- `styles.css`: stile
- `script.js`: navigazione, lingua e form newsletter
- `netlify.toml`: configurazione pronta per Netlify
- `cultura-x-contro-phone.html`: copia standalone utile per anteprima/condivisione

## Deploy consigliato: Netlify
1. Vai su Netlify e fai login.
2. Crea un nuovo sito da `Deploy manually` oppure trascina direttamente questa cartella/uno zip.
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
