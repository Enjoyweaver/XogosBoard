using UnityEngine;

namespace EmotionQuest.Core
{
    /// <summary>
    /// Constants - All game configuration values and settings for MVP
    /// Centralized location for all game parameters, tuning values, and configuration
    /// </summary>
    public static class Constants
    {
        #region Game Rules - MVP Configuration
        // Player and Session Limits
        public const int MIN_PLAYERS_PER_GAME = 3;
        public const int MAX_PLAYERS_PER_GAME = 7;
        public const int MAX_POSITIVE_MONSTERS = 2;
        public const int TEACHERS_PER_GAME = 1;
        
        // Game Timing (in seconds)
        public const float GAME_DURATION_SECONDS = 600f; // 10 minutes
        public const float TASK_TIMEOUT_SECONDS = 120f; // 2 minutes per task
        public const float CONNECTION_TIMEOUT_SECONDS = 2700f; // 45 minutes
        public const float IDLE_TIMEOUT_SECONDS = 300f; // 5 minutes
        public const float ONE_MINUTE_WARNING_TIME = 60f;
        
        // Monster Distribution Rules (positive, negative) by player count
        public static readonly System.Collections.Generic.Dictionary<int, (int positive, int negative)> MONSTER_DISTRIBUTION = 
            new System.Collections.Generic.Dictionary<int, (int, int)>
            {
                { 3, (1, 1) }, // 1 positive, 1 negative, 1 panic
                { 4, (1, 2) }, // 1 positive, 2 negative, 1 panic
                { 5, (1, 3) }, // 1 positive, 3 negative, 1 panic
                { 6, (2, 3) }, // 2 positive, 3 negative, 1 panic
                { 7, (2, 4) }  // 2 positive, 4 negative, 1 panic
            };
        #endregion

        #region Monster Configuration
        // Movement Speeds (units per second)
        public const float DEFAULT_MONSTER_SPEED = 5f;
        public const float PANIC_MONSTER_SPEED = 6f;
        public const float FROZEN_MONSTER_SPEED = 0f;
        public const float HELPING_SPEED_MULTIPLIER = 0.8f; // Slower when helping others
        
        // Monster Abilities
        public const float FREEZE_RANGE = 2f; // Units
        public const float UNFREEZE_RANGE = 1.5f; // Units
        public const float FREEZE_COOLDOWN = 3f; // Seconds
        public const float HELP_INTERACTION_TIME = 2f; // Seconds to unfreeze
        
        // Transformation System
        public const float TRANSFORMATION_DURATION = 2f; // Seconds for color change animation
        public const int TASKS_FOR_FULL_TRANSFORMATION = 5; // Tasks needed to complete transformation
        public const float TRANSFORMATION_PROGRESS_PER_TASK = 0.2f; // 20% per task
        
        // Monster Colors (Hex values)
        public const string HAPPY_COLOR = "#FFD700"; // Gold/Yellow
        public const string LOVE_COLOR = "#FF69B4"; // Hot Pink
        public const string SAD_COLOR_START = "#87CEEB"; // Sky Blue
        public const string SAD_COLOR_END = "#FFD700"; // Transforms to yellow
        public const string MAD_COLOR_START = "#FF6B6B"; // Red
        public const string MAD_COLOR_END = "#FFD700"; // Transforms to yellow
        public const string PANIC_COLOR = "#FFFFFF"; // White
        #endregion

        #region Scene Names
        public const string MAIN_MENU_SCENE = "MainMenu";
        public const string CHARACTER_SELECT_SCENE = "CharacterSelect";
        public const string SETTINGS_SCENE = "Settings";
        public const string LOCAL_SERVER_SCENE = "LocalServer";
        public const string SCHOOL_SCENE = "School";
        public const string MALL_SCENE = "Mall";
        public const string HOME_SCENE = "Home";
        public const string WIN_SCENE = "Win";
        public const string LOSE_SCENE = "Lose";
        #endregion

        #region Audio Configuration
        // Volume Settings (0.0 to 1.0)
        public const float DEFAULT_MASTER_VOLUME = 1f;
        public const float DEFAULT_MUSIC_VOLUME = 0.7f;
        public const float DEFAULT_SFX_VOLUME = 0.8f;
        public const float DEFAULT_VOICE_VOLUME = 1f;
        
        // Classroom Volume Limiting
        public const float CLASSROOM_MAX_VOLUME = 0.6f;
        public const float HEADPHONE_MAX_VOLUME = 1f;
        
        // Audio Timing
        public const float AUDIO_FADE_DURATION = 2f;
        public const float SUBTITLE_DISPLAY_TIME = 3f;
        public const float VOICE_CLIP_DELAY = 0.5f;
        #endregion

        #region Input Configuration
        // Input Sensitivity and Timing
        public const float DEFAULT_INPUT_SENSITIVITY = 1f;
        public const float MIN_INPUT_SENSITIVITY = 0.1f;
        public const float MAX_INPUT_SENSITIVITY = 3f;
        public const float DEFAULT_DOUBLE_TAP_TIME = 0.3f;
        public const float DEFAULT_HOLD_TIME = 0.5f;
        
        // Security and Rate Limiting
        public const float MAX_INPUT_RATE = 10f; // Inputs per second
        public const float SPAM_DETECTION_THRESHOLD = 15f; // Inputs per second
        public const float TOUCH_MOVEMENT_THRESHOLD = 50f; // Pixels
        public const float TOUCH_TAP_THRESHOLD = 30f; // Pixels
        public const float TOUCH_TAP_TIME_LIMIT = 0.5f; // Seconds
        #endregion

        #region Database Configuration
        // Table Names
        public const string STUDENTS_TABLE = "students";
        public const string TEACHERS_TABLE = "teachers";
        public const string PARENTS_TABLE = "parents";
        public const string SESSIONS_TABLE = "sessions";
        public const string GAMES_TABLE = "games";
        public const string TASKS_TABLE = "tasks";
        public const string EMOTIONAL_SELECTIONS_TABLE = "emotional_selections";
        public const string BEHAVIORAL_DATA_TABLE = "behavioral_data";
        public const string ALERTS_TABLE = "alerts";
        
        // Data Sync Settings
        public const float DATABASE_SYNC_INTERVAL = 30f; // Seconds
        public const int BATCH_SIZE = 50; // Records per batch
        public const float OFFLINE_DATA_RETENTION = 86400f; // 24 hours in seconds
        public const int MAX_RETRY_ATTEMPTS = 3;
        public const float RETRY_DELAY = 5f; // Seconds
        #endregion

        #region Educational Analytics
        // Behavioral Tracking Thresholds
        public const float AVOIDANCE_BEHAVIOR_THRESHOLD = 0.7f; // 70% avoidance rate
        public const int MIN_INTERACTIONS_FOR_PATTERN = 3;
        public const float PANIC_AVOIDANCE_ANGLE = 80f; // Degrees
        public const int PANIC_ENCOUNTERS_FOR_PATTERN = 5;
        
        // Task Analysis
        public const float TASK_COMPLETION_TIME_THRESHOLD = 60f; // Seconds (unusually fast)
        public const float TASK_STRUGGLE_TIME_THRESHOLD = 180f; // Seconds (unusually slow)
        public const int TASK_ABANDONMENT_THRESHOLD = 3; // Abandoned tasks per session
        
        // Emotional Consistency Tracking
        public const int EMOTION_CHANGES_ALERT_THRESHOLD = 5; // Changes per session
        public const float EMOTIONAL_INCONSISTENCY_WINDOW = 1800f; // 30 minutes
        
        // Help-Seeking Behavior
        public const float HELP_REQUEST_RATE_NORMAL = 0.5f; // 50% of freeze events
        public const float HELP_REQUEST_RATE_CONCERNING_LOW = 0.1f; // 10% or less
        public const float HELP_REQUEST_RATE_CONCERNING_HIGH = 0.9f; // 90% or more
        #endregion

        #region Privacy and Compliance
        // COPPA Compliance
        public const int MIN_AGE_WITHOUT_CONSENT = 13;
        public const int MIN_AGE_FOR_GAME = 8;
        public const int MAX_AGE_FOR_GAME = 18;
        
        // Data Retention (in days)
        public const int STUDENT_DATA_RETENTION_DAYS = 365;
        public const int SESSION_DATA_RETENTION_DAYS = 90;
        public const int BEHAVIORAL_DATA_RETENTION_DAYS = 180;
        public const int ALERT_DATA_RETENTION_DAYS = 730; // 2 years
        
        // Privacy Settings
        public const bool ANONYMIZE_DATA_DEFAULT = true;
        public const bool ENCRYPT_SENSITIVE_DATA = true;
        public const bool REQUIRE_PARENTAL_CONSENT_DEFAULT = true;
        #endregion

        #region Network Configuration
        // Server Settings
        public const int DEFAULT_SERVER_PORT = 7777;
        public const string DEFAULT_SERVER_ADDRESS = "127.0.0.1";
        public const int MAX_RECONNECTION_ATTEMPTS = 5;
        public const float RECONNECTION_DELAY = 2f; // Seconds
        public const float HEARTBEAT_INTERVAL = 1f; // Seconds
        
        // Local Server Setup
        public const int LOCAL_SERVER_CODE_LENGTH = 6;
        public const string LOCAL_SERVER_CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        public const float LOCAL_SERVER_TIMEOUT = 300f; // 5 minutes
        
        // Network Performance
        public const float NETWORK_TICK_RATE = 20f; // Updates per second
        public const float POSITION_SYNC_THRESHOLD = 0.1f; // Units
        public const float STATE_SYNC_INTERVAL = 0.1f; // Seconds
        #endregion

        #region UI Configuration
        // Screen Resolutions and Scaling
        public const int REFERENCE_RESOLUTION_WIDTH = 1920;
        public const int REFERENCE_RESOLUTION_HEIGHT = 1080;
        public const float UI_SCALE_FACTOR = 1f;
        
        // Loading Screen
        public const float MIN_LOADING_TIME = 1.5f; // Seconds
        public const float LOADING_TIP_ROTATION_TIME = 3f; // Seconds
        
        // Pause Menu
        public const float PAUSE_MENU_FADE_TIME = 0.3f;
        public const float UI_ANIMATION_SPEED = 8f;
        
        // Accessibility
        public const int MIN_FONT_SIZE = 16;
        public const int MAX_FONT_SIZE = 48;
        public const float HIGH_CONTRAST_THRESHOLD = 0.7f;
        public const float COLORBLIND_SAFE_SATURATION = 0.8f;
        #endregion

        #region Performance Configuration
        // Frame Rate and Quality
        public const int TARGET_FRAMERATE_DESKTOP = 60;
        public const int TARGET_FRAMERATE_MOBILE = 30;
        public const int MAX_PARTICLE_COUNT = 100;
        public const float LOD_DISTANCE_THRESHOLD = 10f; // Units
        
        // Memory Management
        public const int AUDIO_SOURCE_POOL_SIZE = 10;
        public const int PARTICLE_POOL_SIZE = 50;
        public const int UI_ELEMENT_POOL_SIZE = 20;
        public const float GARBAGE_COLLECTION_INTERVAL = 30f; // Seconds
        
        // Asset Loading
        public const float ASSET_PRELOAD_TIME = 5f; // Seconds
        public const int MAX_CONCURRENT_LOADS = 3;
        public const float TEXTURE_COMPRESSION_QUALITY = 0.8f;
        #endregion

        #region Therapeutic Game Balance
        // Win Conditions
        public const int MIN_TASKS_FOR_TEAM_WIN = 3; // Per team member
        public const float WIN_CONDITION_TIME_LIMIT = 0.8f; // 80% of game time
        
        // Panic Monster Balance
        public const float PANIC_FREEZE_EFFECT_DURATION = 10f; // Seconds
        public const float PANIC_VICTORY_THRESHOLD = 0.5f; // 50% of players frozen
        public const int PANIC_MAX_ELIMINATIONS = 2; // Positive monsters
        
        // Therapeutic Objectives
        public const int DAILY_EMOTION_TRACKING_LIMIT = 5; // Different emotions per day
        public const float SOCIAL_INTERACTION_WEIGHT = 2f; // Multiplier for helping behavior
        public const float EMOTIONAL_GROWTH_RATE = 0.1f; // Progress per successful task
        
        // Intervention Thresholds
        public const float BEHAVIORAL_CONCERN_THRESHOLD = 0.8f; // 80% concerning behavior
        public const int CONSECUTIVE_AVOIDANCE_LIMIT = 5; // Times avoiding help
        public const float RISK_BEHAVIOR_ALERT_THRESHOLD = 0.6f; // 60% risky decisions
        #endregion

        #region Platform-Specific Settings
        // WebGL Configuration
        public const int WEBGL_MEMORY_SIZE = 512; // MB
        public const bool WEBGL_COMPRESSION_ENABLED = true;
        public const float WEBGL_LOAD_TIMEOUT = 30f; // Seconds
        
        // Mobile Configuration
        public const bool MOBILE_ADAPTIVE_QUALITY = true;
        // Mobile Configuration
        public const bool MOBILE_ADAPTIVE_QUALITY = true;
        public const float MOBILE_BATTERY_OPTIMIZATION = 0.8f;
        public const int MOBILE_MAX_TEXTURE_SIZE = 1024;
        public const bool MOBILE_REDUCE_PARTICLES = true;
        
        // Desktop Configuration
        public const bool DESKTOP_HIGH_QUALITY_AUDIO = true;
        public const bool DESKTOP_ADVANCED_GRAPHICS = true;
        public const int DESKTOP_MAX_TEXTURE_SIZE = 2048;
        #endregion

        #region Security Configuration
        // Session Security
        public const float SESSION_TOKEN_LIFETIME = 3600f; // 1 hour in seconds
        public const int MAX_FAILED_LOGIN_ATTEMPTS = 3;
        public const float LOGIN_LOCKOUT_DURATION = 300f; // 5 minutes
        
        // Data Validation
        public const int MAX_USERNAME_LENGTH = 50;
        public const int MIN_USERNAME_LENGTH = 3;
        public const int MAX_STUDENT_ID_LENGTH = 20;
        public const string ALLOWED_USERNAME_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
        
        // Alert System
        public const string ADMIN_ALERT_EMAIL = "zack@xogosgaming.com";
        public const int SECURITY_ALERT_PRIORITY = 1; // Highest priority
        public const float ALERT_COOLDOWN_PERIOD = 300f; // 5 minutes between same alerts
        #endregion

        #region Emotional Learning Categories
        // Emotion Types
        public static readonly string[] POSITIVE_EMOTIONS = { "Happy", "Love", "Excited", "Calm", "Confident" };
        public static readonly string[] NEGATIVE_EMOTIONS = { "Sad", "Mad", "Worried", "Frustrated", "Lonely" };
        public static readonly string[] NEUTRAL_EMOTIONS = { "Okay", "Tired", "Confused", "Curious" };
        
        // Coping Strategies (for future mini-game development)
        public static readonly string[] COPING_STRATEGIES = 
        {
            "Deep Breathing",
            "Positive Self-Talk", 
            "Physical Exercise",
            "Mindfulness",
            "Social Support",
            "Problem Solving",
            "Creative Expression",
            "Relaxation Techniques"
        };
        
        // Learning Objectives
        public static readonly string[] LEARNING_OBJECTIVES = 
        {
            "Emotion Recognition",
            "Emotional Regulation",
            "Social Awareness", 
            "Empathy Development",
            "Stress Management",
            "Communication Skills",
            "Problem-Solving Skills",
            "Resilience Building"
        };
        #endregion

        #region File Paths and Resources
        // Audio File Paths
        public const string AUDIO_PATH = "Audio/";
        public const string MUSIC_PATH = "Audio/Music/";
        public const string SFX_PATH = "Audio/SFX/";
        public const string VOICE_PATH = "Audio/Voice/";
        
        // Sprite File Paths
        public const string SPRITES_PATH = "Sprites/";
        public const string MONSTER_SPRITES_PATH = "Sprites/Monsters/";
        public const string UI_SPRITES_PATH = "Sprites/UI/";
        public const string ENVIRONMENT_SPRITES_PATH = "Sprites/Environment/";
        
        // Prefab Paths
        public const string PREFABS_PATH = "Prefabs/";
        public const string MONSTER_PREFABS_PATH = "Prefabs/Monsters/";
        public const string UI_PREFABS_PATH = "Prefabs/UI/";
        public const string EFFECT_PREFABS_PATH = "Prefabs/Effects/";
        
        // Save Data Paths
        public const string SAVE_DATA_PATH = "/SaveData/";
        public const string SETTINGS_FILE = "settings.json";
        public const string PROGRESS_FILE = "progress.json";
        public const string ANALYTICS_CACHE_FILE = "analytics_cache.json";
        #endregion

        #region Development and Debug
        // Debug Settings
        public const bool ENABLE_DEBUG_LOGS = true;
        public const bool ENABLE_PERFORMANCE_PROFILING = false;
        public const bool ENABLE_NETWORK_DEBUG = false;
        public const bool ENABLE_AI_DEBUG = false;
        
        // Development Features
        public const bool SKIP_INTRO_IN_DEVELOPMENT = false;
        public const bool ENABLE_CHEAT_CODES = false;
        public const bool FAST_GAME_MODE = false; // For testing
        public const float DEVELOPMENT_GAME_SPEED_MULTIPLIER = 1f;
        
        // Testing Configuration
        public const int TEST_PLAYER_COUNT = 4;
        public const string TEST_STUDENT_ID = "TEST_STUDENT_001";
        public const string TEST_SESSION_PREFIX = "TEST_SESSION_";
        public const bool MOCK_DATABASE_IN_TESTING = false;
        #endregion

        #region Version and Build Information
        public const string GAME_VERSION = "1.0.0-MVP";
        public const string BUILD_TARGET = "MVP";
        public const string UNITY_VERSION_REQUIRED = "2022.3.15f1";
        public const string API_VERSION = "v1.0";
        
        // Feature Flags for MVP
        public const bool ENABLE_EMOTIONAL_MUSIC = false; // Future feature
        public const bool ENABLE_ADVANCED_ANALYTICS = false; // Future feature
        public const bool ENABLE_VOICE_CHAT = false; // Future feature
        public const bool ENABLE_CUSTOM_AVATARS = false; // Future feature
        public const bool ENABLE_TEACHER_INTERVENTION = false; // Future feature
        #endregion

        #region Localization
        // Language Support
        public const string DEFAULT_LANGUAGE = "en";
        public static readonly string[] SUPPORTED_LANGUAGES = { "en" }; // MVP: English only
        
        // Text Keys (for future localization)
        public const string TEXT_GAME_START = "game_start";
        public const string TEXT_GAME_END = "game_end";
        public const string TEXT_HELP_REQUEST = "help_request";
        public const string TEXT_TASK_COMPLETE = "task_complete";
        public const string TEXT_TEAM_WIN = "team_win";
        public const string TEXT_TEAM_LOSE = "team_lose";
        #endregion

        #region Achievement System (Future)
        // Achievement Types
        public static readonly string[] ACHIEVEMENT_CATEGORIES = 
        {
            "Emotional Growth",
            "Social Helper", 
            "Task Master",
            "Team Player",
            "Resilience Builder"
        };
        
        // Achievement Thresholds
        public const int HELPER_ACHIEVEMENT_THRESHOLD = 10; // Help 10 players
        public const int TASK_MASTER_THRESHOLD = 25; // Complete 25 tasks
        public const int EMOTIONAL_GROWTH_THRESHOLD = 5; // Transform 5 times
        public const int TEAM_PLAYER_THRESHOLD = 15; // Win 15 team games
        #endregion

        #region Quality Assurance
        // Performance Benchmarks
        public const float MAX_FRAME_TIME_MS = 16.67f; // 60 FPS
        public const float MAX_MEMORY_USAGE_MB = 512f;
        public const float MAX_LOADING_TIME_SECONDS = 10f;
        public const float MIN_NETWORK_QUALITY = 0.8f; // 80% packet success
        
        // Quality Gates
        public const float MIN_GAMEPLAY_SMOOTHNESS = 0.9f; // 90% smooth frames
        public const float MAX_CRASH_RATE = 0.01f; // 1% crash rate
        public const float MIN_AUDIO_QUALITY = 0.95f; // 95% audio success
        public const float MAX_INPUT_LATENCY_MS = 50f; // 50ms max input delay
        #endregion

        #region Integration Points
        // Xogos Platform Integration (Future)
        public const string XOGOS_API_VERSION = "v1.0";
        public const string XOGOS_GAME_ID = "emotion_quest_mvp";
        public const bool ENABLE_XOGOS_INTEGRATION = false; // Will be enabled later
        public const float XOGOS_SYNC_INTERVAL = 60f; // Seconds
        
        // External Analytics
        public const bool ENABLE_GOOGLE_ANALYTICS = false; // Future feature
        public const bool ENABLE_FIREBASE_ANALYTICS = false; // Future feature
        public const string ANALYTICS_CONSENT_VERSION = "1.0";
        #endregion

        #region Utility Methods
        /// <summary>
        /// Get monster distribution for a given player count
        /// </summary>
        public static (int positive, int negative) GetMonsterDistribution(int playerCount)
        {
            if (MONSTER_DISTRIBUTION.ContainsKey(playerCount))
            {
                return MONSTER_DISTRIBUTION[playerCount];
            }
            
            // Fallback for invalid player counts
            Debug.LogWarning($"[Constants] Invalid player count: {playerCount}. Using default distribution.");
            return (1, 1); // Default: 1 positive, 1 negative, 1 panic
        }

        /// <summary>
        /// Check if a player count is valid for gameplay
        /// </summary>
        public static bool IsValidPlayerCount(int playerCount)
        {
            return playerCount >= MIN_PLAYERS_PER_GAME && playerCount <= MAX_PLAYERS_PER_GAME;
        }

        /// <summary>
        /// Get the maximum allowed volume based on device type
        /// </summary>
        public static float GetMaxVolumeForDevice(bool isHeadphoneMode)
        {
            return isHeadphoneMode ? HEADPHONE_MAX_VOLUME : CLASSROOM_MAX_VOLUME;
        }

        /// <summary>
        /// Check if an emotion is categorized as positive
        /// </summary>
        public static bool IsPositiveEmotion(string emotion)
        {
            return System.Array.Exists(POSITIVE_EMOTIONS, e => e.Equals(emotion, System.StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Check if an emotion is categorized as negative
        /// </summary>
        public static bool IsNegativeEmotion(string emotion)
        {
            return System.Array.Exists(NEGATIVE_EMOTIONS, e => e.Equals(emotion, System.StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Get color for monster type
        /// </summary>
        public static string GetMonsterColor(MonsterType monsterType)
        {
            return monsterType switch
            {
                MonsterType.Happy => HAPPY_COLOR,
                MonsterType.Love => LOVE_COLOR,
                MonsterType.Sad => SAD_COLOR_START,
                MonsterType.Mad => MAD_COLOR_START,
                MonsterType.Panic => PANIC_COLOR,
                _ => HAPPY_COLOR
            };
        }

        /// <summary>
        /// Convert hex color to Unity Color
        /// </summary>
        public static Color HexToColor(string hex)
        {
            if (ColorUtility.TryParseHtmlString(hex, out Color color))
            {
                return color;
            }
            
            Debug.LogWarning($"[Constants] Invalid hex color: {hex}");
            return Color.white;
        }

        /// <summary>
        /// Get resource path for monster sprite
        /// </summary>
        public static string GetMonsterSpritePath(MonsterType monsterType, string action)
        {
            string monsterName = monsterType.ToString().ToLower();
            return $"{MONSTER_SPRITES_PATH}{monsterName}/{monsterName}_{action}";
        }

        /// <summary>
        /// Check if current build is development
        /// </summary>
        public static bool IsDevelopmentBuild()
        {
            return Debug.isDebugBuild || BUILD_TARGET == "MVP";
        }

        /// <summary>
        /// Get appropriate target framerate for current platform
        /// </summary>
        public static int GetTargetFramerate()
        {
            return Application.isMobilePlatform ? TARGET_FRAMERATE_MOBILE : TARGET_FRAMERATE_DESKTOP;
        }

        /// <summary>
        /// Check if a behavior pattern should trigger an alert
        /// </summary>
        public static bool ShouldTriggerBehavioralAlert(float behaviorRate, int interactionCount)
        {
            return behaviorRate >= BEHAVIORAL_CONCERN_THRESHOLD && 
                   interactionCount >= MIN_INTERACTIONS_FOR_PATTERN;
        }

        /// <summary>
        /// Generate a local server code
        /// </summary>
        public static string GenerateLocalServerCode()
        {
            System.Text.StringBuilder code = new System.Text.StringBuilder();
            for (int i = 0; i < LOCAL_SERVER_CODE_LENGTH; i++)
            {
                int randomIndex = UnityEngine.Random.Range(0, LOCAL_SERVER_CODE_CHARS.Length);
                code.Append(LOCAL_SERVER_CODE_CHARS[randomIndex]);
            }
            return code.ToString();
        }
        #endregion
    }

    #region Enums
    /// <summary>
    /// Monster types available in the game
    /// </summary>
    public enum MonsterType
    {
        Happy,    // Positive monster - yellow
        Love,     // Positive monster - pink  
        Sad,      // Negative monster - blue
        Mad,      // Negative monster - red
        Panic     // Special monster - white
    }

    /// <summary>
    /// Available game scenarios/environments
    /// </summary>
    public enum GameScenario
    {
        School,
        Mall,
        Home
    }

    /// <summary>
    /// Alert priority levels
    /// </summary>
    public enum AlertPriority
    {
        Low = 3,
        Medium = 2,
        High = 1,
        Critical = 0
    }

    /// <summary>
    /// Data collection consent levels
    /// </summary>
    public enum ConsentLevel
    {
        None,           // No data collection
        Anonymous,      // Anonymous analytics only
        Educational,    // Educational progress tracking
        Full           // Full therapeutic tracking (with parental consent)
    }
    #endregion
}