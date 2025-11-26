# Phase 0 - F0.1 Core Game Architecture
## Developer Requirements Gathering Session

**OBJECTIVE**: Gather 100% complete specifications for Core Game Architecture  
**OUTCOME**: Complete, production-ready code with zero assumptions  
**DATABASE**: Supabase-driven architecture for educational analytics  
**TARGET USERS**: Primary and secondary school students  

---

## **CRITICAL QUESTIONS - GAME STATE MANAGEMENT**

### **Q1: Game State Definitions & Transitions**
I need to know every possible game state and how they connect:

**REQUIRED ANSWERS**:
- [X] **List ALL game states** (e.g., MainMenu, Loading, CharacterSelect, Lobby, WaitingForPlayers, GameStarting, Playing, TaskInProgress, GamePaused, PlayerDisconnected, GameEnding, Results, etc.)
- [X] **Transition rules**: What triggers each state change? (button click, timer, player count, network event, etc.)
- [X] **State persistence**: Which states should be saved to database? (for session recovery, analytics)
-[X] **Error states**: What happens on network failure, database disconnection, crashed players?
- [X] **Administrative states**: Can teachers/supervisors pause, end, or monitor games remotely?

### **Q2: Scene Architecture & Loading**
**REQUIRED ANSWERS**:
- [X] **Complete scene list**: Every Unity scene needed (MainMenu.unity, CharacterSelect.unity, School.unity, Mall.unity, Home.unity, etc.)
- [X] **Loading requirements**: Progress bars, loading tips, estimated times, background assets to preload
- [X] **Scene data persistence**: What data carries between scenes? (player selection, game settings, session ID)
- [X] **Scene security**: Can students force scene changes or only through proper game flow?
- [X] **Educational interruptions**: Can teachers interrupt gameplay to return to educational content?

---

## **CRITICAL QUESTIONS - SUPABASE DATABASE ARCHITECTURE**

### **Q3: Database Schema Design**
I need the complete database structure for educational analytics:

**REQUIRED ANSWERS**:
- [X] **Student identification**: How are students identified? (Anonymous ID, School ID, Grade/Class, Age, Special needs flags)
- [X] **Session tracking**: What constitutes a "session"? (login to logout, single game, class period)
- [X] **Gameplay data**: Which actions to track? (monster selection, task attempts, completion times, help requests, social interactions)
- [X] **Educational metrics**: What therapeutic progress indicators? (emotion recognition accuracy, coping strategy usage, peer helping behavior)
- [X] **Privacy compliance**: What data CAN'T be stored? (names, personal info, specific school identification)

### **Q4: Real-time vs Batch Data Collection**
**REQUIRED ANSWERS**:
- [X] **Real-time events**: What needs immediate database storage? (safety concerns, inappropriate behavior, technical issues)
- [X] **Batch data**: What can be stored locally and synced later? (gameplay metrics, progress data)
- [X] **Offline handling**: What happens when database is unavailable? (local storage, data queuing, game continuation)
- [X] **Data validation**: What client-side vs server-side validation is needed?
- [X] **Sync frequency**: How often to sync with Supabase during gameplay?

### **Q5: Supabase Configuration**
**REQUIRED ANSWERS**:
- [X] **Authentication method**: Supabase Auth, anonymous users, school SSO integration, custom auth?
- [X] **Table structure**: Exact table names, columns, data types, relationships, indexes needed
- [X] **Row Level Security**: What RLS policies for student data protection?
- [X] **Real-time subscriptions**: Which tables need real-time updates? (live game state, chat moderation)
- [X] **Storage requirements**: File uploads needed? (student avatars, custom content, session recordings)

---

## **CRITICAL QUESTIONS - EDUCATIONAL ANALYTICS**

### **Q6: Therapeutic Data Collection**
For mental health analysis by counselors/teachers:

**REQUIRED ANSWERS**:
- [X] **Emotional indicators**: What behaviors indicate emotional state? (monster choice patterns, task avoidance, social withdrawal)
- [X] **Progress markers**: How to measure therapeutic improvement? (task completion rates, emotion recognition accuracy, coping strategy adoption)
- [X] **Red flag detection**: What patterns require immediate teacher/counselor notification? (isolation, aggression, distress indicators)
- [X] **Social interaction metrics**: How to track peer relationships and helping behaviors?
- [X] **Long-term tracking**: What data needs to persist across multiple sessions/weeks/months?

### **Q7: Reporting & Dashboard Requirements**
**REQUIRED ANSWERS**:
- [X] **Teacher dashboard**: What real-time information do teachers need during gameplay?
- [X] **Counselor reports**: What weekly/monthly analytical reports are needed?
- [X] **Parent communications**: What progress information can be shared with parents?
- [X] **Administrative data**: What school-level analytics are required?
- [X] **Export requirements**: What formats needed? (PDF reports, CSV data, integration APIs)

---

## **CRITICAL QUESTIONS - AUDIO SYSTEM**

### **Q8: Audio Architecture & Educational Considerations**
**REQUIRED ANSWERS**:
- [X] **Audio channels needed**: Background music, sound effects, voice narration, accessibility audio, emergency alerts
- [X] **Volume controls**: Individual controls for each channel? Teacher override controls?
- [X] **Educational audio**: Voice narration for instructions, encouragement clips, achievement celebrations
- [X] **Accessibility**: Text-to-speech requirements, audio descriptions, hearing impairment support
- [X] **Classroom considerations**: Headphone vs speaker modes, volume limiting, silent modes

### **Q9: Audio Content Requirements**
**REQUIRED ANSWERS**:
- [X] **Music styles**: Calming, energetic, background ambience - specific emotional tones needed
- [X] **Voice requirements**: Child-friendly narrator, multiple languages, reading level appropriate
- [X] **Sound effect categories**: Task completion, monster interactions, error sounds, achievement fanfares
- [X] **Dynamic audio**: Music that changes based on game state, stress levels, or player actions
- [X] **Cultural considerations**: Inclusive audio that represents diverse backgrounds

---

## **CRITICAL QUESTIONS - INPUT SYSTEM**

### **Q10: Input Methods & Accessibility**
**REQUIRED ANSWERS**:
- [X] **Primary input**: Keyboard (WASD), mouse, touch, gamepad support needed?
- [X] **Accessibility inputs**: Switch controls, eye tracking, voice commands for special needs students
- [X] **Age-appropriate controls**: Simplified controls for younger students, complex options for older
- [X] **Teacher controls**: Remote pause, guidance mode, intervention capabilities
- [X] **Safety controls**: Panic button, immediate teacher alert, emergency shutdown

### **Q11: Input Validation & Security**
**REQUIRED ANSWERS**:
- [X] **Input sanitization**: How to prevent cheating, inappropriate text entry, system manipulation
- [X] **Rate limiting**: Preventing spam clicking, rapid-fire actions, system abuse
- [X] **Context switching**: Different input modes for gameplay vs mini-games vs chat
- [X] **Parental controls**: Input restrictions based on age, special needs, or parent preferences
- [X] **Session security**: Preventing unauthorized input or session hijacking

---

## **CRITICAL QUESTIONS - CONFIGURATION SYSTEM**

### **Q12: Game Configuration & Constants**
**REQUIRED ANSWERS**:
- [X] **Player limits**: Minimum/maximum players per game, optimal class size, teacher supervision ratios
- [X] **Timing values**: Game duration, task timeouts, connection timeouts, idle timeouts
- [X] **Difficulty scaling**: How game difficulty adjusts based on age, skill level, special needs
- [X] **Educational parameters**: Task repetition requirements, mastery thresholds, progress gates
- [X] **Safety parameters**: Inappropriate behavior detection thresholds, automatic interventions

### **Q13: Runtime Configuration**
**REQUIRED ANSWERS**:
- [X] **Teacher overrides**: What can teachers modify during gameplay? (difficulty, time limits, player interactions)
- [X] **School policies**: How do different schools' policies affect game configuration?
- [X] **Individual accommodations**: How to handle IEP requirements, learning disabilities, behavioral plans
- [X] **Dynamic adjustments**: Real-time difficulty scaling based on student performance
- [X] **Emergency protocols**: Lockdown procedures, emergency contacts, crisis intervention

---

## **CRITICAL QUESTIONS - INTEGRATION REQUIREMENTS**

### **Q14: Supabase Integration Specifics**
**REQUIRED ANSWERS**:
- [X] **Supabase project details**: Project URL, public anon key, service role key handling
- [X] **Environment configuration**: Development, staging, production database separation
- [X] **Migration strategy**: How to handle database schema updates, data migrations
- [X] **Backup requirements**: Automated backups, disaster recovery, data retention policies
- [X] **Performance requirements**: Expected concurrent users, query optimization needs

### **Q15: External System Integration**
**REQUIRED ANSWERS**:
- [X] **School system integration**: Student information systems, gradebooks, learning management systems
- [X] **Future Xogos integration**: Data format requirements, API endpoints, authentication flow
- [X] **Third-party analytics**: Google Analytics for Schools, educational platforms, research partnerships
- [X] **Communication systems**: Email notifications, SMS alerts, parent portals
- [X] **Compliance reporting**: Automated compliance reports, audit trails, data governance

---

## **DELIVERABLE SPECIFICATION**

Once you provide complete answers to ALL questions above, I will deliver:

### **GameManager.cs**
- Complete singleton pattern implementation
- All game states with transition logic
- Supabase integration for state persistence
- Educational analytics event triggering
- Error handling and recovery mechanisms

### **SceneManager.cs**
- Scene loading with progress tracking
- Data persistence between scenes
- Educational context preservation
- Teacher intervention capabilities
- Performance optimization for classroom environments

### **AudioManager.cs**
- Multi-channel audio system
- Accessibility features implementation
- Classroom-appropriate volume management
- Educational content audio integration
- Cultural and language considerations

### **InputManager.cs**
- Multi-platform input handling
- Accessibility input support
- Security and validation layers
- Age-appropriate input methods
- Teacher override capabilities

### **Constants.cs**
- All game configuration values
- Supabase configuration constants
- Educational compliance parameters
- Performance and safety thresholds
- Localization and accessibility settings

### **DatabaseManager.cs** (Additional)
- Complete Supabase integration
- Real-time and batch data handling
- Privacy-compliant data collection
- Educational analytics implementation
- Error handling and offline support

---

## **UPDATED PHASE 0 CHECKLIST WITH SUPABASE**

### **F0.1: Core Game Architecture** ✅ (Today's Goal)
**WHAT I NEED FROM YOU**: Complete answers to all 15 question sets above
**WHAT I'LL DELIVER**: 6 complete, production-ready scripts with full Supabase integration

### **F0.2: Database Schema Implementation** (Next)
**WHAT I NEED FROM YOU**: Supabase project setup, exact table schemas, RLS policies
**WHAT I'LL DELIVER**: Complete database migrations, data models, analytics framework

### **F0.3: Educational Analytics Framework** (Next)
**WHAT I NEED FROM YOU**: Specific therapeutic metrics, reporting requirements, privacy policies
**WHAT I'LL DELIVER**: Real-time analytics collection, dashboard data preparation, compliance monitoring

### **F0.4: Security & Compliance Implementation** (Next)
**WHAT I NEED FROM YOU**: COPPA requirements, school policies, data governance rules
**WHAT I'LL DELIVER**: Authentication system, data encryption, audit logging, compliance reporting

**NO CODE WILL BE WRITTEN UNTIL ALL QUESTIONS ARE ANSWERED COMPLETELY.**

This ensures zero assumptions and 100% accurate implementation for your educational gaming platform.