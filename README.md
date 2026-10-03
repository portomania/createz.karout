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
