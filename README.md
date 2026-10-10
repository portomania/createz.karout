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

## Übergabe an andere Systeme

Die App ist bewusst eigenständig: eine Datei, offline nutzbar, ohne Server.
Andere Systeme werden nicht angebunden, sondern **über Dateien bedient** — so
bleibt jedes Werkzeug für sich lauffähig und austauschbar.

**Event-Report als JSON** — in der Checkliste eines Events über
„📤 Daten übergeben (JSON)". Gedacht zum Einspielen in ein Kundensystem
(z. B. TRIXITT), damit der Qualitätsstandard dort dokumentiert ist, ohne ihn
abzutippen. Aufbau:

```json
{
  "format": "createz.event-report",
  "version": 1,
  "erstellt": "2026-10-11T08:30:00.000Z",
  "dienstleister": { "name": "…", "anschrift": "…", "telefon": "…",
                     "mail": "…", "registergericht": "…",
                     "geschaeftsfuehrer": "…", "ustIdNr": "…" },
  "event": { "id": "…", "titel": "…", "datum": "2026-10-11",
             "von": "07:00", "bis": "15:00", "typ": "Messebau",
             "ort": "…", "kunde": "…", "notiz": "…" },
  "qualitaetsstandard": {
    "name": "CREATEZ Qualitätsstandard",
    "erfuellt": 9, "gesamt": 10, "bemerkung": "…",
    "punkte": [ { "punkt": "Fläche eingemessen …", "erfuellt": true } ]
  }
}
```

`format` und `version` sind stabil: Erweiterungen kommen als neue Felder dazu,
bestehende Felder behalten Name und Bedeutung. Ändert sich das grundlegend,
steigt `version`.

Daneben gibt es weiterhin: vollständiges **JSON-Backup** (Mehr → Daten),
**.ics** für Kalender, **CSV** für die Buchhaltung und die **PDFs**
(Angebot, Rechnung, Setcard, Event-Report).
