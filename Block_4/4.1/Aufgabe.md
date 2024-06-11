# Aufgabe 4.1

## Was kann man mit HopScotch machen?

- **RestAPI** (HTML) Nachrichten jeglicher Art senden:
    - GET
    - POST
    - PUT
    - PATCH
    - DELETE
    - HEAD
    - OPTIONS
    - CONNECT
    - TRACE
    - *eine anpassbare Methode*
- GraphQL-Anfragen senden
- Echtzeit-Kommunikation durchführen
    - WebSocket 
    - SSE
    - Socket.IO
    - MQTT (Messagebus)

## WWW Abfragen

### GET https://www.swisscom.ch/de/privatkunden.html
- Status: OK (200)
- Dauer: 1661 ms
- Datenmenge: 0.17 MB
- Header enthält viele Informationen

### GET https://www.zli.ch/ausbildungszentrum/giv-me-404
- Status: 404
- Erhielt trotzdem HTML
- Dauer: 937 ms (kürzer als Swisscom, wahrscheinlich wegen weniger Daten)
- Datenmenge: 30.95 Kb

### https://picsum.photos/seed/picsum/200/300
- Status: OK (200)
- Dauer: 701 ms
- Datenmenge: 6.31 Kb
- Bild wird gerendert

### https://pokeapi.co/api/v2/pokemon/ditto
- Status: OK (200)
- JSON-Daten
- Dauer: 368 ms
- Datenmenge: 24.08 Kb

### https://cat-fact.herokuapp.com/facts/random
- Status: OK (200)
- Ein wenig JSON-Daten
- Zufälliger Fakt ist auf Russisch xD
- Dauer: 439 ms

### https://jsonplaceholder.typicode.com/todos/1
- Status: OK (200)
- Dauer: 384 ms
- Datenmenge: 83 B (sehr klein)
- Kleines JSON erhalten
- Viele Header-Informationen gesetzt

### ### https://jsonplaceholder.typicode.com/posts
- Status: "Created" (201)
- Dauer: 349 ms
- Datenmenge: 15 B (sehr klein)
- Sehr kleines JSON erhalten
- Wieder viele Header-Informationen gesetzt

