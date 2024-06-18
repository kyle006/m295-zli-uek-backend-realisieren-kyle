# Aufgabe 6.1

## Welches sind die 3 wichtigsten Ressourcen der API?

1. Tracks
2. Playlists
3. Alben

## Welche Properties haben diese 3 Ressourcen? Wie sieht das JSON eines dieser Objekte aus?

### Album
- album_type
- available_markets
- external_urls
- href
- id
- images
- name
- release_date
- release_date_precision
- restrictions
- total_tracks
- type
- uri
- artists
- copyrights
- external_ids
- genres
- label
- popularity
- tracks

### Playlist
- collaborative
- description
- external_urls
- followers
- href
- id
- images
- name
- owner	
- public
- snapshot_id
- tracks
- type
- uri

### Track
- album
- artists
- available_markets
- disc_number
- duration_ms
- explicit
- external_ids
- external_urls
- href
- id
- is_local
- is_playable
- linked_from
- name
- popularity
- preview_url
- restrictions
- track_number
- type
- uri

#### example.json
```
{
  "album": "string",
  "artists": [
    {
      "external_urls": "string",
      "followers": "string",
      "genres": [
        "Prog rock",
        "Grunge"
      ],
      "href": "string",
      "id": "string",
      "images": [
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
          "width": 300
        }
      ],
      "name": "string",
      "popularity": 0,
      "type": "artist",
      "uri": "string"
    }
  ],
  "available_markets": [
    "string"
  ],
  "disc_number": 0,
  "duration_ms": 0,
  "explicit": true,
  "external_ids": "string",
  "external_urls": "string",
  "href": "string",
  "id": "string",
  "is_local": true,
  "is_playable": true,
  "linked_from": "string",
  "name": "string",
  "popularity": 0,
  "preview_url": "string",
  "restrictions": "string",
  "track_number": 0,
  "type": "track",
  "uri": "string"
}
```

## Mit welchem Endpunkt kann man ein einzelnes dieser Objekte abholen?

**Album:** /albums/{id}

**Playlist:** /playlists/{playlist_id}

**Track:** /tracks/{id}

## Was gibt es sonst noch wichtiges zu wissen zu dieser API? z.B. Authentifizierung o.Ä.

Copy-Pasted aus der Dokumentation:
```
In order to make successful Web API requests your app will need a valid access token. 
One can be obtained through <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/">OAuth 2.0</a>.

The base URI for all Web API requests is `https://api.spotify.com/v1`.
```

> Das bedeuted, die meisten Funktionen des API sind nur für Benutzer mit einem Spotify **Premium Account**. 