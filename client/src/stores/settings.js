import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getApiUrl } from '../utils/env'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const settings = ref({
    darkMode: false,
    notifications: true,
    autoRefresh: false,
    sessionTimeout: 30,
    cacheDuration: 2,
    apiUrl: 'http://localhost:5000/api',
    requestTimeout: 10
  })

  const loading = ref(false)
  const error = ref('')

  // Getters
  const currentSettings = computed(() => settings.value)
  const isDarkMode = computed(() => settings.value.darkMode)
  const isLoading = computed(() => loading.value)
  const settingsError = computed(() => error.value)

  // Actions
  const loadSettings = () => {
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
    }
    
    // Apply theme
    applyTheme()
  }

  const saveSettings = async () => {
    loading.value = true
    error.value = ''
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        // Save to localStorage only if no token
        localStorage.setItem('appSettings', JSON.stringify(settings.value))
        return { success: true }
      }

      const response = await fetch(getApiUrl('/api/settings'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          settings: {
            theme: settings.value.darkMode ? 'dark' : 'light',
            notifications: settings.value.notifications,
            autoRefresh: settings.value.autoRefresh
          }
        })
      })
      
      if (response.ok) {
        localStorage.setItem('appSettings', JSON.stringify(settings.value))
        return { success: true }
      } else {
        const errorData = await response.json()
        error.value = errorData.message || 'Failed to save settings'
        return { success: false, error: error.value }
      }
    } catch (err) {
      error.value = 'Network error while saving settings'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const resetSettings = () => {
    settings.value = {
      darkMode: false,
      notifications: true,
      autoRefresh: false,
      sessionTimeout: 30,
      cacheDuration: 2,
      apiUrl: 'http://localhost:5000/api',
      requestTimeout: 10
    }
    localStorage.removeItem('appSettings')
    applyTheme()
  }

  const toggleTheme = () => {
    settings.value.darkMode = !settings.value.darkMode
    applyTheme()
  }

  const applyTheme = () => {
    if (settings.value.darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  const updateSetting = (key, value) => {
    settings.value[key] = value
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    // State
    settings,
    loading,
    error,
    
    // Getters
    currentSettings,
    isDarkMode,
    isLoading,
    settingsError,
    
    // Actions
    loadSettings,
    saveSettings,
    resetSettings,
    toggleTheme,
    applyTheme,
    updateSetting,
    clearError
  }
}) 