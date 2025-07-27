import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const sessionStats = ref({
    loginTime: '',
    duration: '0:00:00',
    apiCalls: 0
  })

  const performanceStats = ref({
    memory: 45,
    cpu: 23,
    network: 'Connected'
  })

  const recentActivity = ref([
    { id: 1, time: 'Just now', text: 'Application started' }
  ])

  const sessionStartTime = ref(null)
  const sessionTimer = ref(null)

  // Getters
  const currentSessionStats = computed(() => sessionStats.value)
  const currentPerformanceStats = computed(() => performanceStats.value)
  const activityLog = computed(() => recentActivity.value)
  const sessionDuration = computed(() => sessionStats.value.duration)

  // Actions
  const startSession = () => {
    sessionStartTime.value = new Date()
    sessionStats.value.loginTime = sessionStartTime.value.toLocaleTimeString()
    sessionStats.value.apiCalls = 0
    
    // Start session timer
    sessionTimer.value = setInterval(() => {
      if (sessionStartTime.value) {
        const now = new Date()
        const diff = now - sessionStartTime.value
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        sessionStats.value.duration = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }
    }, 1000)

    addActivity('User session started')
  }

  const stopSession = () => {
    if (sessionTimer.value) {
      clearInterval(sessionTimer.value)
      sessionTimer.value = null
    }
    addActivity('User session ended')
  }

  const incrementApiCalls = () => {
    sessionStats.value.apiCalls++
  }

  const addActivity = (text) => {
    const now = new Date()
    const timeString = now.toLocaleTimeString()
    
    recentActivity.value.unshift({
      id: Date.now(),
      time: 'Just now',
      text: text
    })
    
    // Keep only last 20 activities
    if (recentActivity.value.length > 20) {
      recentActivity.value = recentActivity.value.slice(0, 20)
    }
  }

  const updatePerformanceStats = (stats) => {
    performanceStats.value = { ...performanceStats.value, ...stats }
  }

  const clearActivityLog = () => {
    recentActivity.value = []
    addActivity('Activity log cleared')
  }

  const resetSession = () => {
    sessionStats.value = {
      loginTime: '',
      duration: '0:00:00',
      apiCalls: 0
    }
    sessionStartTime.value = null
    if (sessionTimer.value) {
      clearInterval(sessionTimer.value)
      sessionTimer.value = null
    }
  }

  return {
    // State
    sessionStats,
    performanceStats,
    recentActivity,
    sessionStartTime,
    sessionTimer,
    
    // Getters
    currentSessionStats,
    currentPerformanceStats,
    activityLog,
    sessionDuration,
    
    // Actions
    startSession,
    stopSession,
    incrementApiCalls,
    addActivity,
    updatePerformanceStats,
    clearActivityLog,
    resetSession
  }
}) 