# correlaidx-kn-education
Website für die [Workshops/Education Projekte von CorrelAid X Austria](https://correlaid.github.io/correlaidx-austria-education/).


## How-to: Neuen Workshop erstellen

1. Checkout Branch dev
2. Dupliziere template.json im *workshops* Ordner und benenne die Datei z.B. *intro_to_py.json*
3. Passe die Datei ensprechend an, siehe [Konfiguration Workshop JSON](#Konfiguration-Workshop-JSON)
4. Füge Bilder (Thumbnail und Hero) dem `static/img/` Ordner hinzu
5. Füge den Dateinamen aus 2. (*intro_to_py.json*) zu *settings.json* unter `active` hinzu:
```json
{
	"active": [
		"...",
		"intro_to_py.json"
	],
	"inactive": [
		"template.json"
	]
}
```
6. Comit & Upload
7. Erstelle einen Pull-request



## Konfiguration Workshop JSON
Es ist immer möglich HTML-tags zu benutzen, **hier nur auf quotes (zur not escapen) achten.**

```json
{
	"name": "Name des Workshops",
	"sub": "Lead-Text für die Detail-Seite",
	"description": "Beschreibung für die Detail-Seite: Was wird gemacht?",
	"teaser": "Kurzer Teaser für den Workshop für die Overview-Seite",
	"venue": "Ort des Workshops",
```
`previous` wird aktuell noch nicht benutzt; Daten in chronologischer Reihenfolge
```json
	"dates": {
		"previous": ["24.12.0"],
		"next": ["15.4.2022", "16.04.2022"]
	},
	"schedule": {
		"custom key 1": "point of order 1",
		"custom key 2": "point of order 2",
		"12:00-13:00": "point of order 3"
	},
	"structure": "Struktur des Workshops für Detail-Seite",
```

Bei Details, können wie bei `schedule` beliebige Keys verwendet werden.
Gedacht für Infos wie Sprache, o.Ä.

```json
	"details": {
		"Packages": "...",
		"Sprache": "Deutsch"		
	},
	"requirements": "Wird unter Voraussetzungen auf der Detail-Seite angezeigt",
```
`authors` sind die Ersteller und Durchführer des Kurses

```json
	"authors": [
		"Jon Doe", "Max Müller"
	],
	"images": {
		"thumbnail": "Für Thumbnail auf der Overview-Seite: Dateiname des Bildes im static/img/ folder",
		"hero": "Für Hero-circle-image auf der Detail-Seite: Dateiname des Bildes im static/img/ folder"
	},
```
Wird auf der Overview-Seite angezeigt

```json
	"tags": [
		"template", "json", "pyhton"
	]
}
```
