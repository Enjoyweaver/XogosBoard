using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;

namespace EmotionQuest.Core
{
    /// <summary>
    /// Audio Manager - Handles all audio for educational gameplay
    /// Manages background music, sound effects, voice narration, and accessibility features
    /// </summary>
    public class AudioManager : MonoBehaviour
    {
        #region Singleton Pattern
        public static AudioManager Instance { get; private set; }

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

        #region Audio Configuration
        [Header("Audio Mixer")]
        public AudioMixer mainAudioMixer;
        
        [Header("Audio Sources")]
        public AudioSource musicSource;
        public AudioSource sfxSource;
        public AudioSource voiceSource;
        public AudioSource accessibilitySource;
        
        [Header("Audio Clips - MVP")]
        [SerializeField] private AudioClip backgroundMusic;
        [SerializeField] private AudioClip taskCompletionSound;
        [SerializeField] private AudioClip freezeSound;
        [SerializeField] private AudioClip unfreezeSound;
        [SerializeField] private AudioClip panicAlertSound;
        
        [Header("Voice Narration Clips")]
        [SerializeField] private AudioClip gameStartAnnouncement;
        [SerializeField] private AudioClip gameEndAnnouncement;
        [SerializeField] private AudioClip oneMinuteWarning;
        [SerializeField] private AudioClip encouragementClip;
        [SerializeField] private AudioClip celebrationClip;
        
        [Header("Volume Settings")]
        [Range(0f, 1f)] public float masterVolume = 1f;
        [Range(0f, 1f)] public float musicVolume = 0.7f;
        [Range(0f, 1f)] public float sfxVolume = 0.8f;
        [Range(0f, 1f)] public float voiceVolume = 1f;
        
        // Audio pools for efficiency
        private Queue<AudioSource> sfxPool = new Queue<AudioSource>();
        private const int SFX_POOL_SIZE = 10;
        #endregion

        #region Accessibility Settings
        [Header("Accessibility Features")]
        public bool subtitlesEnabled = true;
        public bool hearingImpairedMode = false;
        public bool silentMode = false;
        public bool headphoneMode = true;
        
        // Volume limiting for classroom use
        public float maxVolumeLimit = 0.8f;
        public bool volumeLimitingEnabled = true;
        #endregion

        #region Emotional Audio System (Future Feature)
        [Header("Emotional Audio (Future)")]
        public Dictionary<string, AudioClip> emotionalBackgroundMusic;
        public bool emotionalMusicEnabled = false; // Will be enabled in future updates
        private string currentEmotionalState = "neutral";
        #endregion

        #region Initialization
        private void Initialize()
        {
            SetupAudioSources();
            SetupAudioMixer();
            CreateSFXPool();
            LoadAudioSettings();
            
            Debug.Log("[AudioManager] Audio System Initialized");
        }

        private void SetupAudioSources()
        {
            // Create audio sources if they don't exist
            if (musicSource == null)
            {
                musicSource = gameObject.AddComponent<AudioSource>();
                musicSource.loop = true;
                musicSource.playOnAwake = false;
            }
            
            if (sfxSource == null)
            {
                sfxSource = gameObject.AddComponent<AudioSource>();
                sfxSource.playOnAwake = false;
            }
            
            if (voiceSource == null)
            {
                voiceSource = gameObject.AddComponent<AudioSource>();
                voiceSource.playOnAwake = false;
            }
            
            if (accessibilitySource == null)
            {
                accessibilitySource = gameObject.AddComponent<AudioSource>();
                accessibilitySource.playOnAwake = false;
            }
            
            // Configure audio sources
            ConfigureAudioSources();
        }

        private void ConfigureAudioSources()
        {
            // Music source configuration
            musicSource.volume = musicVolume * masterVolume;
            musicSource.priority = 128;
            
            // SFX source configuration
            sfxSource.volume = sfxVolume * masterVolume;
            sfxSource.priority = 64;
            
            // Voice source configuration (highest priority for educational content)
            voiceSource.volume = voiceVolume * masterVolume;
            voiceSource.priority = 0;
            
            // Accessibility source (for screen readers, etc.)
            accessibilitySource.volume = masterVolume;
            accessibilitySource.priority = 32;
        }

        private void SetupAudioMixer()
        {
            // Audio mixer setup for advanced audio control
            if (mainAudioMixer != null)
            {
                mainAudioMixer.SetFloat("MasterVolume", Mathf.Log10(masterVolume) * 20);
                mainAudioMixer.SetFloat("MusicVolume", Mathf.Log10(musicVolume) * 20);
                mainAudioMixer.SetFloat("SFXVolume", Mathf.Log10(sfxVolume) * 20);
                mainAudioMixer.SetFloat("VoiceVolume", Mathf.Log10(voiceVolume) * 20);
            }
        }

        private void CreateSFXPool()
        {
            // Create a pool of audio sources for simultaneous sound effects
            for (int i = 0; i < SFX_POOL_SIZE; i++)
            {
                GameObject sfxObject = new GameObject($"SFX_AudioSource_{i}");
                sfxObject.transform.SetParent(transform);
                
                AudioSource source = sfxObject.Ad