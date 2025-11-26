using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

namespace EmotionQuest.Core
{
    /// <summary>
    /// Scene Transition Manager - Handles all scene loading, transitions, and data persistence
    /// Manages MVP scene flow: MainMenu -> CharacterSelect -> Game Scene -> Win/Lose -> MainMenu
    /// </summary>
    public class SceneTransitionManager : MonoBehaviour
    {
        #region Singleton Pattern
        public static SceneTransitionManager Instance { get; private set; }

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

        #region Scene Configuration
        [Header("Scene Names - MVP")]
        public const string MAIN_MENU_SCENE = "MainMenu";
        public const string CHARACTER_SELECT_SCENE = "CharacterSelect";
        public const string SETTINGS_SCENE = "Settings";
        public const string LOCAL_SERVER_SCENE = "LocalServer";
        public const string SCHOOL_SCENE = "School";
        public const string MALL_SCENE = "Mall";
        public const string HOME_SCENE = "Home";
        public const string WIN_SCENE = "Win";
        public const string LOSE_SCENE = "Lose";

        [Header("Loading Screen UI")]
        public GameObject loadingScreenPrefab;
        public Canvas loadingCanvas;
        public Slider progressBar;
        public Text loadingText;
        public Text tipText;
        public Image loadingSpinner;
        
        private GameObject currentLoadingScreen;
        private bool isLoading = false;
        #endregion

        #region Educational Loading Tips
        private readonly string[] educationalTips = new string[]
        {
            "💡 Help your frozen friends by walking up to them!",
            "🎯 Complete tasks to help negative monsters feel better!",
            "🤝 Working together makes everyone stronger!",
            "😊 Choose how you're feeling honestly - it helps the game help you!",
            "🏃 Sometimes it's okay to run from Panic - that's being smart!",
            "❤️ Helping others makes you feel good too!",
            "🌟 Every emotion is valid and important!",
            "🎮 Take breaks if you need them - games should be fun!",
            "🧠 The strategies you learn here work in real life too!",
            "👥 Everyone plays differently, and that's perfectly okay!"
        };
        #endregion

        #region Data Persistence
        [Header("Persistent Data")]
        public ScenePersistentData persistentData;
        
        [System.Serializable]
        public class ScenePersistentData
        {
            public string studentID;
            public string selectedEmotion;
            public MonsterType assignedMonsterType;
            public string selectedScenario;
            public DateTime sessionStartTime;
            public string sessionID;
            public string gameID;
            
            // Cumulative session data
            public int totalGamesPlayed;
            public int totalWins;
            public int totalLosses;
            public List<string> emotionsSelectedToday;
            public float totalPlayTime;
            
            public ScenePersistentData()
            {
                emotionsSelectedToday = new List<string>();
                totalGamesPlayed = 0;
                totalWins = 0;
                totalLosses = 0;
                totalPlayTime = 0f;
            }
        }
        #endregion

        #region Initialization
        private void Initialize()
        {
            // Initialize persistent data
            if (persistentData == null)
            {
                persistentData = new ScenePersistentData();
            }
            
            // Create loading screen if it doesn't exist
            SetupLoadingScreen();
            
            Debug.Log("[SceneTransitionManager] Scene Management System Initialized");
        }

        private void SetupLoadingScreen()
        {
            if (loadingScreenPrefab == null)
            {
                CreateDefaultLoadingScreen();
            }
        }

        private void CreateDefaultLoadingScreen()
        {
            // Create loading screen canvas
            GameObject loadingObject = new GameObject("LoadingScreen");
            DontDestroyOnLoad(loadingObject);
            
            loadingCanvas = loadingObject.AddComponent<Canvas>();
            loadingCanvas.renderMode = RenderMode.ScreenSpaceOverlay;
            loadingCanvas.sortingOrder = 1000; // Ensure it's on top
            
            CanvasScaler scaler = loadingObject.AddComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1920, 1080);
            
            loadingObject.AddComponent<GraphicRaycaster>();
            
            // Background panel
            GameObject backgroundPanel = new GameObject("BackgroundPanel");
            backgroundPanel.transform.SetParent(loadingCanvas.transform, false);
            
            Image backgroundImage = backgroundPanel.AddComponent<Image>();
            backgroundImage.color = new Color(0.1f, 0.1f, 0.2f, 0.95f); // Semi-transparent dark background
            
            RectTransform bgRect = backgroundPanel.GetComponent<RectTransform>();
            bgRect.anchorMin = Vector2.zero;
            bgRect.anchorMax = Vector2.one;
            bgRect.offsetMin = Vector2.zero;
            bgRect.offsetMax = Vector2.zero;
            
            // Loading text
            GameObject loadingTextObj = new GameObject("LoadingText");
            loadingTextObj.transform.SetParent(backgroundPanel.transform, false);
            
            loadingText = loadingTextObj.AddComponent<Text>();
            loadingText.text = "Loading...";
            loadingText.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
            loadingText.fontSize = 48;
            loadingText.color = Color.white;
            loadingText.alignment = TextAnchor.MiddleCenter;
            
            RectTransform loadingTextRect = loadingTextObj.GetComponent<RectTransform>();
            loadingTextRect.anchorMin = new Vector2(0.5f, 0.6f);
            loadingTextRect.anchorMax = new Vector2(0.5f, 0.6f);
            loadingTextRect.sizeDelta = new Vector2(400, 60);
            
            // Progress bar
            CreateProgressBar(backgroundPanel);
            
            // Tip text
            GameObject tipTextObj = new GameObject("TipText");
            tipTextObj.transform.SetParent(backgroundPanel.transform, false);
            
            tipText = tipTextObj.AddComponent<Text>();
            tipText.text = "💡 Tip: Loading...";
            tipText.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
            tipText.fontSize = 24;
            tipText.color = Color.yellow;
            tipText.alignment = TextAnchor.MiddleCenter;
            
            RectTransform tipTextRect = tipTextObj.GetComponent<RectTransform>();
            tipTextRect.anchorMin = new Vector2(0.5f, 0.3f);
            tipTextRect.anchorMax = new Vector2(0.5f, 0.3f);
            tipTextRect.sizeDelta = new Vector2(800, 40);
            
            loadingObject.SetActive(false);
            currentLoadingScreen = loadingObject;
        }

        private void CreateProgressBar(GameObject parent)
        {
            GameObject progressBarObj = new GameObject("ProgressBar");
            progressBarObj.transform.SetParent(parent.transform, false);
            
            progressBar = progressBarObj.AddComponent<Slider>();
            progressBar.minValue = 0f;
            progressBar.maxValue = 1f;
            progressBar.value = 0f;
            
            RectTransform progressRect = progressBarObj.GetComponent<RectTransform>();
            progressRect.anchorMin = new Vector2(0.5f, 0.45f);
            progressRect.anchorMax = new Vector2(0.5f, 0.45f);
            progressRect.sizeDelta = new Vector2(600, 30);
            
            // Background
            GameObject background = new GameObject("Background");
            background.transform.SetParent(progressBarObj.transform, false);
            Image bgImage = background.AddComponent<Image>();
            bgImage.color = new Color(0.2f, 0.2f, 0.2f, 0.8f);
            
            RectTransform bgRect = background.GetComponent<RectTransform>();
            bgRect.anchorMin = Vector2.zero;
            bgRect.anchorMax = Vector2.one;
            bgRect.offsetMin = Vector2.zero;
            bgRect.offsetMax = Vector2.zero;
            
            // Fill area
            GameObject fillArea = new GameObject("Fill Area");
            fillArea.transform.SetParent(progressBarObj.transform, false);
            
            RectTransform fillAreaRect = fillArea.GetComponent<RectTransform>();
            fillAreaRect.anchorMin = Vector2.zero;
            fillAreaRect.anchorMax = Vector2.one;
            fillAreaRect.offsetMin = Vector2.zero;
            fillAreaRect.offsetMax = Vector2.zero;
            
            // Fill
            GameObject fill = new GameObject("Fill");
            fill.transform.SetParent(fillArea.transform, false);
            Image fillImage = fill.AddComponent<Image>();
            fillImage.color = new Color(0.3f, 0.7f, 1f, 1f); // Blue fill
            
            RectTransform fillRect = fill.GetComponent<RectTransform>();
            fillRect.anchorMin = Vector2.zero;
            fillRect.anchorMax = Vector2.one;
            fillRect.offsetMin = Vector2.zero;
            fillRect.offsetMax = Vector2.zero;
            
            progressBar.fillRect = fillRect;
            progressBar.targetGraphic = fillImage;
        }
        #endregion

        #region Scene Transition Methods
        public void LoadScene(string sceneName, bool showLoadingScreen = true)
        {
            if (isLoading)
            {
                Debug.LogWarning($"[SceneTransitionManager] Already loading a scene. Ignoring request to load {sceneName}");
                return;
            }

            StartCoroutine(LoadSceneCoroutine(sceneName, showLoadingScreen));
        }

        public void LoadMainMenu()
        {
            SaveCurrentSessionData();
            LoadScene(MAIN_MENU_SCENE);
        }

        public void LoadCharacterSelect()
        {
            LoadScene(CHARACTER_SELECT_SCENE);
        }

        public void LoadSettings()
        {
            LoadScene(SETTINGS_SCENE);
        }

        public void LoadLocalServerSetup()
        {
            LoadScene(LOCAL_SERVER_SCENE);
        }

        public void LoadGameScene(string scenario)
        {
            switch (scenario.ToLower())
            {
                case "school":
                    persistentData.selectedScenario = "School";
                    LoadScene(SCHOOL_SCENE);
                    break;
                case "mall":
                    persistentData.selectedScenario = "Mall";
                    LoadScene(MALL_SCENE);
                    break;
                case "home":
                    persistentData.selectedScenario = "Home";
                    LoadScene(HOME_SCENE);
                    break;
                default:
                    Debug.LogError($"[SceneTransitionManager] Invalid scenario: {scenario}");
                    LoadScene(SCHOOL_SCENE); // Default fallback
                    break;
            }
        }

        public void LoadWinScene()
        {
            persistentData.totalWins++;
            persistentData.totalGamesPlayed++;
            SaveGameResult(true);
            LoadScene(WIN_SCENE);
        }

        public void LoadLoseScene()
        {
            persistentData.totalLosses++;
            persistentData.totalGamesPlayed++;
            SaveGameResult(false);
            LoadScene(LOSE_SCENE);
        }

        public void ForceEndGameAndReturnToMenu()
        {
            // Called when player hits escape and chooses to exit
            Debug.Log("[SceneTransitionManager] Player forced game exit");
            
            // Log the forced exit for therapeutic analysis
            DatabaseManager.Instance?.LogForcedGameExit(persistentData.gameID, DateTime.Now);
            
            // Determine if this should count as a loss or be neutral
            persistentData.totalGamesPlayed++;
            SaveGameResult(false); // Count forced exits as losses for now
            
            LoadMainMenu();
        }

        private IEnumerator LoadSceneCoroutine(string sceneName, bool showLoadingScreen)
        {
            isLoading = true;

            if (showLoadingScreen)
            {
                ShowLoadingScreen();
                ShowRandomTip();
            }

            // Small delay to show loading screen
            yield return new WaitForSeconds(0.1f);

            // Start loading the scene asynchronously
            AsyncOperation asyncLoad = SceneManager.LoadSceneAsync(sceneName);
            asyncLoad.allowSceneActivation = false;

            float loadingTime = 0f;
            const float minimumLoadingTime = 1.5f; // Minimum time to show loading screen

            // Update progress bar
            while (!asyncLoad.isDone || loadingTime < minimumLoadingTime)
            {
                loadingTime += Time.deltaTime;

                if (showLoadingScreen)
                {
                    // Calculate progress (scene loading + minimum time)
                    float sceneProgress = Mathf.Clamp01(asyncLoad.progress / 0.9f);
                    float timeProgress = Mathf.Clamp01(loadingTime / minimumLoadingTime);
                    float totalProgress = Mathf.Min(sceneProgress, timeProgress);

                    UpdateLoadingProgress(totalProgress, sceneName);
                }

                // Allow scene activation when both conditions are met
                if (asyncLoad.progress >= 0.9f && loadingTime >= minimumLoadingTime)
                {
                    if (showLoadingScreen)
                    {
                        UpdateLoadingProgress(1f, sceneName);
                        yield return new WaitForSeconds(0.2f); // Brief pause at 100%
                    }
                    
                    asyncLoad.allowSceneActivation = true;
                }

                yield return null;
            }

            if (showLoadingScreen)
            {
                HideLoadingScreen();
            }

            // Handle scene-specific setup
            HandleSceneLoaded(sceneName);

            isLoading = false;
            Debug.Log($"[SceneTransitionManager] Scene loaded: {sceneName}");
        }

        private void HandleSceneLoaded(string sceneName)
        {
            // Update persistent data based on scene
            switch (sceneName)
            {
                case CHARACTER_SELECT_SCENE:
                    // Reset game-specific data when entering character select
                    persistentData.gameID = null;
                    break;

                case SCHOOL_SCENE:
                case MALL_SCENE:
                case HOME_SCENE:
                    // Starting a new game
                    persistentData.gameID = GameManager.Instance?.currentGameID;
                    break;

                case WIN_SCENE:
                case LOSE_SCENE:
                    // Game ended, prepare for return to main menu
                    break;
            }

            // Notify other systems about scene change
            NotifySceneChange(sceneName);
        }

        private void NotifySceneChange(string sceneName)
        {
            // Send scene change event to analytics
            DatabaseManager.Instance?.LogSceneTransition(
                persistentData.sessionID,
                SceneManager.GetActiveScene().name,
                sceneName,
                DateTime.Now
            );
        }
        #endregion

        #region Loading Screen Management
        private void ShowLoadingScreen()
        {
            if (currentLoadingScreen != null)
            {
                currentLoadingScreen.SetActive(true);
                
                if (progressBar != null)
                {
                    progressBar.value = 0f;
                }
            }
        }

        private void HideLoadingScreen()
        {
            if (currentLoadingScreen != null)
            {
                currentLoadingScreen.SetActive(false);
            }
        }

        private void UpdateLoadingProgress(float progress, string sceneName)
        {
            if (progressBar != null)
            {
                progressBar.value = progress;
            }

            if (loadingText != null)
            {
                string sceneDisplayName = GetSceneDisplayName(sceneName);
                loadingText.text = $"Loading {sceneDisplayName}... {Mathf.RoundToInt(progress * 100)}%";
            }
        }

        private void ShowRandomTip()
        {
            if (tipText != null && educationalTips.Length > 0)
            {
                int randomIndex = UnityEngine.Random.Range(0, educationalTips.Length);
                tipText.text = educationalTips[randomIndex];
            }
        }

        private string GetSceneDisplayName(string sceneName)
        {
            return sceneName switch
            {
                MAIN_MENU_SCENE => "Main Menu",
                CHARACTER_SELECT_SCENE => "Character Selection",
                SETTINGS_SCENE => "Settings",
                LOCAL_SERVER_SCENE => "Local Server Setup",
                SCHOOL_SCENE => "School Environment",
                MALL_SCENE => "Mall Environment",
                HOME_SCENE => "Home Environment",
                WIN_SCENE => "Victory Celebration",
                LOSE_SCENE => "Encouragement Screen",
                _ => sceneName
            };
        }
        #endregion

        #region Data Persistence Methods
        public void SetStudentData(string studentID, string teacherID, string parentID)
        {
            persistentData.studentID = studentID;
            // Store additional IDs for dashboard access
            PlayerDataManager.Instance?.SetStudentInfo(studentID, teacherID, parentID);
        }

        public void SetEmotionalSelection(string emotion, MonsterType monsterType)
        {
            persistentData.selectedEmotion = emotion;
            persistentData.assignedMonsterType = monsterType;
            
            // Track daily emotional selections
            if (!persistentData.emotionsSelectedToday.Contains(emotion))
            {
                persistentData.emotionsSelectedToday.Add(emotion);
            }
            
            // Save emotional selection to database immediately
            DatabaseManager.Instance?.LogEmotionalSelection(new EmotionalSelection
            {
                emotion = emotion,
                timestamp = DateTime.Now,
                sessionID = persistentData.sessionID
            });
        }

        public void StartNewSession(string sessionID)
        {
            persistentData.sessionID = sessionID;
            persistentData.sessionStartTime = DateTime.Now;
            
            // Reset daily tracking if it's a new day
            DateTime today = DateTime.Today;
            if (persistentData.emotionsSelectedToday.Count > 0)
            {
                // Check if we need to reset daily data (simplified for MVP)
                persistentData.emotionsSelectedToday.Clear();
            }
        }

        private void SaveCurrentSessionData()
        {
            if (!string.IsNullOrEmpty(persistentData.sessionID))
            {
                // Calculate total session time
                TimeSpan sessionDuration = DateTime.Now - persistentData.sessionStartTime;
                persistentData.totalPlayTime += (float)sessionDuration.TotalMinutes;

                // Save session summary to database
                DatabaseManager.Instance?.LogSessionSummary(new SessionSummary
                {
                    sessionID = persistentData.sessionID,
                    studentID = persistentData.studentID,
                    duration = sessionDuration,
                    gamesPlayed = persistentData.totalGamesPlayed,
                    wins = persistentData.totalWins,
                    losses = persistentData.totalLosses,
                    emotionsSelected = new List<string>(persistentData.emotionsSelectedToday),
                    endTime = DateTime.Now
                });
            }
        }

        private void SaveGameResult(bool won)
        {
            if (!string.IsNullOrEmpty(persistentData.gameID))
            {
                DatabaseManager.Instance?.LogGameResult(new GameResult
                {
                    gameID = persistentData.gameID,
                    won = won,
                    endTime = DateTime.Now,
                    finalScore = 0, // Will be set by GameManager
                    reasonForEnd = won ? "victory" : "defeat"
                });
            }
        }

        public ScenePersistentData GetPersistentData()
        {
            return persistentData;
        }

        public void ResetSessionData()
        {
            persistentData = new ScenePersistentData();
            Debug.Log("[SceneTransitionManager] Session data reset");
        }
        #endregion

        #region Pause/Resume Functionality
        public void ShowEscapeMenu()
        {
            // Called when player presses Escape during gameplay
            if (GameManager.Instance != null)
            {
                GameManager.Instance.ChangeGameState(GameManager.GameState.GamePaused);
            }
            
            // Show pause menu with options: Resume, Settings, Exit to Main Menu
            ShowPauseMenu();
        }

        private void ShowPauseMenu()
        {
            // Create simple pause menu (for MVP)
            GameObject pauseMenu = CreatePauseMenu();
            pauseMenu.SetActive(true);
        }

        private GameObject CreatePauseMenu()
        {
            GameObject pauseMenuObj = new GameObject("PauseMenu");
            DontDestroyOnLoad(pauseMenuObj);
            
            Canvas pauseCanvas = pauseMenuObj.AddComponent<Canvas>();
            pauseCanvas.renderMode = RenderMode.ScreenSpaceOverlay;
            pauseCanvas.sortingOrder = 999;
            
            // Semi-transparent background
            GameObject background = new GameObject("Background");
            background.transform.SetParent(pauseCanvas.transform, false);
            
            Image bgImage = background.AddComponent<Image>();
            bgImage.color = new Color(0f, 0f, 0f, 0.7f);
            
            RectTransform bgRect = background.GetComponent<RectTransform>();
            bgRect.anchorMin = Vector2.zero;
            bgRect.anchorMax = Vector2.one;
            bgRect.offsetMin = Vector2.zero;
            bgRect.offsetMax = Vector2.zero;
            
            // Menu panel
            GameObject menuPanel = new GameObject("MenuPanel");
            menuPanel.transform.SetParent(background.transform, false);
            
            Image panelImage = menuPanel.AddComponent<Image>();
            panelImage.color = new Color(0.2f, 0.2f, 0.3f, 0.95f);
            
            RectTransform panelRect = menuPanel.GetComponent<RectTransform>();
            panelRect.anchorMin = new Vector2(0.5f, 0.5f);
            panelRect.anchorMax = new Vector2(0.5f, 0.5f);
            panelRect.sizeDelta = new Vector2(400, 300);
            
            // Title
            CreatePauseMenuText(menuPanel, "Game Paused", new Vector2(0, 80), 32);
            
            // Buttons
            CreatePauseMenuButton(menuPanel, "Resume", new Vector2(0, 20), () => ResumeGame());
            CreatePauseMenuButton(menuPanel, "Settings", new Vector2(0, -20), () => LoadSettings());
            CreatePauseMenuButton(menuPanel, "Exit to Main Menu", new Vector2(0, -60), () => ConfirmExitToMainMenu());
            
            return pauseMenuObj;
        }

        private void CreatePauseMenuText(GameObject parent, string text, Vector2 position, int fontSize)
        {
            GameObject textObj = new GameObject("Text_" + text.Replace(" ", ""));
            textObj.transform.SetParent(parent.transform, false);
            
            Text textComponent = textObj.AddComponent<Text>();
            textComponent.text = text;
            textComponent.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
            textComponent.fontSize = fontSize;
            textComponent.color = Color.white;
            textComponent.alignment = TextAnchor.MiddleCenter;
            
            RectTransform textRect = textObj.GetComponent<RectTransform>();
            textRect.anchoredPosition = position;
            textRect.sizeDelta = new Vector2(350, 40);
        }

        private void CreatePauseMenuButton(GameObject parent, string text, Vector2 position, System.Action onClick)
        {
            GameObject buttonObj = new GameObject("Button_" + text.Replace(" ", ""));
            buttonObj.transform.SetParent(parent.transform, false);
            
            Button button = buttonObj.AddComponent<Button>();
            Image buttonImage = buttonObj.AddComponent<Image>();
            buttonImage.color = new Color(0.3f, 0.6f, 1f, 1f);
            
            RectTransform buttonRect = buttonObj.GetComponent<RectTransform>();
            buttonRect.anchoredPosition = position;
            buttonRect.sizeDelta = new Vector2(200, 35);
            
            // Button text
            GameObject textObj = new GameObject("Text");
            textObj.transform.SetParent(buttonObj.transform, false);
            
            Text buttonText = textObj.AddComponent<Text>();
            buttonText.text = text;
            buttonText.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
            buttonText.fontSize = 18;
            buttonText.color = Color.white;
            buttonText.alignment = TextAnchor.MiddleCenter;
            
            RectTransform textRect = textObj.GetComponent<RectTransform>();
            textRect.anchorMin = Vector2.zero;
            textRect.anchorMax = Vector2.one;
            textRect.offsetMin = Vector2.zero;
            textRect.offsetMax = Vector2.zero;
            
            button.targetGraphic = buttonImage;
            button.onClick.AddListener(() => onClick?.Invoke());
        }

        private void ResumeGame()
        {
            // Destroy pause menu and resume game
            GameObject pauseMenu = GameObject.Find("PauseMenu");
            if (pauseMenu != null)
            {
                Destroy(pauseMenu);
            }
            
            if (GameManager.Instance != null)
            {
                GameManager.Instance.ChangeGameState(GameManager.GameState.Playing);
            }
        }

        private void ConfirmExitToMainMenu()
        {
            // For MVP, directly exit to main menu
            // In full version, could show confirmation dialog
            ForceEndGameAndReturnToMenu();
            
            // Destroy pause menu
            GameObject pauseMenu = GameObject.Find("PauseMenu");
            if (pauseMenu != null)
            {
                Destroy(pauseMenu);
            }
        }
        #endregion

        #region Cleanup
        private void OnDestroy()
        {
            // Save any pending session data
            SaveCurrentSessionData();
            
            // Clean up loading screen
            if (currentLoadingScreen != null && currentLoadingScreen != gameObject)
            {
                Destroy(currentLoadingScreen);
            }
        }

        private void OnApplicationPause(bool pauseStatus)
        {
            if (pauseStatus)
            {
                SaveCurrentSessionData();
            }
        }

        private void OnApplicationQuit()
        {
            SaveCurrentSessionData();
        }
        #endregion
    }

    #region Additional Data Structures
    [System.Serializable]
    public class SessionSummary
    {
        public string sessionID;
        public string studentID;
        public TimeSpan duration;
        public int gamesPlayed;
        public int wins;
        public int losses;
        public List<string> emotionsSelected;
        public DateTime endTime;
    }
    #endregion
}