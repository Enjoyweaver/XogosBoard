using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

namespace EmotionQuest.Core
{
    /// <summary>
    /// Input Manager - Unified input handling for all platforms and accessibility needs
    /// Supports keyboard, mouse, touch, and future accessibility inputs
    /// </summary>
    public class InputManager : MonoBehaviour
    {
        #region Singleton Pattern
        public static InputManager Instance { get; private set; }

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

        #region Input Configuration
        [Header("Input Settings")]
        public bool keyboardEnabled = true;
        public bool mouseEnabled = true;
        public bool touchEnabled = true;
        public bool gamepadEnabled = false; // Future feature
        
        [Header("Accessibility Settings")]
        public bool assistiveInputEnabled = false; // Future: Switch controls, eye tracking
        public float inputSensitivity = 1f;
        public float doubleTapTime = 0.3f;
        public float holdTime = 0.5f;
        
        // Input validation and security
        [Header("Security Settings")]
        public bool inputValidationEnabled = true;
        public float inputRateLimit = 10f; // Max inputs per second
        public bool antiSpamEnabled = true;
        #endregion

        #region Input Events
        // Movement events
        public static event Action<Vector2> OnMovementInput;
        public static event Action OnMovementStopped;
        
        // Action events
        public static event Action OnPrimaryAction; // Interact, confirm
        public static event Action OnSecondaryAction; // Cancel, back
        public static event Action OnHelpRequest; // When frozen, request help
        public static event Action OnPauseRequest; // Escape key
        
        // UI Navigation events
        public static event Action<Vector2> OnUINavigation;
        public static event Action OnUIConfirm;
        public static event Action OnUICancel;
        
        // Touch-specific events
        public static event Action<Vector2> OnTouchStart;
        public static event Action<Vector2> OnTouchEnd;
        public static event Action<Vector2> OnTouchMove;
        #endregion

        #region Input State Tracking
        private Vector2 currentMovementInput;
        private Vector2 lastMousePosition;
        private bool isMoving = false;
        
        // Input rate limiting
        private Queue<float> inputTimestamps = new Queue<float>();
        private float lastInputTime = 0f;
        
        // Touch tracking
        private Dictionary<int, TouchData> activeTouches = new Dictionary<int, TouchData>();
        private bool isTouchDevice = false;
        
        // Context-based input handling
        public enum InputContext
        {
            MainMenu,
            Gameplay,
            MinigameActive,
            PauseMenu,
            Settings,
            Frozen // Special state when player is frozen
        }
        
        public InputContext currentContext = InputContext.MainMenu;
        #endregion

        #region Initialization
        private void Initialize()
        {
            DetectInputDevices();
            SetupInputCallbacks();
            LoadInputSettings();
            
            Debug.Log("[InputManager] Input System Initialized");
        }

        private void DetectInputDevices()
        {
            // Detect if we're on a touch device
            isTouchDevice = Application.isMobilePlatform || 
                           (Application.platform == RuntimePlatform.WebGLPlayer && Input.touchSupported);
            
            // Enable appropriate input methods
            if (isTouchDevice)
            {
                touchEnabled = true;
                Debug.Log("[InputManager] Touch device detected");
            }
            else
            {
                keyboardEnabled = true;
                mouseEnabled = true;
                Debug.Log("[InputManager] Desktop device detected");
            }
        }

        private void SetupInputCallbacks()
        {
            // Subscribe to game state changes to adjust input context
            if (GameManager.Instance != null)
            {
                GameManager.OnGameStateChanged += OnGameStateChanged;
            }
        }

        private void LoadInputSettings()
        {
            inputSensitivity = PlayerPrefs.GetFloat("Input_Sensitivity", 1f);
            doubleTapTime = PlayerPrefs.GetFloat("Input_DoubleTapTime", 0.3f);
            antiSpamEnabled = PlayerPrefs.GetInt("Input_AntiSpamEnabled", 1) == 1;
            
            Debug.Log($"[InputManager] Settings loaded - Sensitivity: {inputSensitivity}");
        }
        #endregion

        #region Update Loop
        private void Update()
        {
            ProcessKeyboardInput();
            ProcessMouseInput();
            ProcessTouchInput();
            UpdateInputRateLimit();
        }

        private void ProcessKeyboardInput()
        {
            if (!keyboardEnabled) return;

            // Movement input (WASD)
            Vector2 keyboardMovement = Vector2.zero;
            
            if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow))
                keyboardMovement.y += 1f;
            if (Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow))
                keyboardMovement.y -= 1f;
            if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow))
                keyboardMovement.x -= 1f;
            if (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow))
                keyboardMovement.x += 1f;

            // Apply sensitivity and normalize
            keyboardMovement = keyboardMovement.normalized * inputSensitivity;
            
            // Send movement input if it changed
            if (keyboardMovement != currentMovementInput)
            {
                currentMovementInput = keyboardMovement;
                HandleMovementInput(keyboardMovement);
            }

            // Action inputs
            if (Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.Return))
            {
                HandlePrimaryAction();
            }
            
            if (Input.GetKeyDown(KeyCode.Escape))
            {
                HandlePauseRequest();
            }
            
            // Help request (when frozen)
            if (Input.GetKeyDown(KeyCode.H) && currentContext == InputContext.Frozen)
            {
                HandleHelpRequest();
            }
        }

        private void ProcessMouseInput()
        {
            if (!mouseEnabled || isTouchDevice) return;

            // Mouse movement for camera or UI
            Vector2 mousePosition = Input.mousePosition;
            Vector2 mouseDelta = mousePosition - lastMousePosition;
            
            if (mouseDelta.magnitude > 0.1f)
            {
                // Mouse moved - could be used for camera control in future
                lastMousePosition = mousePosition;
            }

            // Mouse clicks
            if (Input.GetMouseButtonDown(0)) // Left click
            {
                HandlePrimaryAction();
            }
            
            if (Input.GetMouseButtonDown(1)) // Right click
            {
                HandleSecondaryAction();
            }
        }

        private void ProcessTouchInput()
        {
            if (!touchEnabled || !isTouchDevice) return;

            // Process each touch
            for (int i = 0; i < Input.touchCount; i++)
            {
                Touch touch = Input.GetTouch(i);
                ProcessTouch(touch);
            }
            
            // Clean up ended touches
            CleanupEndedTouches();
        }

        private void ProcessTouch(Touch touch)
        {
            switch (touch.phase)
            {
                case TouchPhase.Began:
                    HandleTouchStart(touch);
                    break;
                    
                case TouchPhase.Moved:
                    HandleTouchMove(touch);
                    break;
                    
                case TouchPhase.Ended:
                case TouchPhase.Canceled:
                    HandleTouchEnd(touch);
                    break;
            }
        }

        private void HandleTouchStart(Touch touch)
        {
            Vector2 screenPosition = touch.position;
            Vector2 worldPosition = Camera.main.ScreenToWorldPoint(screenPosition);
            
            TouchData touchData = new TouchData
            {
                fingerId = touch.fingerId,
                startPosition = screenPosition,
                currentPosition = screenPosition,
                startTime = Time.time,
                isMoving = false
            };
            
            activeTouches[touch.fingerId] = touchData;
            
            OnTouchStart?.Invoke(worldPosition);
            
            // Log touch input for validation
            if (inputValidationEnabled)
            {
                LogInputEvent("touch_start", worldPosition);
            }
        }

        private void HandleTouchMove(Touch touch)
        {
            if (!activeTouches.ContainsKey(touch.fingerId)) return;
            
            TouchData touchData = activeTouches[touch.fingerId];
            touchData.currentPosition = touch.position;
            
            Vector2 deltaPosition = touch.position - touchData.startPosition;
            
            // Convert touch movement to movement input
            if (deltaPosition.magnitude > 50f) // Minimum movement threshold
            {
                touchData.isMoving = true;
            // Convert touch movement to movement input
            if (deltaPosition.magnitude > 50f) // Minimum movement threshold
            {
                touchData.isMoving = true;
                Vector2 normalizedMovement = deltaPosition.normalized * inputSensitivity;
                HandleMovementInput(normalizedMovement);
            }
            
            Vector2 worldPosition = Camera.main.ScreenToWorldPoint(touch.position);
            OnTouchMove?.Invoke(worldPosition);
        }

        private void HandleTouchEnd(Touch touch)
        {
            if (!activeTouches.ContainsKey(touch.fingerId)) return;
            
            TouchData touchData = activeTouches[touch.fingerId];
            Vector2 worldPosition = Camera.main.ScreenToWorldPoint(touch.position);
            
            // Check for tap vs drag
            float touchDuration = Time.time - touchData.startTime;
            float touchDistance = Vector2.Distance(touch.position, touchData.startPosition);
            
            if (touchDistance < 30f && touchDuration < 0.5f) // Tap
            {
                HandlePrimaryAction();
            }
            else if (touchData.isMoving) // End of drag movement
            {
                HandleMovementInput(Vector2.zero); // Stop movement
            }
            
            OnTouchEnd?.Invoke(worldPosition);
            
            // Remove from active touches
            activeTouches.Remove(touch.fingerId);
        }

        private void CleanupEndedTouches()
        {
            List<int> toRemove = new List<int>();
            
            foreach (var kvp in activeTouches)
            {
                bool touchStillActive = false;
                for (int i = 0; i < Input.touchCount; i++)
                {
                    if (Input.GetTouch(i).fingerId == kvp.Key)
                    {
                        touchStillActive = true;
                        break;
                    }
                }
                
                if (!touchStillActive)
                {
                    toRemove.Add(kvp.Key);
                }
            }
            
            foreach (int fingerId in toRemove)
            {
                activeTouches.Remove(fingerId);
            }
        }
        #endregion

        #region Input Handling Methods
        private void HandleMovementInput(Vector2 movement)
        {
            if (!ValidateInput("movement", movement)) return;
            
            bool wasMoving = isMoving;
            isMoving = movement.magnitude > 0.1f;
            
            // Context-specific movement handling
            switch (currentContext)
            {
                case InputContext.Gameplay:
                    OnMovementInput?.Invoke(movement);
                    break;
                    
                case InputContext.Frozen:
                    // No movement allowed when frozen
                    break;
                    
                case InputContext.MinigameActive:
                    // Limited movement during minigames
                    OnMovementInput?.Invoke(movement * 0.5f);
                    break;
                    
                default:
                    OnMovementInput?.Invoke(movement);
                    break;
            }
            
            // Notify when movement stops
            if (wasMoving && !isMoving)
            {
                OnMovementStopped?.Invoke();
            }
            
            // Log movement for therapeutic analysis
            if (isMoving)
            {
                LogMovementBehavior(movement);
            }
        }

        private void HandlePrimaryAction()
        {
            if (!ValidateInput("primary_action", Vector2.zero)) return;
            
            switch (currentContext)
            {
                case InputContext.Frozen:
                    // Primary action when frozen = request help
                    HandleHelpRequest();
                    break;
                    
                case InputContext.Gameplay:
                    OnPrimaryAction?.Invoke();
                    break;
                    
                case InputContext.MainMenu:
                case InputContext.Settings:
                    OnUIConfirm?.Invoke();
                    break;
                    
                case InputContext.MinigameActive:
                    OnPrimaryAction?.Invoke();
                    break;
            }
            
            LogInputEvent("primary_action", Vector2.zero);
        }

        private void HandleSecondaryAction()
        {
            if (!ValidateInput("secondary_action", Vector2.zero)) return;
            
            switch (currentContext)
            {
                case InputContext.Gameplay:
                    OnSecondaryAction?.Invoke();
                    break;
                    
                case InputContext.MainMenu:
                case InputContext.Settings:
                case InputContext.MinigameActive:
                    OnUICancel?.Invoke();
                    break;
            }
            
            LogInputEvent("secondary_action", Vector2.zero);
        }

        private void HandleHelpRequest()
        {
            if (currentContext != InputContext.Frozen) return;
            if (!ValidateInput("help_request", Vector2.zero)) return;
            
            OnHelpRequest?.Invoke();
            
            // Log help request for therapeutic analysis
            DatabaseManager.Instance?.LogHelpRequest(
                GameManager.Instance?.currentGameID,
                PlayerDataManager.Instance?.GetCurrentStudentID(),
                DateTime.Now
            );
            
            LogInputEvent("help_request", Vector2.zero);
            Debug.Log("[InputManager] Help request sent");
        }

        private void HandlePauseRequest()
        {
            if (!ValidateInput("pause_request", Vector2.zero)) return;
            
            OnPauseRequest?.Invoke();
            
            // Show pause menu through scene manager
            if (currentContext == InputContext.Gameplay)
            {
                SceneTransitionManager.Instance?.ShowEscapeMenu();
            }
            
            LogInputEvent("pause_request", Vector2.zero);
        }
        #endregion

        #region Input Context Management
        public void SetInputContext(InputContext newContext)
        {
            InputContext previousContext = currentContext;
            currentContext = newContext;
            
            Debug.Log($"[InputManager] Input context changed: {previousContext} -> {newContext}");
            
            // Handle context-specific setup
            switch (newContext)
            {
                case InputContext.Frozen:
                    // Show help request UI hint
                    ShowInputHint("Press H or tap to request help!");
                    break;
                    
                case InputContext.MinigameActive:
                    // Reduce input sensitivity during minigames
                    inputSensitivity *= 0.7f;
                    break;
                    
                case InputContext.Gameplay:
                    // Restore normal input sensitivity
                    LoadInputSettings();
                    break;
            }
            
            // Log context change for analysis
            LogInputContextChange(previousContext.ToString(), newContext.ToString());
        }

        private void OnGameStateChanged(GameManager.GameState previousState, GameManager.GameState newState)
        {
            // Update input context based on game state
            InputContext newContext = newState switch
            {
                GameManager.GameState.MainMenu => InputContext.MainMenu,
                GameManager.GameState.Playing => InputContext.Gameplay,
                GameManager.GameState.TaskInProgress => InputContext.MinigameActive,
                GameManager.GameState.GamePaused => InputContext.PauseMenu,
                GameManager.GameState.Settings => InputContext.Settings,
                _ => currentContext
            };
            
            if (newContext != currentContext)
            {
                SetInputContext(newContext);
            }
        }
        #endregion

        #region Input Validation and Security
        private bool ValidateInput(string inputType, Vector2 inputData)
        {
            if (!inputValidationEnabled) return true;
            
            float currentTime = Time.time;
            
            // Rate limiting
            if (antiSpamEnabled && currentTime - lastInputTime < (1f / inputRateLimit))
            {
                Debug.LogWarning($"[InputManager] Input rate limit exceeded for {inputType}");
                LogSecurityEvent("rate_limit_exceeded", inputType);
                return false;
            }
            
            // Track input timestamps for spam detection
            inputTimestamps.Enqueue(currentTime);
            while (inputTimestamps.Count > 0 && currentTime - inputTimestamps.Peek() > 1f)
            {
                inputTimestamps.Dequeue();
            }
            
            // Check for spam patterns
            if (inputTimestamps.Count > inputRateLimit)
            {
                Debug.LogWarning($"[InputManager] Spam pattern detected for {inputType}");
                LogSecurityEvent("spam_detected", inputType);
                return false;
            }
            
            lastInputTime = currentTime;
            return true;
        }

        private void UpdateInputRateLimit()
        {
            // Clean up old timestamps
            float currentTime = Time.time;
            while (inputTimestamps.Count > 0 && currentTime - inputTimestamps.Peek() > 1f)
            {
                inputTimestamps.Dequeue();
            }
        }

        private void LogSecurityEvent(string eventType, string inputType)
        {
            SecurityEvent securityEvent = new SecurityEvent
            {
                eventType = eventType,
                inputType = inputType,
                timestamp = DateTime.Now,
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                sessionID = GameManager.Instance?.currentSessionID
            };
            
            DatabaseManager.Instance?.LogSecurityEvent(securityEvent);
            
            // Send alert for serious security issues
            if (eventType == "spam_detected")
            {
                SendSecurityAlert(securityEvent);
            }
        }

        private void SendSecurityAlert(SecurityEvent securityEvent)
        {
            // Send alert to administrator email
            string alertMessage = $"Security alert: {securityEvent.eventType} detected from student {securityEvent.studentID}";
            
            // This would integrate with email system
            Debug.LogWarning($"[InputManager] SECURITY ALERT: {alertMessage}");
            
            // For now, just log to database with high priority
            DatabaseManager.Instance?.SendSecurityAlert(securityEvent);
        }
        #endregion

        #region Accessibility Features
        public void EnableAssistiveInput(bool enabled)
        {
            assistiveInputEnabled = enabled;
            
            if (enabled)
            {
                // Set up assistive input features
                inputSensitivity *= 1.5f; // Increase sensitivity
                doubleTapTime *= 1.5f; // Longer double-tap window
                holdTime *= 0.7f; // Shorter hold time
                
                Debug.Log("[InputManager] Assistive input features enabled");
            }
            else
            {
                LoadInputSettings(); // Restore normal settings
                Debug.Log("[InputManager] Assistive input features disabled");
            }
            
            SaveInputSettings();
        }

        public void SetInputSensitivity(float sensitivity)
        {
            inputSensitivity = Mathf.Clamp(sensitivity, 0.1f, 3f);
            SaveInputSettings();
            Debug.Log($"[InputManager] Input sensitivity set to {inputSensitivity}");
        }

        public void SetDoubleTapTime(float time)
        {
            doubleTapTime = Mathf.Clamp(time, 0.1f, 1f);
            SaveInputSettings();
            Debug.Log($"[InputManager] Double-tap time set to {doubleTapTime}s");
        }

        private void ShowInputHint(string hint)
        {
            // Show input hint UI
            Debug.Log($"[InputManager] Input hint: {hint}");
            
            // This would integrate with UI system to show hints
            // For now, just log for accessibility
        }
        #endregion

        #region Behavioral Analysis
        private void LogMovementBehavior(Vector2 movement)
        {
            // Track movement patterns for therapeutic analysis
            MovementBehaviorData behaviorData = new MovementBehaviorData
            {
                movementVector = movement,
                magnitude = movement.magnitude,
                timestamp = DateTime.Now,
                gameState = GameManager.Instance?.currentState.ToString(),
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                sessionID = GameManager.Instance?.currentSessionID
            };
            
            // Only log significant movement changes to avoid spam
            if (movement.magnitude > 0.5f || Time.time % 2f < 0.1f) // Every 2 seconds or significant input
            {
                DatabaseManager.Instance?.LogMovementBehavior(behaviorData);
            }
        }

        private void LogInputEvent(string inputType, Vector2 inputData)
        {
            InputEventData eventData = new InputEventData
            {
                inputType = inputType,
                inputData = inputData,
                timestamp = DateTime.Now,
                context = currentContext.ToString(),
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                sessionID = GameManager.Instance?.currentSessionID
            };
            
            DatabaseManager.Instance?.LogInputEvent(eventData);
        }

        private void LogInputContextChange(string fromContext, string toContext)
        {
            ContextChangeData contextData = new ContextChangeData
            {
                fromContext = fromContext,
                toContext = toContext,
                timestamp = DateTime.Now,
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                sessionID = GameManager.Instance?.currentSessionID
            };
            
            DatabaseManager.Instance?.LogInputContextChange(contextData);
        }
        #endregion

        #region Settings Management
        private void SaveInputSettings()
        {
            PlayerPrefs.SetFloat("Input_Sensitivity", inputSensitivity);
            PlayerPrefs.SetFloat("Input_DoubleTapTime", doubleTapTime);
            PlayerPrefs.SetInt("Input_AntiSpamEnabled", antiSpamEnabled ? 1 : 0);
            PlayerPrefs.SetInt("Input_AssistiveEnabled", assistiveInputEnabled ? 1 : 0);
            PlayerPrefs.Save();
        }

        public InputSettings GetCurrentInputSettings()
        {
            return new InputSettings
            {
                sensitivity = inputSensitivity,
                doubleTapTime = doubleTapTime,
                antiSpamEnabled = antiSpamEnabled,
                assistiveInputEnabled = assistiveInputEnabled,
                keyboardEnabled = keyboardEnabled,
                mouseEnabled = mouseEnabled,
                touchEnabled = touchEnabled
            };
        }

        public void ApplyInputSettings(InputSettings settings)
        {
            inputSensitivity = settings.sensitivity;
            doubleTapTime = settings.doubleTapTime;
            antiSpamEnabled = settings.antiSpamEnabled;
            assistiveInputEnabled = settings.assistiveInputEnabled;
            keyboardEnabled = settings.keyboardEnabled;
            mouseEnabled = settings.mouseEnabled;
            touchEnabled = settings.touchEnabled;
            
            SaveInputSettings();
            Debug.Log("[InputManager] Input settings applied");
        }
        #endregion

        #region Public Interface Methods
        public bool IsMoving()
        {
            return isMoving;
        }

        public Vector2 GetCurrentMovementInput()
        {
            return currentMovementInput;
        }

        public bool IsTouchDevice()
        {
            return isTouchDevice;
        }

        public InputContext GetCurrentContext()
        {
            return currentContext;
        }

        public void SetPlayerFrozen(bool frozen)
        {
            if (frozen)
            {
                SetInputContext(InputContext.Frozen);
            }
            else if (currentContext == InputContext.Frozen)
            {
                SetInputContext(InputContext.Gameplay);
            }
        }
        #endregion

        #region Cleanup
        private void OnDestroy()
        {
            SaveInputSettings();
            
            // Unsubscribe from events
            if (GameManager.Instance != null)
            {
                GameManager.OnGameStateChanged -= OnGameStateChanged;
            }
        }
        #endregion
    }

    #region Data Structures
    [System.Serializable]
    public class TouchData
    {
        public int fingerId;
        public Vector2 startPosition;
        public Vector2 currentPosition;
        public float startTime;
        public bool isMoving;
    }

    [System.Serializable]
    public class InputSettings
    {
        public float sensitivity;
        public float doubleTapTime;
        public bool antiSpamEnabled;
        public bool assistiveInputEnabled;
        public bool keyboardEnabled;
        public bool mouseEnabled;
        public bool touchEnabled;
    }

    [System.Serializable]
    public class MovementBehaviorData
    {
        public Vector2 movementVector;
        public float magnitude;
        public DateTime timestamp;
        public string gameState;
        public string studentID;
        public string sessionID;
    }

    [System.Serializable]
    public class InputEventData
    {
        public string inputType;
        public Vector2 inputData;
        public DateTime timestamp;
        public string context;
        public string studentID;
        public string sessionID;
    }

    [System.Serializable]
    public class ContextChangeData
    {
        public string fromContext;
        public string toContext;
        public DateTime timestamp;
        public string studentID;
        public string sessionID;
    }

    [System.Serializable]
    public class SecurityEvent
    {
        public string eventType;
        public string inputType;
        public DateTime timestamp;
        public string studentID;
        public string sessionID;
    }
    #endregion
}