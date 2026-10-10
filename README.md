# CREATEZ · Event Control Center

Mobile Portal-App (PWA) der **CREATEZ GmbH** — Eventdienstleistung &
Generalunternehmung: Crews für Auf- und Abbau, Messebau, Personalgestellung,
Materialverleih, Ausschreibungen und Qualitätsstandard-Zertifizierung.
Offline nutzbar und auf dem Smartphone installierbar.

## Module

| Modul | Funktion |
|---|---|
| 🏠 **Control Center** | Begrüßung, nächstes Event, Kennzahlen, **Fristen-Radar** (überfällige Rechnungen, Zertifikate, Rückgaben, Abgabefristen, Steuertermine) |
| 📅 **Kalender** | Events (Aufbau, Durchführung, Abbau, Messebau, Verleih …) mit Teilen per WhatsApp / `.ics`-Export & -Import |
| ⭐ **Qualitätsstandard** | Regelwerk als Checklisten-Vorlagen, pro Event abhaken, **Event-Report-PDF** zur Dokumentation beim Kunden — jedes wiederkehrende Event wird gleich |
| 👷 **Crew & Personal** | Rollen, Skills, Stundensätze, Zertifikate mit Ablauf-Warnung, **Setcard-PDF** |
| 📦 **Material & Verleih** | Bestand, Tagessätze, Verleih-Status mit Rückgabe-Warnung |
| 📢 **Ausschreibungen** | Vergaben mit Abgabefrist, Status und Volumen |
| 💶 **Finanzen** | Buchungen, Umsatz-Diagramm, **Angebote** (`ANG-…`) und **Rechnungen** (`RE-…`) mit Briefkopf-PDF, CSV-Export |
| 🧑‍💼 **Verwaltung** | Kunden, Partner-Netzwerk (Security, Hostessen, Technik …), Fuhrpark, Pflichttermine, Notizen, Backup, PIN |

## Dateien

- `app.html` – die komplette App (eine Datei, offline-fähig)
- `index.html` – Startseite mit Button „Control Center öffnen"
- `sw.js`, `manifest.webmanifest`, `icon*.svg` – PWA-Installation

## Nutzung

GitHub Pages aktivieren (Settings → Pages → Branch `main`), dann
`https://<user>.github.io/<repo>/app.html` am Handy öffnen →
„Zum Startbildschirm hinzufügen". Alle Daten bleiben lokal auf dem Gerät;
Backup über Mehr → Daten → JSON-Export.

## Admin-Zugang (PIN)

Die App hat kein Server-Backend und keine Benutzerverwaltung: Nach Eingabe der
PIN stehen **alle Module uneingeschränkt** zur Verfügung — es gibt keine
eingeschränkten Rollen.

- Erst-PIN: **1234** – gilt **pro Gerät/Browser** (die PIN wird lokal auf dem
  Gerät gespeichert, nicht auf einem Server). Auf einem neuen Gerät gilt also
  wieder die Erst-PIN.
- PIN ändern: in der App unter „Mehr" → „PIN ändern".
- PIN vergessen: auf dem Login-Bildschirm „PIN vergessen?" antippen – die PIN
  wird zurückgesetzt und direkt eine neue festgelegt. Alle Daten (Events, Crew,
  Material, Finanzen, Kunden, Rechnungen …) bleiben dabei erhalten.
- **Notfall-Zugang:** App-Adresse mit `?pinreset=1` aufrufen, z. B.
  `…/app.html?pinreset=1`. Das setzt die PIN zurück (Daten bleiben erhalten) und
  räumt zusätzlich alte Caches und Service-Worker-Registrierungen weg. Dieser Weg
  funktioniert auch dann, wenn ein Gerät noch eine veraltete App-Version anzeigt,
  weil die Adresse mit Query am Cache vorbeigeht.

Da alle Daten lokal auf dem Gerät liegen, sieht jedes Gerät seinen eigenen
Datenstand. Für denselben Stand auf mehreren Geräten: Backup über
„Mehr → Daten → JSON-Export" und auf dem anderen Gerät importieren.

### Updates auf installierten Geräten

`sw.js` liefert HTML **network-first** aus: Beim Start wird immer die aktuelle
`app.html` vom Server geholt, der Cache dient nur als Offline-Reserve. Zuvor galt
cache-first für alles — installierte Geräte bekamen dadurch dauerhaft eine alte
Version und Updates kamen nie an.
