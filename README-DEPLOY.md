# Preparazione della release

In questa fase si lavora solo su localhost. Nessun comando qui sotto pubblica il sito.

## Verificare e preparare

```bash
python3 scripts/check_site.py
python3 scripts/package_release.py --version 0.1.0-rc.1 --output /tmp/cultura-contro-release.zip
```

Aprire lo ZIP per controllare `release-manifest.json`. Gli hash identificano esattamente i file
inclusi. L’archivio contiene le risorse di esecuzione, non PNG sorgenti o vecchi pacchetti.

Per provare proprio il pacchetto in una seconda cartella locale:

```bash
mkdir -p /tmp/cultura-contro-rc1
python3 -m zipfile -e /tmp/cultura-contro-release.zip /tmp/cultura-contro-rc1
python3 -m http.server 8001 --bind 127.0.0.1 --directory /tmp/cultura-contro-rc1
```

## Quando sarà possibile pubblicare

Solo con una nuova autorizzazione al deploy:

- repository: branch `main`, publish directory `.` e nessun build command;
- oppure caricamento manuale dei contenuti del nuovo pacchetto, con `index.html` nella root;
- includere nel repository tutte le risorse WebP referenziate: i file non tracciati da Git non
  vengono trasferiti con un push;
- verificare che Netlify rilevi entrambi i form `newsletter` e `crew-access`;
- provare con un invio controllato sia la newsletter sia la richiesta d’accesso, verificando
  che siano registrate nel form corretto e con lingua/sezione corrette;
- controllare il sito pubblicato su uno smartphone reale e verificare i link di ascolto.

Su localhost gli invii sono esplicitamente simulati: nessuna email viene inviata o salvata.
I test automatici usano un trasporto simulato per verificare i casi di successo ed errore.
Non costituiscono una verifica del servizio Netlify.

L’archivio `cultura-x-contro-netlify-ready.zip` incluso storicamente nel repository non va
usato per il sito attuale.
