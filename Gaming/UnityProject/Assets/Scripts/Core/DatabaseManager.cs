using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

namespace EmotionQuest.Core
{
    /// <summary>
    /// Database Manager - Handles all Supabase integration for educational analytics
    /// Manages student data, therapeutic progress, and compliance with COPPA/FERPA
    /// </summary>
    public class DatabaseManager : MonoBehaviour
    {
        #region Singleton Pattern
        public static DatabaseManager Instance { get; private set; }

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

        #region Supabase Configuration
        [Header("Supabase Configuration")]
        [SerializeField] private string supabaseUrl = ""; // Set in inspector or environment
        [SerializeField] private string supabaseAnonKey = ""; // Set in inspector or environment
        [SerializeField] private string supabaseServiceKey = ""; // For admin operations
        
        [Header("Database Settings")]
        public bool enableRealTimeSync = true;
        public bool enableOfflineMode = true;
        public float syncInterval = 30f; // Seconds
        public int batchSize = 50;
        public int maxRetryAttempts = 3;
        
        // Connection state
        private bool isConnected = false;
        private bool isInitialized = false;
        private Queue<DatabaseOperation> offlineQueue = new Queue<DatabaseOperation>();
        private Coroutine syncCoroutine;
        #endregion

        #region Privacy and Compliance
        [Header("Privacy Settings")]
        public bool anonymizeStudentData = true;
        public bool encryptSensitiveData = true;
        public ConsentLevel dataCollectionConsent = ConsentLevel.Educational;
        
        // COPPA compliance tracking
        private Dictionary<string, StudentConsentRecord> studentConsents = new Dictionary<string, StudentConsentRecord>();
        #endregion

        #region Initialization
        private void Initialize()
        {
            LoadDatabaseConfiguration();
            SetupOfflineStorage();
            StartConnectionCheck();
            
            Debug.Log("[DatabaseManager] Database System Initialized");
        }

        private void LoadDatabaseConfiguration()
        {
            // Load from environment variables or PlayerPrefs
            if (string.IsNullOrEmpty(supabaseUrl))
            {
                supabaseUrl = GetEnvironmentVariable("SUPABASE_URL") ?? PlayerPrefs.GetString("DB_SupabaseUrl", "");
            }
            
            if (string.IsNullOrEmpty(supabaseAnonKey))
            {
                supabaseAnonKey = GetEnvironmentVariable("SUPABASE_ANON_KEY") ?? PlayerPrefs.GetString("DB_AnonKey", "");
            }
            
            if (string.IsNullOrEmpty(supabaseUrl) || string.IsNullOrEmpty(supabaseAnonKey))
            {
                Debug.LogWarning("[DatabaseManager] Supabase configuration not found. Running in offline mode.");
                enableRealTimeSync = false;
            }
            
            Debug.Log($"[DatabaseManager] Configuration loaded. Real-time sync: {enableRealTimeSync}");
        }

        private void SetupOfflineStorage()
        {
            // Initialize offline data storage
            if (enableOfflineMode)
            {
                LoadOfflineQueue();
                Debug.Log("[DatabaseManager] Offline storage initialized");
            }
        }

        private void StartConnectionCheck()
        {
            if (enableRealTimeSync)
            {
                StartCoroutine(CheckConnection());
                syncCoroutine = StartCoroutine(SyncDataPeriodically());
            }
        }

        private string GetEnvironmentVariable(string key)
        {
            return Environment.GetEnvironmentVariable(key);
        }
        #endregion

        #region Connection Management
        private IEnumerator CheckConnection()
        {
            while (true)
            {
                yield return StartCoroutine(TestConnection());
                yield return new WaitForSeconds(30f); // Check every 30 seconds
            }
        }

        private IEnumerator TestConnection()
        {
            if (string.IsNullOrEmpty(supabaseUrl))
            {
                isConnected = false;
                yield break;
            }

            using (UnityWebRequest request = UnityWebRequest.Get($"{supabaseUrl}/rest/v1/"))
            {
                request.SetRequestHeader("apikey", supabaseAnonKey);
                request.SetRequestHeader("Authorization", $"Bearer {supabaseAnonKey}");
                request.timeout = 10;

                yield return request.SendWebRequest();

                bool wasConnected = isConnected;
                isConnected = request.result == UnityWebRequest.Result.Success;

                if (isConnected && !wasConnected)
                {
                    Debug.Log("[DatabaseManager] Database connection established");
                    ProcessOfflineQueue();
                }
                else if (!isConnected && wasConnected)
                {
                    Debug.LogWarning("[DatabaseManager] Database connection lost");
                }
            }
        }

        private IEnumerator SyncDataPeriodically()
        {
            while (true)
            {
                yield return new WaitForSeconds(syncInterval);
                
                if (isConnected && offlineQueue.Count > 0)
                {
                    ProcessOfflineQueue();
                }
            }
        }
        #endregion

        #region Student Data Management
        public void RegisterStudent(StudentRegistrationData studentData)
        {
            // Validate COPPA compliance
            if (!ValidateStudentAge(studentData.age))
            {
                Debug.LogError("[DatabaseManager] Student registration failed: Age validation error");
                return;
            }

            // Anonymize data if required
            if (anonymizeStudentData)
            {
                studentData = AnonymizeStudentData(studentData);
            }

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.STUDENTS_TABLE,
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(helpData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }
        #endregion

        #region Database Operations
        private void ExecuteOrQueue(DatabaseOperation operation)
        {
            if (isConnected)
            {
                StartCoroutine(ExecuteOperation(operation));
            }
            else if (enableOfflineMode)
            {
                QueueOperation(operation);
            }
            else
            {
                Debug.LogWarning($"[DatabaseManager] Operation discarded - no connection: {operation.operationType} on {operation.tableName}");
            }
        }

        private void QueueOperation(DatabaseOperation operation)
        {
            offlineQueue.Enqueue(operation);
            
            // Limit queue size to prevent memory issues
            while (offlineQueue.Count > 1000)
            {
                var discarded = offlineQueue.Dequeue();
                Debug.LogWarning($"[DatabaseManager] Discarded old operation: {discarded.operationType} on {discarded.tableName}");
            }
            
            // Save queue to persistent storage
            SaveOfflineQueue();
        }

        private IEnumerator ExecuteOperation(DatabaseOperation operation)
        {
            string url = BuildRequestUrl(operation);
            string jsonData = operation.data;

            using (UnityWebRequest request = CreateRequest(operation.operationType, url, jsonData))
            {
                yield return request.SendWebRequest();

                if (request.result == UnityWebRequest.Result.Success)
                {
                    Debug.Log($"[DatabaseManager] Operation successful: {operation.operationType} on {operation.tableName}");
                }
                else
                {
                    Debug.LogError($"[DatabaseManager] Operation failed: {request.error}");
                    
                    // Retry logic for failed operations
                    yield return StartCoroutine(RetryOperation(operation, 1));
                }
            }
        }

        private IEnumerator ExecuteOperationImmediate(DatabaseOperation operation)
        {
            // For critical operations like alerts
            for (int attempt = 0; attempt < maxRetryAttempts; attempt++)
            {
                yield return StartCoroutine(ExecuteOperation(operation));
                // If successful, break; if not, retry
                yield return new WaitForSeconds(1f); // Brief delay between retries
            }
        }

        private IEnumerator RetryOperation(DatabaseOperation operation, int attemptNumber)
        {
            if (attemptNumber >= maxRetryAttempts)
            {
                Debug.LogError($"[DatabaseManager] Operation failed after {maxRetryAttempts} attempts: {operation.operationType}");
                
                // Queue for later retry if offline mode is enabled
                if (enableOfflineMode)
                {
                    QueueOperation(operation);
                }
                yield break;
            }

            float delay = Mathf.Pow(2f, attemptNumber); // Exponential backoff
            yield return new WaitForSeconds(delay);

            Debug.Log($"[DatabaseManager] Retrying operation (attempt {attemptNumber + 1}): {operation.operationType}");
            yield return StartCoroutine(ExecuteOperation(operation));
        }

        private string BuildRequestUrl(DatabaseOperation operation)
        {
            string baseUrl = $"{supabaseUrl}/rest/v1/{operation.tableName}";
            
            if (operation.operationType == "UPDATE" && !string.IsNullOrEmpty(operation.whereClause))
            {
                baseUrl += $"?{operation.whereClause}";
            }
            else if (operation.operationType == "SELECT" && !string.IsNullOrEmpty(operation.whereClause))
            {
                baseUrl += $"?select=*&{operation.whereClause}";
            }

            return baseUrl;
        }

        private UnityWebRequest CreateRequest(string operationType, string url, string jsonData)
        {
            UnityWebRequest request;

            switch (operationType)
            {
                case "INSERT":
                    request = UnityWebRequest.Post(url, jsonData, "application/json");
                    request.method = "POST";
                    break;
                    
                case "UPDATE":
                    request = UnityWebRequest.Put(url, jsonData);
                    request.SetRequestHeader("Content-Type", "application/json");
                    request.method = "PATCH";
                    break;
                    
                case "SELECT":
                    request = UnityWebRequest.Get(url);
                    break;
                    
                default:
                    request = UnityWebRequest.Post(url, jsonData, "application/json");
                    break;
            }

            // Set Supabase headers
            request.SetRequestHeader("apikey", supabaseAnonKey);
            request.SetRequestHeader("Authorization", $"Bearer {supabaseAnonKey}");
            request.SetRequestHeader("Prefer", "return=minimal");

            return request;
        }
        #endregion

        #region Offline Queue Management
        private void ProcessOfflineQueue()
        {
            if (!isConnected || offlineQueue.Count == 0) return;

            Debug.Log($"[DatabaseManager] Processing {offlineQueue.Count} queued operations");

            StartCoroutine(ProcessQueueBatch());
        }

        private IEnumerator ProcessQueueBatch()
        {
            int processed = 0;
            
            while (offlineQueue.Count > 0 && processed < batchSize && isConnected)
            {
                DatabaseOperation operation = offlineQueue.Dequeue();
                yield return StartCoroutine(ExecuteOperation(operation));
                processed++;
                
                // Small delay between operations to avoid overwhelming the server
                yield return new WaitForSeconds(0.1f);
            }

            Debug.Log($"[DatabaseManager] Processed {processed} operations from queue");

            // Save updated queue
            SaveOfflineQueue();

            // Continue processing if there are more operations
            if (offlineQueue.Count > 0 && isConnected)
            {
                yield return new WaitForSeconds(1f);
                yield return StartCoroutine(ProcessQueueBatch());
            }
        }

        private void SaveOfflineQueue()
        {
            try
            {
                List<DatabaseOperation> queueList = new List<DatabaseOperation>(offlineQueue);
                string json = JsonUtility.ToJson(new SerializableQueue { operations = queueList });
                
                string filePath = Application.persistentDataPath + Constants.SAVE_DATA_PATH + Constants.ANALYTICS_CACHE_FILE;
                System.IO.Directory.CreateDirectory(System.IO.Path.GetDirectoryName(filePath));
                System.IO.File.WriteAllText(filePath, json);
            }
            catch (System.Exception e)
            {
                Debug.LogError($"[DatabaseManager] Failed to save offline queue: {e.Message}");
            }
        }

        private void LoadOfflineQueue()
        {
            try
            {
                string filePath = Application.persistentDataPath + Constants.SAVE_DATA_PATH + Constants.ANALYTICS_CACHE_FILE;
                
                if (System.IO.File.Exists(filePath))
                {
                    string json = System.IO.File.ReadAllText(filePath);
                    SerializableQueue queueData = JsonUtility.FromJson<SerializableQueue>(json);
                    
                    offlineQueue.Clear();
                    foreach (var operation in queueData.operations)
                    {
                        offlineQueue.Enqueue(operation);
                    }
                    
                    Debug.Log($"[DatabaseManager] Loaded {offlineQueue.Count} operations from offline storage");
                }
            }
            catch (System.Exception e)
            {
                Debug.LogError($"[DatabaseManager] Failed to load offline queue: {e.Message}");
                offlineQueue.Clear();
            }
        }
        #endregion

        #region Data Retrieval (for Teacher/Parent Dashboards)
        public void GetStudentProgress(string studentID, System.Action<StudentProgressData> callback)
        {
            if (!isConnected)
            {
                Debug.LogWarning("[DatabaseManager] Cannot retrieve student progress - no connection");
                callback?.Invoke(null);
                return;
            }

            StartCoroutine(RetrieveStudentProgress(studentID, callback));
        }

        private IEnumerator RetrieveStudentProgress(string studentID, System.Action<StudentProgressData> callback)
        {
            string url = $"{supabaseUrl}/rest/v1/{Constants.GAMES_TABLE}?select=*&student_id=eq.{studentID}";
            
            using (UnityWebRequest request = UnityWebRequest.Get(url))
            {
                request.SetRequestHeader("apikey", supabaseAnonKey);
                request.SetRequestHeader("Authorization", $"Bearer {supabaseAnonKey}");

                yield return request.SendWebRequest();

                if (request.result == UnityWebRequest.Result.Success)
                {
                    try
                    {
                        // Parse response and create progress data
                        StudentProgressData progressData = ParseProgressData(request.downloadHandler.text, studentID);
                        callback?.Invoke(progressData);
                    }
                    catch (System.Exception e)
                    {
                        Debug.LogError($"[DatabaseManager] Failed to parse progress data: {e.Message}");
                        callback?.Invoke(null);
                    }
                }
                else
                {
                    Debug.LogError($"[DatabaseManager] Failed to retrieve progress: {request.error}");
                    callback?.Invoke(null);
                }
            }
        }

        private StudentProgressData ParseProgressData(string jsonResponse, string studentID)
        {
            // Parse the JSON response and aggregate data for dashboard
            // This is a simplified version for MVP
            
            StudentProgressData progress = new StudentProgressData
            {
                studentID = studentID,
                totalGamesPlayed = 0,
                totalTasksCompleted = 0,
                averageGameDuration = 0f,
                mostFrequentEmotion = "",
                helpSeekingBehavior = 0f,
                socialInteractionScore = 0f,
                lastPlayed = DateTime.MinValue,
                overallProgress = 0f
            };

            // Basic parsing (in production, use a proper JSON library)
            if (!string.IsNullOrEmpty(jsonResponse) && jsonResponse.Contains("game_id"))
            {
                // Count occurrences and calculate basic statistics
                progress.totalGamesPlayed = CountOccurrences(jsonResponse, "game_id");
                progress.lastPlayed = DateTime.Now.AddDays(-1); // Placeholder
                progress.overallProgress = Mathf.Clamp01(progress.totalGamesPlayed / 10f); // Simple progress calculation
            }

            return progress;
        }

        private int CountOccurrences(string text, string pattern)
        {
            int count = 0;
            int index = 0;
            while ((index = text.IndexOf(pattern, index)) != -1)
            {
                count++;
                index += pattern.Length;
            }
            return count;
        }
        #endregion

        #region Utility Methods
        private string GetDeviceInfo()
        {
            return $"{SystemInfo.deviceType}_{SystemInfo.operatingSystem}_{SystemInfo.deviceModel}";
        }

        public void SetConsentLevel(ConsentLevel level)
        {
            dataCollectionConsent = level;
            Debug.Log($"[DatabaseManager] Data collection consent set to: {level}");
        }

        public void RecordParentalConsent(string studentID, bool hasConsent)
        {
            StudentConsentRecord consent = new StudentConsentRecord
            {
                studentID = studentID,
                hasParentalConsent = hasConsent,
                consentTimestamp = DateTime.Now,
                consentVersion = Constants.ANALYTICS_CONSENT_VERSION
            };

            studentConsents[studentID] = consent;
            
            // Log consent to database
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = "student_consents",
                data = JsonUtility.ToJson(consent),
                timestamp = DateTime.Now,
                priority = OperationPriority.High
            };

            ExecuteOrQueue(operation);
        }

        public bool IsDataCollectionAllowed(string studentID)
        {
            if (dataCollectionConsent == ConsentLevel.None) return false;
            
            // Check if student requires parental consent
            if (dataCollectionConsent == ConsentLevel.Full)
            {
                return HasParentalConsent(studentID);
            }

            return true;
        }

        public void ClearStudentData(string studentID)
        {
            // GDPR compliance - right to be forgotten
            Debug.Log($"[DatabaseManager] Initiating data deletion for student: {studentID}");
            
            // This would trigger a server-side deletion process
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "DELETE",
                tableName = "data_deletion_requests",
                data = JsonUtility.ToJson(new { student_id = studentID, request_time = DateTime.Now }),
                timestamp = DateTime.Now,
                priority = OperationPriority.High
            };

            ExecuteOrQueue(operation);
        }
        #endregion

        #region Additional Logging Methods (Future Features)
        public void LogForcedGameExit(string gameID, DateTime exitTime)
        {
            GameExitData exitData = new GameExitData
            {
                gameID = gameID,
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                exitTime = exitTime,
                exitReason = "forced_by_player"
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(exitData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogSceneTransition(string sessionID, string fromScene, string toScene, DateTime timestamp)
        {
            SceneTransitionData transitionData = new SceneTransitionData
            {
                sessionID = sessionID,
                fromScene = fromScene,
                toScene = toScene,
                timestamp = timestamp,
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID()
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(transitionData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogEmotionalMusicChange(string emotion, DateTime timestamp)
        {
            // Future feature logging
            EmotionalMusicData musicData = new EmotionalMusicData
            {
                emotion = emotion,
                timestamp = timestamp,
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                sessionID = GameManager.Instance?.currentSessionID
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(musicData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogAudioBehavior(AudioBehaviorData behaviorData)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(behaviorData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogVolumeChange(VolumeChangeData changeData)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(changeData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogInputEvent(InputEventData eventData)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(eventData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogInputContextChange(ContextChangeData contextData)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(contextData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogSecurityEvent(SecurityEvent securityEvent)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.ALERTS_TABLE,
                data = JsonUtility.ToJson(securityEvent),
                timestamp = DateTime.Now,
                priority = OperationPriority.High
            };

            ExecuteOrQueue(operation);
        }

        public void LogGameResult(GameResult result)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "UPDATE",
                tableName = Constants.GAMES_TABLE,
                data = JsonUtility.ToJson(result),
                whereClause = $"game_id='{result.gameID}'",
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }

        public void LogStateChange(StateChange change)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(change),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogPlayerAction(PlayerAction action)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(action),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogSessionSummary(SessionSummary summary)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "UPDATE",
                tableName = Constants.SESSIONS_TABLE,
                data = JsonUtility.ToJson(summary),
                whereClause = $"session_id='{summary.sessionID}'",
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }
        #endregion

        #region Cleanup
        private void OnDestroy()
        {
            SaveOfflineQueue();
            
            if (syncCoroutine != null)
            {
                StopCoroutine(syncCoroutine);
            }
        }

        private void OnApplicationPause(bool pauseStatus)
        {
            if (pauseStatus)
            {
                SaveOfflineQueue();
            }
        }

        private void OnApplicationQuit()
        {
            SaveOfflineQueue();
        }
        #endregion
    }

    #region Data Structures
    public enum OperationPriority
    {
        Low = 3,
        Medium = 2,
        High = 1,
        Critical = 0
    }

    [System.Serializable]
    public class DatabaseOperation
    {
        public string operationType; // INSERT, UPDATE, SELECT, DELETE
        public string tableName;
        public string data;
        public string whereClause;
        public DateTime timestamp;
        public OperationPriority priority;
    }

    [System.Serializable]
    public class SerializableQueue
    {
        public List<DatabaseOperation> operations;
    }

    [System.Serializable]
    public class StudentRegistrationData
    {
        public string studentID;
        public string teacherID;
        public string parentID;
        public string name;
        public string hashedName; // For anonymization
        public int age;
        public int grade;
        public string deviceType;
        public DateTime registrationTime;
    }

    [System.Serializable]
    public class StudentConsentRecord
    {
        public string studentID;
        public bool hasParentalConsent;
        public DateTime consentTimestamp;
        public string consentVersion;
    }

    [System.Serializable]
    public class SessionStartData
    {
        public string sessionID;
        public string studentID;
        public DateTime startTime;
        public string deviceInfo;
        public string consentLevel;
    }

    [System.Serializable]
    public class SessionEndData
    {
        public string sessionID;
        public DateTime endTime;
        public float duration;
        public bool dataUploaded;
    }

    [System.Serializable]
    public class GameStartData
    {
        public string gameID;
        public string studentID;
        public string sessionID;
        public string selectedEmotion;
        public string assignedMonsterType;
        public string scenario;
        public DateTime startTime;
        public int playerCount;
    }

    [System.Serializable]
    public class GameEndData
    {
        public string gameID;
        public DateTime endTime;
        public float duration;
        public int tasksCompleted;
        public int timesFrezen;
        public int helpRequests;
        public int finalScore;
    }

    [System.Serializable]
    public class FreezingEventData
    {
        public string gameID;
        public string studentID;
        public int totalFreezes;
        public bool requestedHelp;
        public DateTime timestamp;
    }

    [System.Serializable]
    public class HelpRequestData
    {
        public string gameID;
        public string studentID;
        public DateTime timestamp;
        public float responseTime;
    }

    [System.Serializable]
    public class SecurityAlertData
    {
        public string eventType;
        public string inputType;
        public string studentID;
        public string sessionID;
        public DateTime timestamp;
        public string severity;
        public string adminEmail;
    }

    [System.Serializable]
    public class StudentProgressData
    {
        public string studentID;
        public int totalGamesPlayed;
        public int totalTasksCompleted;
        public float averageGameDuration;
        public string mostFrequentEmotion;
        public float helpSeekingBehavior;
        public float socialInteractionScore;
        public DateTime lastPlayed;
        public float overallProgress;
    }

    [System.Serializable]
    public class GameExitData
    {
        public string gameID;
        public string studentID;
        public DateTime exitTime;
        public string exitReason;
    }

    [System.Serializable]
    public class SceneTransitionData
    {
        public string sessionID;
        public string fromScene;
        public string toScene;
        public DateTime timestamp;
        public string studentID;
    }

    [System.Serializable]
    public class EmotionalMusicData
    {
        public string emotion;
        public DateTime timestamp;
        public string studentID;
        public string sessionID;
    }
    #endregion
}(studentData),
                timestamp = DateTime.Now,
                priority = OperationPriority.High
            };

            ExecuteOrQueue(operation);
        }

        public void LogSessionStart(string sessionID, DateTime startTime)
        {
            SessionStartData sessionData = new SessionStartData
            {
                sessionID = sessionID,
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                startTime = startTime,
                deviceInfo = GetDeviceInfo(),
                consentLevel = dataCollectionConsent.ToString()
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.SESSIONS_TABLE,
                data = JsonUtility.ToJson(sessionData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }

        public void LogSessionEnd(string sessionID, TimeSpan duration)
        {
            SessionEndData sessionData = new SessionEndData
            {
                sessionID = sessionID,
                endTime = DateTime.Now,
                duration = (float)duration.TotalMinutes,
                dataUploaded = isConnected
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "UPDATE",
                tableName = Constants.SESSIONS_TABLE,
                data = JsonUtility.ToJson(sessionData),
                whereClause = $"session_id='{sessionID}'",
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }

        private bool ValidateStudentAge(int age)
        {
            if (age < Constants.MIN_AGE_FOR_GAME || age > Constants.MAX_AGE_FOR_GAME)
            {
                return false;
            }

            // Check COPPA compliance
            if (age < Constants.MIN_AGE_WITHOUT_CONSENT && dataCollectionConsent != ConsentLevel.None)
            {
                return HasParentalConsent(PlayerDataManager.Instance?.GetCurrentStudentID());
            }

            return true;
        }

        private bool HasParentalConsent(string studentID)
        {
            if (string.IsNullOrEmpty(studentID)) return false;
            
            return studentConsents.ContainsKey(studentID) && 
                   studentConsents[studentID].hasParentalConsent;
        }

        private StudentRegistrationData AnonymizeStudentData(StudentRegistrationData originalData)
        {
            // Create anonymized copy
            StudentRegistrationData anonymized = new StudentRegistrationData
            {
                studentID = originalData.studentID, // Keep for tracking
                teacherID = originalData.teacherID, // Keep for teacher dashboard
                parentID = originalData.parentID,   // Keep for parent dashboard
                age = originalData.age,
                grade = originalData.grade,
                // Remove or hash identifiable information
                hashedName = HashString(originalData.name ?? ""),
                deviceType = originalData.deviceType,
                registrationTime = originalData.registrationTime
            };

            return anonymized;
        }

        private string HashString(string input)
        {
            if (string.IsNullOrEmpty(input)) return "";
            
            // Simple hash for demo - use proper encryption in production
            byte[] bytes = Encoding.UTF8.GetBytes(input + "EmotionQuest_Salt");
            byte[] hash = System.Security.Cryptography.SHA256.Create().ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
        #endregion

        #region Game Data Logging
        public void LogGameStart(string gameID, string selectedEmotion, string monsterType, string scenario)
        {
            GameStartData gameData = new GameStartData
            {
                gameID = gameID,
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                sessionID = GameManager.Instance?.currentSessionID,
                selectedEmotion = selectedEmotion,
                assignedMonsterType = monsterType,
                scenario = scenario,
                startTime = DateTime.Now,
                playerCount = GameManager.Instance?.currentPlayerCount ?? 0
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.GAMES_TABLE,
                data = JsonUtility.ToJson(gameData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }

        public void LogGameEnd(GameStatistics stats)
        {
            GameEndData gameData = new GameEndData
            {
                gameID = stats.gameID,
                endTime = DateTime.Now,
                duration = (float)stats.duration.TotalMinutes,
                tasksCompleted = stats.tasksCompleted,
                timesFrezen = stats.timesFrezen,
                helpRequests = stats.helpRequests,
                finalScore = stats.tasksCompleted // Simple scoring for MVP
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "UPDATE",
                tableName = Constants.GAMES_TABLE,
                data = JsonUtility.ToJson(gameData),
                whereClause = $"game_id='{stats.gameID}'",
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }

        public void LogEmotionalSelection(EmotionalSelection selection)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.EMOTIONAL_SELECTIONS_TABLE,
                data = JsonUtility.ToJson(selection),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogTaskAttempt(TaskAttempt attempt)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.TASKS_TABLE,
                data = JsonUtility.ToJson(attempt),
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }
        #endregion

        #region Behavioral Analytics
        public void LogSocialInteraction(SocialInteraction interaction)
        {
            // Only log if we have consent for behavioral tracking
            if (dataCollectionConsent < ConsentLevel.Educational) return;

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(interaction),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogFreezingEvent(string gameID, int totalFreezes, bool requestedHelp)
        {
            FreezingEventData freezeData = new FreezingEventData
            {
                gameID = gameID,
                studentID = PlayerDataManager.Instance?.GetCurrentStudentID(),
                totalFreezes = totalFreezes,
                requestedHelp = requestedHelp,
                timestamp = DateTime.Now
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(freezeData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Medium
            };

            ExecuteOrQueue(operation);
        }

        public void LogPanicResponse(PanicResponse response)
        {
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(response),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }

        public void LogMovementBehavior(MovementBehaviorData behaviorData)
        {
            // Only log movement if we have full consent (to avoid excessive data collection)
            if (dataCollectionConsent < ConsentLevel.Full) return;

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson(behaviorData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Low
            };

            ExecuteOrQueue(operation);
        }
        #endregion

        #region Alert System
        public void SendTeacherAlert(TeacherAlert alert)
        {
            // Immediate priority for safety concerns
            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.ALERTS_TABLE,
                data = JsonUtility.ToJson(alert),
                timestamp = DateTime.Now,
                priority = OperationPriority.Critical
            };

            // Try to send immediately if connected
            if (isConnected)
            {
                StartCoroutine(ExecuteOperationImmediate(operation));
            }
            else
            {
                // Store for immediate upload when connection restored
                offlineQueue.Enqueue(operation);
            }

            Debug.Log($"[DatabaseManager] Teacher alert sent: {alert.alertType} for student {alert.studentID}");
        }

        public void SendSecurityAlert(SecurityEvent securityEvent)
        {
            SecurityAlertData alertData = new SecurityAlertData
            {
                eventType = securityEvent.eventType,
                inputType = securityEvent.inputType,
                studentID = securityEvent.studentID,
                sessionID = securityEvent.sessionID,
                timestamp = securityEvent.timestamp,
                severity = "high",
                adminEmail = Constants.ADMIN_ALERT_EMAIL
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.ALERTS_TABLE,
                data = JsonUtility.ToJson(alertData),
                timestamp = DateTime.Now,
                priority = OperationPriority.Critical
            };

            // Critical alerts bypass queue
            StartCoroutine(ExecuteOperationImmediate(operation));

            Debug.LogWarning($"[DatabaseManager] Security alert sent: {securityEvent.eventType}");
        }

        public void LogHelpRequest(string gameID, string studentID, DateTime timestamp)
        {
            HelpRequestData helpData = new HelpRequestData
            {
                gameID = gameID,
                studentID = studentID,
                timestamp = timestamp,
                responseTime = 0f // Will be updated when help is received
            };

            DatabaseOperation operation = new DatabaseOperation
            {
                operationType = "INSERT",
                tableName = Constants.BEHAVIORAL_DATA_TABLE,
                data = JsonUtility.ToJson