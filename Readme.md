# Never Have I Ever (NHIE) – Webanwendung

Eine Echtzeit-Multiplayer-Webanwendung für das Spiel „Never Have I Ever". Spieler können Räume erstellen, beitreten und gemeinsam Fragen aus Playlists durchspielen. Die Synchronisierung erfolgt in Echtzeit über **Socket.IO**.

---

## Inhaltsverzeichnis

- [Architektur](#architektur)
- [Projektstruktur](#projektstruktur)
- [Schnellstart](#schnellstart)
- [Technologien](#technologien)
- [Spielablauf](#spielablauf)
- [Dokumentation](#dokumentation)

---

## Architektur

```
┌───────────────────────────────────────────────────────┐
│                  Docker Network                        │
│                                                        │
│  ┌──────────────────┐         ┌──────────────────┐    │
│  │    Frontend       │  HTTP   │     Backend      │    │
│  │  React + Vite    │ ──────▶ │  Node.js/Express │    │
│  │  Chakra UI       │         │  REST API :3500  │    │
│  │  Tailwind CSS    │◀──────▶ │  Socket.IO :5500 │    │
│  │  Socket.IO       │ WS/WSS  └────────┬─────────┘    │
│  └──────────────────┘                  │               │
│        :5500                           ▼               │
│                               ┌──────────────┐         │
│                               │  PostgreSQL  │         │
│                               │   Port 5432  │         │
│                               └──────────────┘         │
└───────────────────────────────────────────────────────┘
```

| Service | Technologie | Port |
|---|---|---|
| **Frontend** | React + Vite + Chakra UI | `5500` |
| **Backend REST API** | Node.js + Express.js | `3500` |
| **Backend Socket.IO** | Socket.IO | `5500` |
| **Datenbank** | PostgreSQL | `5432` |

---

## Projektstruktur

```
fwe-project-nhie/
├── backend/                   # Node.js + Express REST API + Socket.IO
│   ├── src/
│   │   ├── entity/            # TypeORM Entities (User, Room, Playlist, Question, ...)
│   │   ├── controller/        # REST Controller
│   │   ├── routes/            # API Routen
│   │   └── socket/            # Socket.IO Event Handler
│   └── package.json
│
├── frontend/                  # React + Vite Frontend
│   ├── src/
│   │   ├── assets/
│   │   │   └── screenshotGame/  # Screenshots für Dokumentation
│   │   ├── pages/             # Seiten (Login, Register, Home, Game, UserOverview)
│   │   └── components/        # Wiederverwendbare Komponenten
│   └── package.json
│
└── docker-compose.yml         # Container-Orchestrierung
```

---

## Schnellstart

### Voraussetzungen
- **Docker** & **Docker Compose**
- **Node.js** (für lokale Entwicklung)

### Mit Docker starten

```bash
# Repository klonen
git clone <repo-url>
cd fwe-project-nhie

# Alle Container starten
docker compose up
```

| Dienst | URL |
|---|---|
| 🌐 **Frontend** | http://localhost:5500 |
| ⚙️ **Backend API** | http://localhost:3500 |
| 🗄️ **PostgreSQL** | localhost:5432 |

### Manuell starten (ohne Docker)

**Datenbank** (Docker):
```bash
docker compose up
```

**Backend** (separates Terminal):
```bash
cd fwe-project-nhie/backend
npm install
npm run schema:fresh     # Datenbanktabellen erstellen
npm run dev              # Backend starten
```

**Frontend** (separates Terminal):
```bash
cd fwe-project-nhie/frontend
npm install
npm run dev              # Frontend starten → http://localhost:5500
```

> Die beiden Terminals für Docker und Backend/Frontend müssen **getrennt** geöffnet bleiben.

---

## Technologien

### Backend
- **Node.js** + **Express.js** – REST API
- **Socket.IO** – Echtzeit-Kommunikation
- **TypeORM** – ORM für PostgreSQL
- **PostgreSQL** – relationale Datenbank

### Frontend
- **React** + **Vite** – SPA-Framework
- **Chakra UI** – Komponentenbibliothek
- **Tailwind CSS** – Utility-first CSS
- **Socket.IO Client** – Echtzeit-Verbindung zum Backend

---

## Spielablauf

```
Registrieren / Einloggen
         │
         ▼
     Home Page
    ┌────┴────┐
    │         │
Raum         Raum
erstellen    beitreten (Room ID)
    │         │
    └────┬────┘
         ▼
     Game Page
  ┌──────────────────────────────┐
  │  Frage wird angezeigt        │
  │  → "I have" / "I have not"   │
  │  → Nächste Frage (Host)      │
  │  → Vote-Kick bei AFK-Spieler │
  └──────────────────────────────┘
         │
         ▼
   Ergebnis-Übersicht
```

### Kernfunktionen

| Funktion | Beschreibung |
|---|---|
| **Authentifizierung** | Registrierung & Login mit JWT |
| **Raum erstellen** | Playlist auswählen → Raum öffnen → Room ID teilen |
| **Raum beitreten** | Room ID eingeben → direkt mitspielen |
| **Echtzeit-Sync** | Alle Spieler sehen dieselbe Frage gleichzeitig |
| **Abstimmung** | „I have" / „I have not" – Zähler für alle sichtbar |
| **Vote-Kick** | Mehrheit kann AFK-Spieler aus dem Raum werfen |
| **Playlist-Verwaltung** | Eigene Fragen & Playlists erstellen, bearbeiten, löschen |
| **User-Profil** | Persönliche Daten & eigene Playlists verwalten |

---

## Datenmodell

```
User ──< UserPlaylist >── Playlist ──< PlaylistQuestion >── Question
  │                           │
  └──< RoomPlayer >── Room ───┘
```

| Entity | Beschreibung |
|---|---|
| `User` | Spieler mit E-Mail, Passwort, Vor- & Nachname |
| `Room` | Spielraum mit Playlist, Fragenindex, Abstimmungszähler |
| `Playlist` | Sammlung von Fragen, erstellt von einem User |
| `Question` | Einzelne NHIE-Frage, erstellt von einem User |
| `UserPlaylist` | N:M – User ↔ Playlist |
| `RoomPlayer` | N:M – Room ↔ User + Spielstatistik (vote, haveCounter, ...) |
| `PlaylistQuestion` | N:M – Playlist ↔ Question |

---

## Dokumentation

| Komponente | README |
|---|---|
| Backend (REST API + Socket.IO) | [`backend/README.md`](backend/README.md) |
| Frontend (React + UI) | [`frontend/README.md`](frontend/README.md) |