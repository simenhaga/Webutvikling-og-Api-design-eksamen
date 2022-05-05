# PG6301 eksamen pgr6301-exam-simenhaga

[Heroku](https://pg6301-exam-simenhaga.herokuapp.com/)

[Test rapport](https://github.com/kristiania-pg6301-2022/pgr6301-exam-simenhaga/commit/c1cb9e68c05c8bc16a640175ed855fa631af5ef3#commitcomment-72979690)

Coverage rapporten gir meg feilmeldingen `Error: The process '/usr/local/bin/npx' failed with exit code 1` og jeg har dessverre ikke klart å finne ut va dette skyldes, selv om jeg har brukt nærmere 2 timer på å løse det.

## Egenutfylling av funksjonelle krav

* [x] Anonyme brukere skal se nyhetsaker når de kommer til nettsiden. Legg inn noen nyhetssaker for å demonstrere
* [ ] Når en ny sak publiseres, skal alle brukerne få se den nye saken umiddelbart. Bruk websockets for å sende oppdateringer
  * *Jeg har ikke benyttet tiden under eksamen til å lære meg Web Sockets og har heller benyttet tiden min på å få til de andre kravene så bra som mulig*
* [x] Brukere kan logge seg inn. Det anbefales at du implementerer at brukerne logger seg inn med Google, men andre mekanismer er også akseptabelt
* [x] En bruker som er logget inn kan se på sin profilside (userinfo fra Google)
* [x] Brukere skal forbli logget inn når de refresher websiden
* [ ] En bruker som er logget inn kan klikke på en nyhetssak for å se detaljene om nyhetssaken. Detaljene skal inkludere en nyhetskategori, overskrift, tekst og navn på den som publiserte den
  * *Dette kravet er delvis oppfylt. Det er kun innloggede brukere med Google som får lov til å se detaljer om nyhetssaker. Det eneste som ikke er fullført er at du må trykke på saken i sidebaren for å se saken. Den dukker opp etter fullført innlogging*
* [ ] "Redaksjonelle brukere" kan logge seg inn med Active Directory. Det må fungere å logge seg inn med en Active Directory på skolens AD ( domain_hint=egms.no )
  * *Ikke implementert*
* [x] Redaksjonelle brukere kan publisere nye nyhetsartikler
  * *Delvis implementert. Redaksjonelle brukere er i mitt tilfelle alle med godkjent pålogging fra Google*
* [x] Nyhetsartikkel skal inneholde en kategori valgt fra en nedtrekksliste "select", tittel "input" og tekst "textarea"
* [ ] Dersom noen allerede har publisert en nyhetsartikkel med samme tittel skal serveren sende HTTP status kode 400 og en feilmelding
  * *Ikke implementert*
* [x] Brukeren skal forhindres fra å sende inn en nyhetsartikkel som mangler kategori, tittel eller tekst
* [ ] En redaksjonell bruker skal kunne redigere en artikkel de selv har publisert
  * *Delvis implementert. Dette fungerer ikke, men grunnlaget for både PUT, updateArticle() og formet/skjemaet er laget. Fungerer dog ikke*
* [x] Alle feil fra serves skal presenteres til bruker på en pen måte, med mulighet for brukeren til å prøve igjen

## Egenutfylling av MÅ-krav

* [x] Besvarelsen skal inneholde en README-fil med link til Heroku og test coverage
* [x] npm start skal starte server og klient. Concurrently og parcel anbefales
* [x] npm test skal kjøre tester. Testene skal ikke feile
* [x] Koden skal ha konsistent formattering. Prettier og Husky anbefales
* [x] Nettsidene skal ha god layout med CSS Grid (Holy Grail layout) og horisontal navigasjonsmeny. Brukeren må kunne navigere overalt uten å bruke "back" eller redigere URL
  * *Bruker kan ikke navigere over alt uten å benytte Back*
* [x] Serveren validerer at brukeren er logget inn
* [x] Innleveringen skal være i form av en ZIP-fil. Maks størrelse på fila er 1MB
* [x] Artikler skal lagres i MongoDB
* [x] Applikasjonen skal deployes til Heroku
* [x] Testene skal kjøre på Github Actions



## Egenutfylling av tekniske krav

* [x] Oppsett av package.json, parcel, express, prettier
* [x] React Router
* [x] Express app
* [x] Kommunikasjon mellom frontend (React) og backend (Express)
* [x] Deployment til Heroku
* [x] Bruk av MongoDB
* [x] OpenID Connect
* [ ] Web Sockets
  * *Jeg har ikke benyttet tiden under eksamen til å lære meg Web Sockets og har heller benyttet tiden min på å få til de andre kravene så bra som mulig*
* [ ] Jest med dokumentert testdekning
  * *Jeg har benyttet jest test til å teste articles APIet (articelsApi.jsx).*
  * *Jest og Babel er installert og lagt til på serveren og testcoverage vises på Github Actions ved hjelp av Coveralls*
  * *Testdekningen er dessverre ikke god nok, og dette er noe jeg er klar over. Igjen gjelder arguementet om å fokusere på enkere krav for å kunne oppnå karakter C*
 
