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

Gaming Folder - Emotion Quest Game Project Structure
README.md
Project Overview
Emotion Quest is a multiplayer educational game inspired by Among Us, focusing on emotional intelligence and coping mechanisms. Players control emotion-based monsters navigating various environments while completing therapeutic mini-games and social interactions.

Game Concept
Setting: Schools, malls, homes, and other relatable environments
Characters: Three monster types based on emotions
Objective: Educational gameplay focused on emotional regulation and coping strategies
Target Audience: Students/young people learning emotional management
Complete File Structure
Gaming/
├── README.md
├── package.json
├── .gitignore
├── .env.example
│
├── client/                          # Frontend Application
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── assets/
│   │       ├── images/
│   │       │   ├── monsters/         # Character sprites and animations
│   │       │   │   ├── happy/
│   │       │   │   │   ├── happy-idle.png              # Standing still (64x64px)
│   │       │   │   │   ├── happy-walk-spritesheet.png  # 4 frames walking (256x64px)
│   │       │   │   │   ├── happy-run-spritesheet.png   # 4 frames running (256x64px)
│   │       │   │   │   ├── happy-task.png              # Doing mini-game (64x64px)
│   │       │   │   │   ├── happy-celebrate.png         # Task completed (64x64px)
│   │       │   │   │   ├── happy-help.png              # Helping others (64x64px)
│   │       │   │   │   └── happy-frozen.png            # When tagged by Panic (64x64px)
│   │       │   │   │
│   │       │   │   ├── love/
│   │       │   │   │   ├── love-idle.png               # Standing still (64x64px)
│   │       │   │   │   ├── love-walk-spritesheet.png   # 4 frames walking (256x64px)
│   │       │   │   │   ├── love-run-spritesheet.png    # 4 frames running (256x64px)
│   │       │   │   │   ├── love-task.png               # Doing mini-game (64x64px)
│   │       │   │   │   ├── love-celebrate.png          # Task completed (64x64px)
│   │       │   │   │   ├── love-help.png               # Helping/unfreezing others (64x64px)
│   │       │   │   │   └── love-frozen.png             # When tagged by Panic (64x64px)
│   │       │   │   │
│   │       │   │   ├── sad/
│   │       │   │   │   ├── sad-idle.png                # Standing still - blue color (64x64px)
│   │       │   │   │   ├── sad-walk-spritesheet.png    # 4 frames walking (256x64px)
│   │       │   │   │   ├── sad-run-spritesheet.png     # 4 frames running (256x64px)
│   │       │   │   │   ├── sad-task.png                # Doing therapeutic mini-game (64x64px)
│   │       │   │   │   ├── sad-learning.png            # Color getting slightly brighter (64x64px)
│   │       │   │   │   ├── sad-progress-25.png         # 25% brighter - learning progress (64x64px)
│   │       │   │   │   ├── sad-progress-50.png         # 50% brighter - more progress (64x64px)
│   │       │   │   │   ├── sad-progress-75.png         # 75% brighter - almost happy (64x64px)
│   │       │   │   │   ├── sad-transformed.png         # Final yellow form - learned coping (64x64px)
│   │       │   │   │   └── sad-frozen.png              # When tagged by Panic (64x64px)
│   │       │   │   │
│   │       │   │   ├── mad/
│   │       │   │   │   ├── mad-idle.png                # Standing still - red color (64x64px)
│   │       │   │   │   ├── mad-walk-spritesheet.png    # 4 frames walking (256x64px)
│   │       │   │   │   ├── mad-run-spritesheet.png     # 4 frames running (256x64px)
│   │       │   │   │   ├── mad-task.png                # Doing anger management mini-game (64x64px)
│   │       │   │   │   ├── mad-learning.png            # Color getting calmer (64x64px)
│   │       │   │   │   ├── mad-progress-25.png         # 25% calmer - orange tones (64x64px)
│   │       │   │   │   ├── mad-progress-50.png         # 50% calmer - yellow-orange (64x64px)
│   │       │   │   │   ├── mad-progress-75.png         # 75% calmer - mostly yellow (64x64px)
│   │       │   │   │   ├── mad-transformed.png         # Final calm yellow form (64x64px)
│   │       │   │   │   └── mad-frozen.png              # When tagged by Panic (64x64px)
│   │       │   │   │
│   │       │   │   ├── panic/
│   │       │   │   │   ├── panic-idle.png              # Standing still - white/gray (64x64px)
│   │       │   │   │   ├── panic-walk-spritesheet.png  # 4 frames walking (256x64px)
│   │       │   │   │   ├── panic-run-spritesheet.png   # 4 frames running (256x64px)
│   │       │   │   │   ├── panic-hunt.png              # Hunting/chasing mode (64x64px)
│   │       │   │   │   ├── panic-freeze-action.png     # Tagging animation (64x64px)
│   │       │   │   │   └── panic-victory.png           # After eliminating player (64x64px)
│   │       │   │   │
│   │       │   │   └── effects/
│   │       │   │       ├── freeze-effect.png           # Ice overlay when frozen (64x64px)
│   │       │   │       ├── unfreeze-sparkles.png       # Sparkle effect when unfrozen (64x64px)
│   │       │   │       ├── task-indicator.png          # Shows available tasks (32x32px)
│   │       │   │       ├── progress-bar-bg.png         # Background for emotion meter (128x16px)
│   │       │   │       ├── progress-bar-fill.png       # Fill for emotion meter (128x16px)
│   │       │   │       ├── transformation-glow.png     # Glow effect during color change (80x80px)
│   │       │   │       └── celebration-particles.png   # Particle effects for success (varied sizes)
│   │       │   ├── environments/     # Map backgrounds and tiles
│   │       │   ├── ui/              # UI elements and icons
│   │       │   └── minigames/       # Mini-game specific graphics
│   │       ├── sounds/
│   │       │   ├── sfx/             # Sound effects
│   │       │   ├── music/           # Background music
│   │       │   └── voice/           # Voice clips and narration
│   │       └── fonts/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Game/
│   │   │   │   ├── GameCanvas.js    # Main game rendering
│   │   │   │   ├── Player.js        # Player character component
│   │   │   │   ├── Monster.js       # Monster entity component
│   │   │   │   ├── Map.js           # Game map rendering
│   │   │   │   └── TaskMarker.js    # Task location indicators
│   │   │   ├── UI/
│   │   │   │   ├── GameHUD.js       # Heads-up display
│   │   │   │   ├── TaskProgress.js  # Task completion tracking
│   │   │   │   ├── EmotionMeter.js  # Emotional state indicator
│   │   │   │   ├── Chat.js          # In-game communication
│   │   │   │   └── Scoreboard.js    # Player statistics
│   │   │   ├── Minigames/
│   │   │   │   ├── AnxietyCoping.js     # Breathing exercises
│   │   │   │   ├── SadnessReframe.js    # Cognitive reframing
│   │   │   │   ├── AngerManagement.js   # Anger regulation
│   │   │   │   ├── StressRelief.js      # Stress management
│   │   │   │   └── MinigameWrapper.js   # Common minigame logic
│   │   │   ├── Menus/
│   │   │   │   ├── MainMenu.js      # Starting screen
│   │   │   │   ├── LobbyMenu.js     # Pre-game lobby
│   │   │   │   ├── SettingsMenu.js  # Game preferences
│   │   │   │   └── CharacterSelect.js # Monster selection
│   │   │   └── Common/
│   │   │       ├── Button.js        # Reusable button component
│   │   │       ├── Modal.js         # Modal dialogs
│   │   │       └── LoadingSpinner.js
│   │   │
│   │   ├── game/
│   │   │   ├── engine/
│   │   │   │   ├── GameEngine.js    # Core game loop
│   │   │   │   ├── InputHandler.js  # Keyboard/mouse input
│   │   │   │   ├── CollisionDetection.js # Physics and collisions
│   │   │   │   ├── AnimationManager.js # Sprite animations
│   │   │   │   └── SoundManager.js  # Audio management
│   │   │   ├── entities/
│   │   │   │   ├── PositiveMonster.js   # Happy, Love characters
│   │   │   │   ├── NegativeMonster.js   # Sad, Mad characters
│   │   │   │   ├── PanicMonster.js      # Panic character
│   │   │   │   └── BaseMonster.js       # Shared monster logic
│   │   │   ├── maps/
│   │   │   │   ├── School.js        # School environment
│   │   │   │   ├── Mall.js          # Shopping mall environment
│   │   │   │   ├── Home.js          # House environment
│   │   │   │   └── BaseMap.js       # Common map functionality
│   │   │   └── systems/
│   │   │       ├── TaskSystem.js    # Task management
│   │   │       ├── EmotionSystem.js # Emotional state tracking
│   │   │       ├── FreezeSystem.js  # Freeze/unfreeze mechanics
│   │   │       └── ProgressSystem.js # Color transformation logic
│   │   │
│   │   ├── services/
│   │   │   ├── SocketService.js     # WebSocket communication
│   │   │   ├── GameStateService.js  # State management
│   │   │   ├── AuthService.js       # User authentication
│   │   │   └── ProgressService.js   # Player progress tracking
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js         # Game constants
│   │   │   ├── helpers.js           # Utility functions
│   │   │   └── validators.js        # Input validation
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css           # Global styles
│   │   │   ├── components/          # Component-specific styles
│   │   │   └── themes/              # Color themes and variables
│   │   │
│   │   ├── App.js                   # Main application component
│   │   ├── index.js                 # Application entry point
│   │   └── config.js                # Frontend configuration
│   │
│   ├── package.json
│   └── webpack.config.js
│
├── server/                          # Backend Application
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.js              # Authentication endpoints
│   │   │   ├── game.js              # Game management
│   │   │   ├── player.js            # Player data management
│   │   │   ├── room.js              # Game room management
│   │   │   └── progress.js          # Progress tracking
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js              # Authentication middleware
│   │   │   ├── validation.js        # Request validation
│   │   │   ├── rateLimiting.js      # Rate limiting
│   │   │   └── errorHandling.js     # Error management
│   │   │
│   │   ├── models/
│   │   │   ├── User.js              # User data model
│   │   │   ├── GameSession.js       # Game instance model
│   │   │   ├── PlayerProgress.js    # Individual progress
│   │   │   ├── Room.js              # Game room model
│   │   │   └── TaskCompletion.js    # Task completion records
│   │   │
│   │   ├── services/
│   │   │   ├── GameLogic.js         # Core game rules
│   │   │   ├── RoomManager.js       # Room creation/management
│   │   │   ├── PlayerManager.js     # Player state management
│   │   │   ├── TaskValidator.js     # Task completion validation
│   │   │   └── EmotionTracker.js    # Emotional progress tracking
│   │   │
│   │   ├── sockets/
│   │   │   ├── gameEvents.js        # Game-related socket events
│   │   │   ├── playerEvents.js      # Player interaction events
│   │   │   ├── chatEvents.js        # Chat functionality
│   │   │   └── roomEvents.js        # Room management events
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js              # Authentication routes
│   │   │   ├── api.js               # General API routes
│   │   │   ├── game.js              # Game-specific routes
│   │   │   └── admin.js             # Administrative routes
│   │   │
│   │   ├── utils/
│   │   │   ├── database.js          # Database connection
│   │   │   ├── logger.js            # Logging utility
│   │   │   ├── encryption.js        # Data encryption
│   │   │   └── constants.js         # Server constants
│   │   │
│   │   ├── config/
│   │   │   ├── database.js          # Database configuration
│   │   │   ├── server.js            # Server configuration
│   │   │   └── game.js              # Game configuration
│   │   │
│   │   └── app.js                   # Express application setup
│   │
│   ├── package.json
│   └── server.js                    # Server entry point
│
├── database/
│   ├── migrations/
│   │   ├── 001_create_users.js      # User table creation
│   │   ├── 002_create_game_sessions.js # Game session tables
│   │   ├── 003_create_player_progress.js # Progress tracking
│   │   └── 004_create_rooms.js      # Room management tables
│   │
│   ├── seeds/
│   │   ├── users.js                 # Sample user data
│   │   ├── tasks.js                 # Predefined tasks
│   │   └── maps.js                  # Map configurations
│   │
│   └── schema.sql                   # Complete database schema
│
├── docs/
│   ├── API.md                       # API documentation
│   ├── GAME_MECHANICS.md           # Game rules and mechanics
│   ├── DEPLOYMENT.md               # Deployment instructions
│   └── THERAPEUTIC_DESIGN.md       # Educational design principles
│
└── tests/
    ├── client/
    │   ├── components/              # Component tests
    │   ├── game/                    # Game logic tests
    │   └── services/                # Service tests
    │
    ├── server/
    │   ├── controllers/             # Controller tests
    │   ├── services/                # Service tests
    │   └── models/                  # Model tests
    │
    └── integration/
        ├── gameplay.test.js         # End-to-end gameplay tests
        └── multiplayer.test.js      # Multiplayer functionality tests
Technical Requirements
Frontend Needs
Framework: React.js with Canvas/WebGL for game rendering
Real-time Communication: Socket.IO client
Game Engine: Custom 2D engine or Phaser.js integration
State Management: Redux or Context API for game state
Audio: Web Audio API for sound effects and music
Authentication: JWT token handling
Responsive Design: Multi-device support
Backend Requirements
Runtime: Node.js with Express.js
Real-time: Socket.IO for multiplayer communication
Authentication: JWT with bcrypt for password hashing
Database ORM: Sequelize or Prisma for database operations
Session Management: Redis for game session storage
API Security: Rate limiting, input validation, CORS
File Upload: Multer for avatar/customization assets
Database Storage
User Management: Registration, authentication, profiles
Game Sessions: Active games, player assignments, room states
Progress Tracking: Task completions, emotional growth metrics
Therapeutic Data: Coping strategy usage, learning outcomes
Social Features: Friend lists, achievements, leaderboards
Analytics: Gameplay patterns, educational effectiveness metrics
Key Features Implementation
Multiplayer Synchronization: Real-time position updates, game state sync
Task System: Mini-game integration, progress validation
Emotion Mechanics: Color transformation system, freeze/unfreeze logic
Educational Analytics: Learning outcome tracking, adaptive difficulty
Accessibility: Screen reader support, colorblind-friendly design
Moderation: Chat filtering, reporting system, admin controls


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
