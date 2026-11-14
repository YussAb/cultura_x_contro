# Prima release — verifica locale

Data: 14 novembre 2026. Candidato: `0.1.0-rc.1`.
Base remota prima del lavoro locale: `86cac56`.

## Esito

La base è adatta a una prima release candidate locale. Non è stato eseguito alcun commit,
push o deploy durante questa verifica. Non viene certificata l’integrazione live con Netlify.

## Problemi corretti

- La foto Onasty era un PNG di circa 2 MB, senza dimensioni dichiarate. Ora usa WebP
  responsive da circa 18/49 KB, dimensioni esplicite e caricamento differito.
- Su un server statico i moduli validi avrebbero tentato un POST non gestito. Su localhost
  mostrano ora una conferma di sola validazione: nessuna trasmissione o memorizzazione.
- Due invii rapidi potevano generare richieste duplicate; gli invii in corso vengono ignorati.
- Dopo la navigazione da una card, il focus poteva restare nel pannello nascosto. Ora passa
  al titolo della pagina visibile, senza interferire con lo scorrimento.
- Il titolo SoundCloud sbordava a 320 px. La dimensione mobile ora si adatta alla larghezza.
- Nel gioco d’ingresso i controlli password erano alti circa 22–26 px su smartphone. Ora
  hanno un’altezza minima di 44 px e il campo usa testo da 16 px, mantenendo identici i due ingressi.
- I campi honeypot sono esclusi anche dalla lettura assistita.
- La documentazione descriveva una home, un tema e un flusso di iscrizione ormai superati.
- Il vecchio archivio di deploy poteva essere confuso con una release valida. Il nuovo
  script prepara un archivio separato con le sole risorse attuali e un manifest verificabile.

## Evidenza ripetibile

Eseguire `python3 scripts/check_site.py`:

- struttura HTML, ID univoci e riferimenti a label/descrizioni/controlli;
- traduzioni delle chiavi usate in IT/EN, destinazioni dei menu e file locali referenziati;
- registrazione Netlify e campi dei moduli;
- sintassi di `script.js`, `map.js`, `map-data.js`;
- 13 test di regressione, eseguiti senza connessioni esterne: percorsi bloccati, cronologia
  senza duplicati, email invalide, honeypot, dati inviati, separazione newsletter/accesso,
  errori HTTP/rete, modalità locale, doppi invii e focus da tastiera.

Controllo browser locale: 12 percorsi in IT/EN a 320, 768 e 1280 px (72 combinazioni),
con destinazione e lingua corrette e senza sbordi orizzontali. Il controllo include il vecchio
percorso della mappa, che è stato rimesso nel menu di Cultura Contro sotto Eventi.
Verificato anche il percorso menu → Mappa → Indietro: ritorno con una sola azione,
con posizione ripristinata esattamente a 950 px nella prova eseguita. Nessun errore
JavaScript registrato nell’ultima sessione di verifica.

## Limiti e verifiche ancora necessarie

- Verificare su Netlify il rilevamento di `crew-access` e gli invii reali di entrambi i form,
  quando sarà possibile pubblicare. I test locali non possono confermare la raccolta in produzione.
- Il gioco della parola d’ordine è intenzionalmente client-side e non rende segreti i contenuti.
- Copertine musicali e font dipendono da servizi esterni. Senza rete possono mancare, mentre
  testi e link restano disponibili. Non è stata eseguita una campagna automatica sui link esterni.
- Le larghezze testate nel browser non sostituiscono una prova su Safari/iOS e Android reali.
- Visione e Storie sono ancora segnaposto editoriali. Alcune altre sezioni restano fuori menu.
- CSS e traduzioni conservano parti storiche non più usate. È debito di manutenzione da
  ripulire gradualmente; questa verifica non ha riscritto la grafica approvata.
- I PNG sorgenti vengono conservati. I WebP nuovi devono essere inclusi in un futuro commit;
  il pacchetto locale li include già tramite i riferimenti HTML.

## Comandi

```bash
python3 -m http.server 8000 --bind 127.0.0.1
python3 scripts/check_site.py
python3 scripts/package_release.py --output /tmp/cultura-contro-release.zip
```

## Secondo controllo

Eseguita una revisione aggiuntiva su casi limite e pacchetto locale:

- corretto il focus alla chiusura del menu mobile (Esc o cambio di larghezza);
- i feedback dei moduli seguono ora il cambio IT/EN anche dopo essere stati mostrati;
- aggiunti due test di regressione: 13 test JavaScript complessivi;
- il controllo HTML ora rileva anche attributi duplicati;
- il manifest del pacchetto calcola lo stato delle modifiche locali dai file di esecuzione,
  invece di indicarlo sempre come vero;
- archivio rigenerato e verificato nuovamente; provato il pacchetto estratto su `localhost:8001`,
  separato dalla cartella di lavoro;
- nel pacchetto verificati ingresso Onasty, parola errata/corretta, sblocco condiviso, foto WebP,
  simulazione email, traduzione del feedback, menu Esc, selettore lingua unico, Mixcloud,
  SoundCloud e mappa Torino a 390 px: nessuno sbordo e nessun errore JavaScript registrato.

Anche questo passaggio resta esclusivamente locale: nessun push/deploy o invio reale a Netlify.

## Aggiornamento contenuti dopo i controlli

Le immagini della galleria sono state sostituite da tre placeholder con scritte centrate
`stampa#1`, `stampa#2`, `stampa#3`. Scorrimento e controlli restano disponibili.
Le immagini dei poster ancora presenti restano archiviate nella cartella di lavoro, ma non sono più
referenziate dalla pagina né incluse nel nuovo pacchetto di release.
