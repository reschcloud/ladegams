# LADEGAMS

**⚠️ Die LADEGAMS ist kein weiteres Vergleichstool für Ladepreise!**

**Die Ladegams erlaubt es dir, individuelle Empfehlungen bereitzustellen, welche Ladekarte man an welcher Ladestation benutzen sollte.**


💡 **Beispiel 1:** Du bist in einem Unternehmen für den Fuhrpark verantwortlich und möchtest deinen Dienstwagennutzer:innen mitteilen, welche der vom Unternehmen zur Verfügung gestellten Ladekarten sie an welcher Ladestation bevorzugt nutzen sollen um die Kosten für öffentliches Laden zu optimieren. Die LADEGAMS ermöglicht dir genau das.

💡 **Beispiel 2:** Du bist der Familien-Nerd und hast deinen Eltern ein Elektroauto eingeredet (👍). Du besorgst ihnen zwei Ladekarten und richtest die LADEGAMS für sie ein, damit sie an den für sie wichtigsten Ladestationen schnell sehen, welche Karte sie verwenden sollen. 

⚙️ Um die LADEGAMS zu nutzen, brauchst du nur einen Webserver. Die Datenpflege erfolgt vollständig in einer strukturierten Textdatei (`custom_data.yaml`), die mit jedem Texteditor bearbeitet werden kann.



**Projekt-Website:** [LADEGAMS.eu](https://ladegams.eu)

**Demo:** [LADEGAMS.eu/demo](https://ladegams.eu/demo)

---

### Installation

1. Kopiere den Inhalt des Ordners ``app`` auf deinen Webserver
2. Ändere in der `index.html` und in der `info.html` die Zeile `<base href="https://ladegams.example/">` auf deinen tatsächliche URL
3. *Falls die Website nicht im Root der Domain liegt:* ändere in der Datei `manifest.webmanifest` die Zeile `"start_url": "/"` zu `"start_url": "/mein/unterverzeichnis/"`
4. Beginne mit der Konfiguration

### Konfiguration

Die `custom_data.yaml` ist bereits mit Beispielen für alle Eventualitäten befüllt.

Passe den Inhalt nach deinen Bedürfnissen an:

1. Öffne die `custom_data.yaml` und passe sie nach deinen Bedürfnissen an
2. Hinterlege die entsprechenden Logos in `custom_images`

Achte bei Anpassungen unbedingt auf die korrekte **Einrückung** (immer 2 Leerzeichen pro Ebene) und darauf, Anführungszeichen korrekt zu setzen. Versuche, dich bei den Infotexten kurz zu halten. Weniger Information ist oft wirkungsvoller.

Die **Logos** für *Website*, *Ladekarten* und *Ladestations-Betreiber* sollten SVG- oder PNG-Dateien mit transparentem Hintergrund sein. Die Dateinamen müssen exakt dem Namen in der `custom_data.yaml` entsprechen.

### Update

1. Mache ein Backup deiner `custom_data.yaml` und des Ordners `custom_images` 
2. Ersetze alle anderen Dateien bzw. Ordner gegen die neuere Version
3. Ändere in der `index.html` und in der `info.html` die Zeile `<base href="https://ladegams.example/">` auf deinen tatsächliche URL
4. *Falls die Website nicht im Root der Domain liegt:* ändere in der Datei `manifest.webmanifest` die Zeile `"start_url": "/"` zu `"start_url": "/mein/unterverzeichnis/"`

> [!IMPORTANT]
>
> Achte darauf, NICHT deine `custom_data.yaml` oder den Ordner `custom_images` zu überschreiben!
>

---

### Support und Kontakt

Feedback und Feature Requests sind willkommen! Wenn dir mein Tool hilft, freue ich mich sehr über eine kleine Unterstützung auf [Kofi](https://ko-fi.com/reschcloud).