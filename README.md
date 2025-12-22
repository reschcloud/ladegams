# LADEGAMS

**⚠️ Die LADEGAMS ist kein weiteres Vergleichstool für Ladepreise!**

**Die Ladegams erlaubt es dir, individuelle Empfehlungen bereitzustellen, welche Ladekarte man an welcher Ladestation benutzen sollte.**


💡 **Beispiel:** Du bist in einem Unternehmen für den Fuhrpark verantwortlich und möchtest deinen Dienstwagennutzer:innen mitteilen, welche der vom Unternehmen zur Verfügung gestellten Ladekarten sie an welcher Ladestation bevorzugt nutzen sollen um die Kosten für öffentliches Laden zu optimieren. Die LADEGAMS ermöglicht dir genau das.

⚙️ Um die LADEGAMS zu nutzen, brauchst du nur einen Webserver. Die Datenpflege erfolgt vollständig in einer strukturierten Textdatei (`data.yaml`), die mit jedem Texteditor bearbeitet werden kann.



Projekt-Website: [ladegams.eu](https://ladegams.eu)

---

### Installation

1. Kopiere den Inhalt des Ordners ``app`` auf deinen Webserver
2. Öffne die `data.yaml` und passe sie nach deinen Bedürfnissen an
3. Rufe die Website auf und beginne mit den Anpassungen der `data.yaml`

### Konfiguration

Die `data.yaml` ist bereits mit Beispielen für alle Eventualitäten befüllt.

Achte bei Anpassungen unbedingt auf die korrekte **Einrückung** (immer 2 Leerzeichen pro Ebene) und darauf, Anführungszeichen korrekt zu setzen. Versuche, dich bei den Infotexten kurz zu halten. Weniger Information ist oft wirkungsvoller.

Die **Logos** für *Website*, *Ladekarten* und *Ladestations-Betreiber* müssen im Ordner `images` angelegt werden. Es sollten SVG- oder PNG-Dateien sein. Die Dateinamen müssen exakt dem Namen in der `data.yaml` entsprechen.

### Update

Alle Nutzdaten sind in der `data.yaml` gespeichert. Ersetze einfach die anderen Dateien gegen neuere Versionen, wenn diese veröffentlicht werden.

---

### Support und Kontakt

Feedback und Feature Requests sind willkommen! Wenn dir mein Tool hilft, freue ich mich sehr über eine kleine Unterstützung auf [Kofi](https://ko-fi.com/reschcloud).