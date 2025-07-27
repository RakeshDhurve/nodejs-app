import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getApiUrl } from '../utils/env'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref('')

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const userProfile = computed(() => user.value)
  const authError = computed(() => error.value)
  const isLoading = computed(() => loading.value)

  // Actions
  const login = async (credentials) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        token.value = data.token
        user.value = data.user
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/landing')
        return { success: true }
      } else {
        error.value = data.message || 'Login failed'
        return { success: false, error: error.value }
      }
    } catch (err) {
      error.value = 'Network error. Please try again.'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        token.value = data.token
        user.value = data.user
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/landing')
        return { success: true }
      } else {
        error.value = data.message || 'Registration failed'
        return { success: false, error: error.value }
      }
    } catch (err) {
      error.value = 'Network error. Please try again.'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    error.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const checkAuth = async () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      
      // Verify token is still valid
      try {
        const response = await fetch(getApiUrl('/api/profile'), {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        })
        
        if (!response.ok) {
          logout()
          return false
        }
        
        return true
      } catch (error) {
        logout()
        return false
      }
    }
    
    return false
  }

  const updateProfile = async (profileData) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(getApiUrl('/api/profile'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(profileData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        user.value = data.user
        localStorage.setItem('user', JSON.stringify(data.user))
        return { success: true, user: data.user }
      } else {
        error.value = data.message || 'Failed to update profile'
        return { success: false, error: error.value }
      }
    } catch (err) {
      error.value = 'Network error while updating profile'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const changePassword = async (passwordData) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(getApiUrl('/api/auth/change-password'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(passwordData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        return { success: true }
      } else {
        error.value = data.message || 'Failed to change password'
        return { success: false, error: error.value }
      }
    } catch (err) {
      error.value = 'Network error while changing password'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    userProfile,
    authError,
    isLoading,
    
    // Actions
    login,
    register,
    logout,
    checkAuth,
    updateProfile,
    changePassword,
    clearError
  }
}) 