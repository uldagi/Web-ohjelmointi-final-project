# Soittolistat

Web-ohjelmoinnin lopputyö, jossa voi hakea kappaleita ja koota niistä omia soittolistoja.

- **Kappalehaku** hakee kappaleita nimellä iTunes Search API:sta. Hakutuloksia voi lisätä valitulle soittolistalle.
- **Omat soittolistat** näyttää luodut listat ja tarjoaa lomakkeen uuden listan luomiseen.
- **Yksittäinen soittolista** näyttää listan kappaleet. Listan nimeä voi vaihtaa ja kappaleita voi poistaa.

Soittolistat tallentuvat selaimen `localStorage`-muistiin ja säilyvät sivun päivityksen jälkeen samassa selaimessa.

## Käynnistä paikallisesti

Tarvitset Node.js:n ja npm:n. Avaa terminaali projektikansiossa, jossa on `package.json`.


npm ci
npm run dev


Avaa terminaalin näyttämä paikallinen osoite. Jos Windowsin PowerShell estää npm.ps1-skriptin ajamisen, käytä komentoja `npm.cmd ci` ja `npm.cmd run dev`.

## Tarkista ja käännä


npm run lint
npm run build


Ensimmäinen komento tarkistaa koodin ESLintillä. Toinen luo julkaistavan version `dist`-kansioon.

## Tekniikat

- React ja Vite sovelluksen toteutukseen ja kääntämiseen
- React Router ja `HashRouter` näkymien välillä liikkumiseen
- Bootstrap ja CSS käyttöliittymän tyyleihin
- iTunes Search API kappaletietojen hakemiseen
