using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace EmotionQuest.Core
{
    /// <summary>
    /// Core Game Manager - Handles all game state management, session tracking, and game flow
    /// Manages MVP functionality for Emotion Quest educational game
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        #region Singleton Pattern
        public static GameManager Instance { get; private set; }

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
                Initialize();
            }
            else
            {
                Destroy(gameObject);
            }
        }
        #endregion

        #region Game State Management
        public enum GameState
        {
            MainMenu,
            Loading,
            CharacterSelect,
            Settings,
            LocalServerSetup,
            WaitingForPlayers,
            GameStarting,
            Playing,
            TaskInProgress,
            GamePaused,
            PlayerDisconnected,
            GameEnding,
            Win,
            Lose,
            TeacherAlert
        }

        [Header("Game State")]
        public GameState currentState = GameState.MainMenu;
        public GameState previousState;

        // Game State Events
        public static event Action<GameState, GameState> OnGameStateChanged;
        #endregion

        #region Session Management
        [Header("Session Data")]
        public string currentSessionID;
        public string currentGameID;
        public DateTime sessionStartTime;
        public DateTime gameStartTime;
        public int currentPlayerCount = 0;
        public string selectedEmotion;
        public MonsterType assignedMonsterType;
        public string selectedScenario; // School, Mall, or Home

        // Player role distribution for MVP
        public int positiveMonsterCount = 0;
        public int negativeMonsterCount = 0;
        public bool hasPanicMonster = false;

        // Session tracking
        private List<string> completedTasks = new List<string>();
        private int timesFrezen = 0;
        private int helpRequestsMade = 0;
        private bool hasRequestedHelp = false;
        #endregion

        #region Game Configuration (MVP Constants)
        [Header("Game Rules - MVP")]
        public const int MIN_PLAYERS = 3;
        public const int MAX_PLAYERS = 7;
        public const int GAME_DURATION_MINUTES = 10;
        public const int CONNECTION_TIMEOUT_MINUTES = 45;
        public const int IDLE_TIMEOUT_MINUTES = 5;
        public const int MAX_POSITIVE_MONSTERS = 2;
        
        // Monster distribution rules based on player count
        private readonly Dictionary<int, (int positive, int negative)> monsterDistribution = new Dictionary<int, (int, int)>
        {
            { 3, (1, 1) }, // 1 positive, 1 negative, 1 panic
            { 4, (1, 2) }, // 1 positive, 2 negative, 1 panic
            { 5, (1, 3) }, // 1 positive, 3 negative, 1 panic
            { 6, (2, 3) }, // 2 positive, 3 negative, 1 panic
            { 7, (2, 4) }  // 2 positive, 4 negative, 1 panic
        };
        #endregion

        #region Emotional and Behavioral Tracking
        [Header("Behavioral Analytics")]
        public List<EmotionalSelection> emotionsSelectedToday = new List<EmotionalSelection>();
        public List<TaskAttempt> taskAttempts = new List<TaskAttempt>();
        public List<SocialInteraction> socialInteractions = new List<SocialInteraction>();
        public List<PanicResponse> panicResponses = new List<PanicResponse>();

        // Real-time behavioral flags
        public bool isAvoidingFrozenPlayers = false;
        public bool isConsistentlyRunningFromPanic = false;
        public float avoidanceRatio = 0f; // Ratio of avoiding vs helping frozen players
        #endregion

        #region Initialization
        private void Initialize()
        {
            // Initialize systems
            InitializeGameSystems();
            
            // Set up session tracking
            StartNewSession();
            
            // Subscribe to system events
            SubscribeToEvents();
            
            Debug.Log("[GameManager] Core Game Management System Initialized");
        }

        private void InitializeGameSystems()
        {
            // Ensure other managers are present
            if (FindObjectOfType<SceneTransitionManager>() == null)
            {
                Debug.LogWarning("[GameManager] SceneTransitionManager not found. Some functionality may be limited.");
            }
            
            if (FindObjectOfType<AudioManager>() == null)
            {
                Debug.LogWarning("[GameManager] AudioManager not found. Audio functionality will be limited.");
            }
            
            if (FindObjectOfType<DatabaseManager>() == null)
            {
                Debug.LogWarning("[GameManager] DatabaseManager not found. Data persistence will be limited.");
            }
        }

        private void SubscribeToEvents()
        {
            // Subscribe to application events
            Application.focusChanged += OnApplicationFocusChanged;
            
            // Subscribe to scene loading events
            UnityEngine.SceneManagement.SceneManager.sceneLoaded += OnSceneLoaded;
        }
        #endregion

        #region Game State Management Methods
        public void ChangeGameState(GameState newState)
        {
            if (currentState == newState) return;

            previousState = currentState;
            currentState = newState;

            // Log state change for analytics
            LogStateChange(previousState, currentState);

            // Handle state-specific logic
            HandleStateChange(newState);

            // Notify other systems
            OnGameStateChanged?.Invoke(previousState, currentState);

            Debug.Log($"[GameManager] State changed from {previousState} to {currentState}");
        }

        private void HandleStateChange(GameState newState)
        {
            switch (newState)
            {
                case GameState.MainMenu:
                    HandleMainMenuState();
                    break;
                case GameState.CharacterSelect:
                    HandleCharacterSelectState();
                    break;
                case GameState.Playing:
                    HandlePlayingState();
                    break;
                case GameState.Win:
                case GameState.Lose:
                    HandleGameEndState(newState);
                    break;
                case GameState.TeacherAlert:
                    HandleTeacherAlertState();
                    break;
            }
        }

        private void HandleMainMenuState()
        {
            // Reset game session data when returning to main menu
            if (previousState == GameState.Win || previousState == GameState.Lose)
            {
                EndCurrentGame();
            }
        }

        private void HandleCharacterSelectState()
        {
            // Record that player has entered character selection
            LogPlayerAction("character_select_entered", DateTime.Now);
        }

        private void HandlePlayingState()
        {
            StartNewGame();
            StartGameTimer();
        }

        private void HandleGameEndState(GameState endState)
        {
            EndCurrentGame();
            bool playerWon = endState == GameState.Win;
            LogGameResult(playerWon);
        }

        private void HandleTeacherAlertState()
        {
            // Send immediate alert to teacher about concerning behavior
            SendTeacherAlert();
        }
        #endregion

        #region Session Management Methods
        public void StartNewSession()
        {
            currentSessionID = GenerateSessionID();
            sessionStartTime = DateTime.Now;
            emotionsSelectedToday.Clear();
            
            // Log session start
            DatabaseManager.Instance?.LogSessionStart(currentSessionID, sessionStartTime);
            
            Debug.Log($"[GameManager] New session started: {currentSessionID}");
        }

        public void EndCurrentSession()
        {
            if (!string.IsNullOrEmpty(currentSessionID))
            {
                TimeSpan sessionDuration = DateTime.Now - sessionStartTime;
                
                // Log session end with duration
                DatabaseManager.Instance?.LogSessionEnd(currentSessionID, sessionDuration);
                
                Debug.Log($"[GameManager] Session ended: {currentSessionID}, Duration: {sessionDuration.TotalMinutes:F1} minutes");
                
                currentSessionID = null;
            }
        }

        private void StartNewGame()
        {
            currentGameID = GenerateGameID();
            gameStartTime = DateTime.Now;
            
            // Reset game-specific data
            completedTasks.Clear();
            timesFrezen = 0;
            helpRequestsMade = 0;
            hasRequestedHelp = false;
            
            // Log game start
            DatabaseManager.Instance?.LogGameStart(currentGameID, selectedEmotion, assignedMonsterType.ToString(), selectedScenario);
            
            Debug.Log($"[GameManager] New game started: {currentGameID}");
        }

        private void EndCurrentGame()
        {
            if (!string.IsNullOrEmpty(currentGameID))
            {
                TimeSpan gameDuration = DateTime.Now - gameStartTime;
                
                // Compile game statistics
                GameStatistics stats = new GameStatistics
                {
                    gameID = currentGameID,
                    duration = gameDuration,
                    tasksCompleted = completedTasks.Count,
                    timesFrezen = timesFrezen,
                    helpRequests = helpRequestsMade,
                    emotionSelected = selectedEmotion,
                    monsterType = assignedMonsterType.ToString(),
                    scenario = selectedScenario
                };
                
                // Log game end with statistics
                DatabaseManager.Instance?.LogGameEnd(stats);
                
                Debug.Log($"[GameManager] Game ended: {currentGameID}, Duration: {gameDuration.TotalMinutes:F1} minutes");
                
                currentGameID = null;
            }
        }
        #endregion

        #region Monster Assignment and Emotional Selection
        public void SelectEmotion(string emotion)
        {
            selectedEmotion = emotion;
            
            // Record emotional selection for the day
            EmotionalSelection selection = new EmotionalSelection
            {
                emotion = emotion,
                timestamp = DateTime.Now,
                sessionID = currentSessionID
            };
            
            emotionsSelectedToday.Add(selection);
            
            // Log emotional selection for therapeutic analysis
            DatabaseManager.Instance?.LogEmotionalSelection(selection);
            
            Debug.Log($"[GameManager] Emotion selected: {emotion}");
        }

        public MonsterType AssignMonsterType(int totalPlayers, string preferredEmotion)
        {
            // Get distribution for this player count
            if (!monsterDistribution.ContainsKey(totalPlayers))
            {
                Debug.LogError($"[GameManager] Invalid player count: {totalPlayers}");
                return MonsterType.Sad; // Default fallback
            }

            var distribution = monsterDistribution[totalPlayers];
            
            // Always assign one Panic monster per game
            if (!hasPanicMonster)
            {
                hasPanicMonster = true;
                assignedMonsterType = MonsterType.Panic;
                return MonsterType.Panic;
            }
            
            // Assign positive monsters (Happy, Love) up to limit
            if (positiveMonsterCount < distribution.positive)
            {
                positiveMonsterCount++;
                assignedMonsterType = (preferredEmotion == "Happy" || preferredEmotion == "Love") ? 
                    GetMonsterTypeFromEmotion(preferredEmotion) : MonsterType.Happy;
                return assignedMonsterType;
            }
            
            // Assign negative monsters (Sad, Mad)
            if (negativeMonsterCount < distribution.negative)
            {
                negativeMonsterCount++;
                assignedMonsterType = (preferredEmotion == "Sad" || preferredEmotion == "Mad") ? 
                    GetMonsterTypeFromEmotion(preferredEmotion) : MonsterType.Sad;
                return assignedMonsterType;
            }
            
            // Fallback (shouldn't happen with proper player management)
            Debug.LogWarning("[GameManager] Monster assignment overflow, defaulting to Sad");
            assignedMonsterType = MonsterType.Sad;
            return MonsterType.Sad;
        }

        private MonsterType GetMonsterTypeFromEmotion(string emotion)
        {
            return emotion.ToLower() switch
            {
                "happy" => MonsterType.Happy,
                "love" => MonsterType.Love,
                "sad" => MonsterType.Sad,
                "mad" => MonsterType.Mad,
                "panic" => MonsterType.Panic,
                _ => MonsterType.Sad
            };
        }
        #endregion

        #region Gameplay Tracking Methods
        public void LogTaskAttempt(string taskID, bool completed, float timeSpent)
        {
            TaskAttempt attempt = new TaskAttempt
            {
                taskID = taskID,
                completed = completed,
                timeSpent = timeSpent,
                timestamp = DateTime.Now,
                gameID = currentGameID,
                abandoned = false // Set by task system if player abandons
            };
            
            taskAttempts.Add(attempt);
            
            if (completed)
            {
                completedTasks.Add(taskID);
                // Play task completion sound
                AudioManager.Instance?.PlayTaskCompletionSound();
            }
            
            // Log for therapeutic analysis
            DatabaseManager.Instance?.LogTaskAttempt(attempt);
            
            Debug.Log($"[GameManager] Task {taskID} - Completed: {completed}, Time: {timeSpent:F1}s");
        }

        public void LogTaskAbandonment(string taskID, float timeSpent)
        {
            TaskAttempt attempt = new TaskAttempt
            {
                taskID = taskID,
                completed = false,
                timeSpent = timeSpent,
                timestamp = DateTime.Now,
                gameID = currentGameID,
                abandoned = true
            };
            
            taskAttempts.Add(attempt);
            
            // Flag for therapeutic analysis - task avoidance pattern
            DatabaseManager.Instance?.LogTaskAttempt(attempt);
            
            Debug.Log($"[GameManager] Task {taskID} abandoned after {timeSpent:F1}s");
        }

        public void LogFreezingEvent(bool requestedHelp)
        {
            timesFrezen++;
            hasRequestedHelp = requestedHelp;
            
            if (requestedHelp)
            {
                helpRequestsMade++;
            }
            
            // Play freeze sound effect
            AudioManager.Instance?.PlayFreezeSound();
            
            // Log for therapeutic analysis - help-seeking behavior
            DatabaseManager.Instance?.LogFreezingEvent(currentGameID, timesFrezen, requestedHelp);
            
            Debug.Log($"[GameManager] Player frozen. Total: {timesFrezen}, Requested help: {requestedHelp}");
        }

        public void LogSocialInteraction(string interactionType, string targetPlayerID)
        {
            SocialInteraction interaction = new SocialInteraction
            {
                interactionType = interactionType, // "helped_frozen", "avoided_frozen", "ran_from_panic"
                targetPlayerID = targetPlayerID,
                timestamp = DateTime.Now,
                gameID = currentGameID
            };
            
            socialInteractions.Add(interaction);
            
            // Update behavioral flags
            UpdateBehavioralFlags(interaction);
            
            // Log for therapeutic analysis
            DatabaseManager.Instance?.LogSocialInteraction(interaction);
            
            Debug.Log($"[GameManager] Social interaction: {interactionType} with {targetPlayerID}");
        }

        public void LogPanicResponse(Vector3 panicPosition, Vector3 playerPosition, Vector3 playerMovement)
        {
            // Calculate angle between player movement and direction away from Panic
            Vector3 awayFromPanic = (playerPosition - panicPosition).normalized;
            float angle = Vector3.Angle(playerMovement.normalized, awayFromPanic);
            
            bool runningAway = angle <= 80f; // Within 80 degrees of optimal escape direction
            
            PanicResponse response = new PanicResponse
            {
                panicPosition = panicPosition,
                playerPosition = playerPosition,
                movementDirection = playerMovement,
                angleFromOptimal = angle,
                runningAway = runningAway,
                timestamp = DateTime.Now,
                gameID = currentGameID
            };
            
            panicResponses.Add(response);
            
            // Track pattern for therapeutic analysis
            if (!runningAway)
            {
                // Player not running optimally from Panic - could indicate risk-taking or confusion
                CheckForConsistentNonAvoidanceBehavior();
            }
            
            // Log for therapeutic analysis
            DatabaseManager.Instance?.LogPanicResponse(response);
        }

        private void UpdateBehavioralFlags(SocialInteraction interaction)
        {
            if (interaction.interactionType == "avoided_frozen")
            {
                // Calculate avoidance ratio
                int totalFrozenEncounters = socialInteractions.FindAll(si => 
                    si.interactionType == "helped_frozen" || si.interactionType == "avoided_frozen").Count;
                int avoidedCount = socialInteractions.FindAll(si => si.interactionType == "avoided_frozen").Count;
                
                avoidanceRatio = totalFrozenEncounters > 0 ? (float)avoidedCount / totalFrozenEncounters : 0f;
                
                // Flag if consistently avoiding (>70% of encounters)
                isAvoidingFrozenPlayers = avoidanceRatio > 0.7f && totalFrozenEncounters >= 3;
                
                if (isAvoidingFrozenPlayers)
                {
                    // Potential therapeutic concern - lack of empathy or social withdrawal
                    TriggerTeacherAlert("consistent_avoidance_behavior");
                }
            }
        }

        private void CheckForConsistentNonAvoidanceBehavior()
        {
            // Check last 5 panic encounters
            if (panicResponses.Count >= 5)
            {
                var recentResponses = panicResponses.GetRange(panicResponses.Count - 5, 5);
                int nonAvoidanceCount = recentResponses.FindAll(pr => !pr.runningAway).Count;
                
                // If 4 out of 5 recent encounters show non-avoidance
                if (nonAvoidanceCount >= 4)
                {
                    isConsistentlyRunningFromPanic = false;
                    // Potential therapeutic concern - risk-taking behavior or emotional dysregulation
                    TriggerTeacherAlert("risk_taking_behavior");
                }
            }
        }
        #endregion

        #region Alert System
        private void TriggerTeacherAlert(string alertType)
        {
            // Change state to teacher alert
            ChangeGameState(GameState.TeacherAlert);
            
            // Send immediate alert to teacher
            TeacherAlert alert = new TeacherAlert
            {
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                alertType = alertType,
                gameID = currentGameID,
                timestamp = DateTime.Now,
                severity = "medium" // Can be "low", "medium", "high"
            };
            
            // Log alert for immediate teacher notification
            DatabaseManager.Instance?.SendTeacherAlert(alert);
            
            Debug.Log($"[GameManager] Teacher alert triggered: {alertType}");
        }

        private void SendTeacherAlert()
        {
            // Implementation for sending real-time alert to teacher's game/dashboard
            // This would integrate with the teacher's UI system
            Debug.Log("[GameManager] Sending real-time teacher alert");
        }
        #endregion

        #region Timer Management
        private Coroutine gameTimerCoroutine;
        private float gameTimeRemaining;

        private void StartGameTimer()
        {
            gameTimeRemaining = GAME_DURATION_MINUTES * 60f; // Convert to seconds
            if (gameTimerCoroutine != null)
            {
                StopCoroutine(gameTimerCoroutine);
            }
            gameTimerCoroutine = StartCoroutine(GameTimerCoroutine());
        }

        private IEnumerator GameTimerCoroutine()
        {
            // Announce game start
            AudioManager.Instance?.PlayGameStartAnnouncement();
            
            while (gameTimeRemaining > 0)
            {
                gameTimeRemaining -= Time.deltaTime;
                
                // One minute warning
                if (gameTimeRemaining <= 60f && gameTimeRemaining > 59f)
                {
                    AudioManager.Instance?.PlayOneMinuteWarning();
                }
                
                yield return null;
            }
            
            // Time's up - end game
            AudioManager.Instance?.PlayGameEndAnnouncement();
            EndGameDueToTimeout();
        }

        private void EndGameDueToTimeout()
        {
            // Determine winner based on game rules
            // For MVP: Simple win condition based on tasks completed
            bool playerTeamWon = completedTasks.Count >= 3; // Arbitrary win condition for MVP
            
            ChangeGameState(playerTeamWon ? GameState.Win : GameState.Lose);
        }

        public float GetGameTimeRemaining()
        {
            return gameTimeRemaining;
        }
        #endregion

        #region Utility Methods
        private string GenerateSessionID()
        {
            return $"SESSION_{DateTime.Now:yyyyMMdd_HHmmss}_{UnityEngine.Random.Range(1000, 9999)}";
        }

        private string GenerateGameID()
        {
            return $"GAME_{DateTime.Now:yyyyMMdd_HHmmss}_{UnityEngine.Random.Range(1000, 9999)}";
        }

        private void LogStateChange(GameState from, GameState to)
        {
            StateChange change = new StateChange
            {
                fromState = from.ToString(),
                toState = to.ToString(),
                timestamp = DateTime.Now,
                sessionID = currentSessionID
            };
            
            DatabaseManager.Instance?.LogStateChange(change);
        }

        private void LogPlayerAction(string action, DateTime timestamp)
        {
            PlayerAction playerAction = new PlayerAction
            {
                action = action,
                timestamp = timestamp,
                gameID = currentGameID,
                sessionID = currentSessionID
            };
            
            DatabaseManager.Instance?.LogPlayerAction(playerAction);
        }

        private void LogGameResult(bool won)
        {
            GameResult result = new GameResult
            {
                gameID = currentGameID,
                won = won,
                endTime = DateTime.Now,
                finalScore = completedTasks.Count,
                reasonForEnd = "timeout" // Could be "timeout", "manual_exit", "all_tasks_complete", etc.
            };
            
            DatabaseManager.Instance?.LogGameResult(result);
        }
        #endregion

        #region Application Event Handlers
        private void OnApplicationFocusChanged(bool hasFocus)
        {
            if (!hasFocus && currentState == GameState.Playing)
            {
                // Pause game when application loses focus
                ChangeGameState(GameState.GamePaused);
            }
        }

        private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
        {
            Debug.Log($"[GameManager] Scene loaded: {scene.name}");
            
            // Handle scene-specific initialization
            switch (scene.name)
            {
                case "MainMenu":
                    ChangeGameState(GameState.MainMenu);
                    break;
                case "CharacterSelect":
                    ChangeGameState(GameState.CharacterSelect);
                    break;
                case "Settings":
                    ChangeGameState(GameState.Settings);
                    break;
                case "School":
                case "Mall":
                case "Home":
                    selectedScenario = scene.name;
                    ChangeGameState(GameState.Playing);
                    break;
                case "Win":
                    ChangeGameState(GameState.Win);
                    break;
                case "Lose":
                    ChangeGameState(GameState.Lose);
                    break;
            }
        }
        #endregion

        #region Cleanup
        private void OnDestroy()
        {
            // Unsubscribe from events
            Application.focusChanged -= OnApplicationFocusChanged;
            UnityEngine.SceneManagement.SceneManager.sceneLoaded -= OnSceneLoaded;
            
            // End current session
            EndCurrentSession();
            
            // Stop any running coroutines
            if (gameTimerCoroutine != null)
            {
                StopCoroutine(gameTimerCoroutine);
            }
        }

        private void OnApplicationPause(bool pauseStatus)
        {
            if (pauseStatus && currentState == GameState.Playing)
            {
                ChangeGameState(GameState.GamePaused);
            }
        }

        private void OnApplicationQuit()
        {
            EndCurrentSession();
        }
        #endregion
    }

    #region Data Structures
    public enum MonsterType
    {
        Happy,    // Positive monster - yellow
        Love,     // Positive monster - pink  
        Sad,      // Negative monster - blue
        Mad,      // Negative monster - red
        Panic     // Special monster - white
    }

    [System.Serializable]
    public class EmotionalSelection
    {
        public string emotion;
        public DateTime timestamp;
        public string sessionID;
    }

    [System.Serializable]
    public class TaskAttempt
    {
        public string taskID;
        public bool completed;
        public bool abandoned;
        public float timeSpent;
        public DateTime timestamp;
        public string gameID;
    }

    [System.Serializable]
    public class SocialInteraction
    {
        public string interactionType; // "helped_frozen", "avoided_frozen", "ran_from_panic"
        public string targetPlayerID;
        public DateTime timestamp;
        public string gameID;
    }

    [System.Serializable]
    public class PanicResponse
    {
        public Vector3 panicPosition;
        public Vector3 playerPosition;
        public Vector3 movementDirection;
        public float angleFromOptimal;
        public bool runningAway;
        public DateTime timestamp;
        public string gameID;
    }

    [System.Serializable]
    public class TeacherAlert
    {
        public string studentID;
        public string alertType;
        public string gameID;
        public DateTime timestamp;
        public string severity;
    }

    [System.Serializable]
    public class GameStatistics
    {
        public string gameID;
        public TimeSpan duration;
        public int tasksCompleted;
        public int timesFrezen;
        public int helpRequests;
        public string emotionSelected;
        public string monsterType;
        public string scenario;
    }

    [System.Serializable]
    public class StateChange
    {
        public string fromState;
        public string toState;
        public DateTime timestamp;
        public string sessionID;
    }

    [System.Serializable]
    public class PlayerAction
    {
        public string action;
        public DateTime timestamp;
        public string gameID;
        public string sessionID;
    }

    [System.Serializable]
    public class GameResult
    {
        public string gameID;
        public bool won;
        public DateTime endTime;
        public int finalScore;
        public string reasonForEnd;
    }
    #endregion
}