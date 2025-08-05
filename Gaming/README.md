# Among Us Clone - Xogos Gaming Platform

A multiplayer social deduction game inspired by Among Us, built for the Xogos
Gaming educational platform.

## Overview

This project implements a web-based version of the popular social deduction game
Among Us, where players work together to complete tasks while identifying
impostors among them. This implementation includes educational elements to align
with Xogos Gaming's mission.

## Key Features

- **Real-time Multiplayer**: 4-10 players per game session
- **Role-based Gameplay**: Crewmates vs. Impostors
- **Interactive Tasks**: Mini-games distributed across the map
- **Emergency Meetings**: Discussion and voting system
- **Educational Integration**: Educational tasks and quizzes

## Technical Architecture

### Frontend

- React with TypeScript for UI components
- Canvas/WebGL for game rendering
- Socket.io client for real-time communication
- State management with React Context API or Redux

### Backend

- Node.js server with Express
- Socket.io for WebSocket communication
- Game state management system
- Integration with Xogos authentication

### Database

- MongoDB for game data persistence
- Player statistics and progression tracking
- Game history and analytics

## Game Mechanics

1. **Roles**

   - Crewmates: Complete tasks to win
   - Impostors: Eliminate crewmates without being detected

2. **Tasks**

   - Standard tasks (wiring, card swipe, etc.)
   - Educational tasks (math problems, knowledge quizzes)
   - Visual tasks that provide confirmation of crewmate status

3. **Map Features**

   - Multiple rooms connected by corridors
   - Vents for impostor movement
   - Security cameras and admin systems
   - Emergency meeting button

4. **Game Flow**
   - Lobby and game setup
   - Main gameplay (task completion, sabotage, elimination)
   - Emergency meetings and voting
   - Game conclusion and results

## Educational Integration

- **Educational Tasks**: Core subject material incorporated into task mini-games
- **Knowledge-based Voting**: Extra voting power for correct answers to
  questions
- **Learning Moments**: Educational content during waiting periods
- **Skill Development**: Critical thinking, deduction, and teamwork

## Development Roadmap

1. **Phase 1: Core Mechanics**

   - Basic movement and interaction
   - Multiplayer room system
   - Simple map implementation

2. **Phase 2: Role Implementation**

   - Crewmate vs. Impostor functionality
   - Task system
   - Kill and report mechanics

3. **Phase 3: Game Systems**

   - Voting and discussion
   - Win/loss conditions
   - Sabotage mechanics

4. **Phase 4: Educational Integration**

   - Educational task implementation
   - Learning content integration
   - XP and progression system connection

5. **Phase 5: Polish and Launch**
   - UI/UX refinement
   - Performance optimization
   - Testing and balancing

## Getting Started

### Prerequisites

- Node.js v16+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Start development server: `npm run dev`

### Environment Configuration

- `MONGODB_URI`: MongoDB connection string
- `SOCKET_PORT`: Port for WebSocket server
- `API_PORT`: Port for REST API
- `JWT_SECRET`: Secret for authentication tokens
- `XOGOS_API_KEY`: API key for Xogos platform integration

## Integration Points with Xogos Platform

1. **Authentication**: Players use existing Xogos credentials
2. **Virtual Currency**: XP and coins earned in-game are added to Xogos account
3. **Educational Content**: Uses Xogos education material API
4. **Social Features**: Leverages Xogos friend system
5. **Analytics**: Game performance data feeds into Xogos learning analytics

## Testing

- Unit tests: `npm run test`
- Integration tests: `npm run test:integration`
- End-to-end tests: `npm run test:e2e`

## Performance Considerations

1. **Networking Optimization**

   - Minimized payload sizes
   - Throttled updates for non-critical events
   - Binary protocols for position updates

2. **Rendering Performance**

   - Object pooling for game entities
   - Optimized animations and effects
   - Visibility culling for off-screen elements

3. **Server Scalability**
   - Horizontal scaling for game servers
   - Room-based sharding
   - Optimized game state serialization

# Xogos Gaming - Among Us Clone

## Project Structure

```
Gaming/
├── README.md                  # Project documentation
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── .env.example               # Environment variables template
├── public/                    # Static assets
│   ├── assets/
│   │   ├── audio/             # Game sounds
│   │   ├── images/            # Game images
│   │   │   ├── characters/    # Character sprites
│   │   │   ├── maps/          # Map assets
│   │   │   └── ui/            # UI elements
│   │   └── animations/        # Character animations
│   └── favicon.ico            # Site favicon
├── src/
│   ├── components/            # React components
│   │   ├── ui/                # Generic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── game/              # Game-specific components
│   │   │   ├── Character.tsx  # Player character
│   │   │   ├── Map.tsx        # Game map
│   │   │   ├── Task.tsx       # Task interface
│   │   │   ├── Voting.tsx     # Voting interface
│   │   │   └── ...
│   │   └── layout/            # Layout components
│   │       ├── GameLayout.tsx
│   │       └── Lobby.tsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── useGameState.ts    # Game state management
│   │   ├── usePlayerControls.ts # Player movement controls
│   │   └── ...
│   ├── lib/                   # Utility functions
│   │   ├── api.ts             # API client
│   │   ├── game-logic.ts      # Core game logic
│   │   └── socket.ts          # WebSocket client
│   ├── pages/                 # Page components
│   │   ├── index.tsx          # Home/landing page
│   │   ├── lobby.tsx          # Game lobby
│   │   ├── game.tsx           # Main game
│   │   └── ...
│   ├── styles/                # CSS/styling
│   │   ├── globals.css
│   │   └── ...
│   ├── types/                 # TypeScript type definitions
│   │   ├── game.ts            # Game-related types
│   │   └── ...
│   ├── config/                # Game configuration
│   │   ├── maps.ts            # Map configurations
│   │   ├── tasks.ts           # Task definitions
│   │   └── roles.ts           # Role definitions
│   └── game-engine/           # Core game engine
│       ├── physics.ts         # Physics engine
│       ├── collision.ts       # Collision detection
│       ├── tasks.ts           # Task management
│       └── roles.ts           # Role management
└── server/                    # Backend server
    ├── index.ts               # Server entry point
    ├── socket-handler.ts      # WebSocket handler
    ├── game-state.ts          # Server-side game state
    ├── room-manager.ts        # Game room management
    ├── db/                    # Database interactions
    │   ├── models/            # Database models
    │   │   ├── User.ts
    │   │   ├── Game.ts
    │   │   └── ...
    │   └── index.ts           # DB connection
    └── api/                   # REST API routes
        ├── auth.ts            # Authentication routes
        ├── games.ts           # Game-related routes
        └── users.ts           # User-related routes
```

## Core Components Description

### Frontend Components

1. **Character Component (`src/components/game/Character.tsx`)**

   - Renders player characters with animations
   - Handles character movement and actions
   - Shows visual indicators for roles (Impostor/Crewmate)

2. **Map Component (`src/components/game/Map.tsx`)**

   - Renders the game map with interactive elements
   - Handles visibility and fog of war
   - Manages room transitions and vent locations

3. **Task Component (`src/components/game/Task.tsx`)**

   - Mini-game interfaces for completing tasks
   - Task progress indicators
   - Task completion feedback

4. **Voting Interface (`src/components/game/Voting.tsx`)**

   - Meeting discussion timer
   - Player voting interface
   - Voting results display

5. **Game Layout (`src/components/layout/GameLayout.tsx`)**
   - Main game container
   - HUD elements (task list, kill button for Impostors)
   - Emergency meeting button

### Backend Services

1. **Socket Handler (`server/socket-handler.ts`)**

   - Real-time player movement synchronization
   - Game event broadcasting (kills, meetings, task completion)
   - Player action validation

2. **Room Manager (`server/room-manager.ts`)**

   - Game lobby creation and management
   - Player joining/leaving handling
   - Game start conditions and role assignment

3. **Game State Manager (`server/game-state.ts`)**
   - Core game state tracking
   - Win/loss condition checking
   - Game timer management

### Game Engine Modules

1. **Physics Engine (`src/game-engine/physics.ts`)**

   - Character movement calculations
   - Speed and acceleration handling

2. **Collision Detection (`src/game-engine/collision.ts`)**

   - Wall and obstacle collision
   - Player-to-player interaction detection

3. **Task Management (`src/game-engine/tasks.ts`)**
   - Task assignment algorithms
   - Task completion tracking
   - Task distribution across map

## Database Schema

### Users Collection

```
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  stats: {
    gamesPlayed: Number,
    gamesWon: Number,
    timesImpostor: Number,
    tasksCompleted: Number
  },
  customization: {
    characterColor: String,
    accessories: Array
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Games Collection

```
{
  _id: ObjectId,
  roomCode: String,
  startedAt: Date,
  endedAt: Date,
  players: [
    {
      userId: ObjectId,
      role: String,
      isAlive: Boolean,
      tasksCompleted: Number,
      tasksTotal: Number
    }
  ],
  settings: {
    map: String,
    numImpostors: Number,
    discussionTime: Number,
    votingTime: Number,
    playerSpeed: Number,
    taskBarUpdates: String
  },
  events: [
    {
      type: String,
      timestamp: Date,
      data: Object
    }
  ],
  winner: String,
  status: String
}
```

## Key Technical Requirements

### Networking Requirements

- WebSocket connections for real-time game state updates
- Low-latency player movement synchronization
- Secure room code generation and validation
- Reliable disconnect handling and reconnection

### Game Logic Requirements

- Role assignment algorithm with configurable Impostor count
- Task distribution system with task types and locations
- Visibility and line-of-sight calculations
- Kill cooldown and range validation
- Emergency meeting and voting system
- Win condition checks (tasks complete, impostors eliminated, etc.)

### Database Requirements

- Player authentication and session management
- Game history and statistics tracking
- Game state persistence for disconnection handling
- Leaderboard and player ranking system

### User Interface Requirements

- Responsive controls for both desktop and mobile
- Accessible task mini-games
- Clear visual indicators for game events
- Chat system for lobbies and meetings
- Settings configuration for game hosts

## Integration with Xogos Platform

To integrate this game with the existing Xogos platform:

1. **User Authentication**: Utilize the existing Xogos authentication system
2. **Virtual Currency**: Track XP and coin earnings for playing games
3. **Educational Elements**:
   - Add educational tasks alongside standard gameplay
   - Include knowledge-based voting options
   - Integrate learning material into waiting screens
4. **Progress Tracking**: Connect game achievements to the main platform
   progression
5. **Social Features**: Leverage existing friend lists and social tools

## Development Priorities

1. Core movement and interaction system
2. Basic multiplayer functionality with rooms
3. Map design and task implementation
4. Role-based gameplay (Impostor vs. Crewmate)
5. Meeting and voting system
6. Polish and educational integration
