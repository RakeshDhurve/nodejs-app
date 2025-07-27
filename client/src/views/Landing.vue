<template>
  <div class="landing-container">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-brand">
        <h2>MEVN Dashboard</h2>
      </div>
      <div class="nav-menu">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['nav-tab', { active: activeTab === tab.id }]"
        >
          {{ tab.name }}
        </button>
      </div>
      <div class="nav-user">
        <span class="welcome-text">Welcome, {{ authStore.userProfile?.name || 'User' }}</span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
    </nav>
    
    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Dashboard Overview -->
      <div v-if="activeTab === 'dashboard'" class="tab-content">
        <div class="hero-section">
          <div class="hero-content">
            <h1>Welcome to Your Dashboard</h1>
            <p>Manage your account and explore the MEVN application features</p>
          </div>
        </div>
        
        <div class="dashboard-grid">
          <div class="card">
            <div class="card-icon">👤</div>
            <h3>Profile Information</h3>
            <div class="profile-info">
              <p><strong>Name:</strong> {{ authStore.userProfile?.name || 'N/A' }}</p>
              <p><strong>Email:</strong> {{ authStore.userProfile?.email || 'N/A' }}</p>
              <p><strong>User ID:</strong> {{ authStore.userProfile?.id || 'N/A' }}</p>
              <p><strong>Member Since:</strong> {{ formatDate(authStore.userProfile?.createdAt) }}</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-icon">🔐</div>
            <h3>Authentication Status</h3>
            <div class="status-info">
              <p><strong>Status:</strong> <span class="status-success">Authenticated</span></p>
              <p><strong>Token:</strong> <span class="token-preview">{{ tokenPreview }}</span></p>
              <p><strong>Session:</strong> <span class="status-success">Active</span></p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-icon">⚡</div>
            <h3>Quick Actions</h3>
            <div class="actions">
              <button @click="refreshProfile" class="action-btn">Refresh Profile</button>
              <button @click="testAPI" class="action-btn">Test API</button>
              <button @click="clearCache" class="action-btn">Clear Cache</button>
            </div>
          </div>
          
          <div class="card">
            <div class="card-icon">📊</div>
            <h3>System Info</h3>
            <div class="system-info">
              <p><strong>Frontend:</strong> Vue 3 + Vite</p>
              <p><strong>Backend:</strong> Node.js + Express</p>
              <p><strong>Database:</strong> MongoDB</p>
              <p><strong>Authentication:</strong> JWT</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Management -->
      <div v-if="activeTab === 'profile'" class="tab-content">
        <div class="section-header">
          <h2>Profile Management</h2>
          <p>Update your account information and preferences</p>
        </div>
        
        <div class="profile-section">
          <div class="profile-card">
            <h3>Account Details</h3>
            <form @submit.prevent="updateProfile" class="profile-form">
              <div class="form-group">
                <label for="profile-name">Full Name</label>
                <input
                  id="profile-name"
                  v-model="profileForm.name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="profile-email">Email Address</label>
                <input
                  id="profile-email"
                  v-model="profileForm.email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <button type="submit" :disabled="authStore.isLoading" class="update-btn">
                {{ authStore.isLoading ? 'Updating...' : 'Update Profile' }}
              </button>
            </form>
          </div>
          
          <div class="profile-card">
            <h3>Security Settings</h3>
            <form @submit.prevent="changePassword" class="password-form">
              <div class="form-group">
                <label for="current-password">Current Password</label>
                <input
                  id="current-password"
                  v-model="passwordForm.currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="new-password">New Password</label>
                <input
                  id="new-password"
                  v-model="passwordForm.newPassword"
                  type="password"
                  placeholder="Enter new password"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <button type="submit" :disabled="authStore.isLoading" class="update-btn">
                {{ authStore.isLoading ? 'Changing...' : 'Change Password' }}
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div v-if="activeTab === 'settings'" class="tab-content">
        <div class="section-header">
          <h2>Application Settings</h2>
          <p>Customize your application preferences</p>
        </div>
        
        <div class="settings-grid">
          <div class="settings-card">
            <h3>Theme Preferences</h3>
            <div class="setting-item">
              <label>Dark Mode</label>
              <input type="checkbox" v-model="settingsStore.settings.darkMode" @change="settingsStore.toggleTheme()" />
            </div>
            <div class="setting-item">
              <label>Notifications</label>
              <input type="checkbox" v-model="settingsStore.settings.notifications" />
            </div>
            <div class="setting-item">
              <label>Auto Refresh</label>
              <input type="checkbox" v-model="settingsStore.settings.autoRefresh" />
            </div>
          </div>
          
          <div class="settings-card">
            <h3>Data Management</h3>
            <div class="setting-item">
              <label>Session Timeout (minutes)</label>
              <input type="number" v-model="settingsStore.settings.sessionTimeout" min="5" max="120" />
            </div>
            <div class="setting-item">
              <label>Cache Duration (hours)</label>
              <input type="number" v-model="settingsStore.settings.cacheDuration" min="1" max="24" />
            </div>
          </div>
          
          <div class="settings-card">
            <h3>API Configuration</h3>
            <div class="setting-item">
              <label>API Base URL</label>
              <input type="text" v-model="settingsStore.settings.apiUrl" placeholder="http://localhost:5000/api" />
            </div>
            <div class="setting-item">
              <label>Request Timeout (seconds)</label>
              <input type="number" v-model="settingsStore.settings.requestTimeout" min="5" max="60" />
            </div>
          </div>
        </div>
        
        <div class="settings-actions">
          <button @click="saveSettings" :disabled="settingsStore.isLoading" class="save-btn">
            {{ settingsStore.isLoading ? 'Saving...' : 'Save Settings' }}
          </button>
          <button @click="resetSettings" :disabled="settingsStore.isLoading" class="reset-btn">
            {{ settingsStore.isLoading ? 'Resetting...' : 'Reset to Default' }}
          </button>
        </div>
      </div>

      <!-- Analytics -->
      <div v-if="activeTab === 'analytics'" class="tab-content">
        <div class="section-header">
          <h2>Analytics Dashboard</h2>
          <p>Monitor your application usage and performance</p>
        </div>
        
        <div class="analytics-grid">
          <div class="analytics-card">
            <h3>Session Statistics</h3>
            <div class="stat-item">
              <span class="stat-label">Login Time:</span>
              <span class="stat-value">{{ analyticsStore.currentSessionStats.loginTime }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Session Duration:</span>
              <span class="stat-value">{{ analyticsStore.currentSessionStats.duration }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">API Calls:</span>
              <span class="stat-value">{{ analyticsStore.currentSessionStats.apiCalls }}</span>
            </div>
          </div>
          
          <div class="analytics-card">
            <h3>System Performance</h3>
            <div class="stat-item">
              <span class="stat-label">Memory Usage:</span>
              <span class="stat-value">{{ analyticsStore.currentPerformanceStats.memory }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">CPU Usage:</span>
              <span class="stat-value">{{ analyticsStore.currentPerformanceStats.cpu }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Network Status:</span>
              <span class="stat-value status-success">{{ analyticsStore.currentPerformanceStats.network }}</span>
            </div>
          </div>
          
          <div class="analytics-card">
            <h3>Recent Activity</h3>
            <div class="activity-list">
              <div v-for="activity in analyticsStore.activityLog" :key="activity.id" class="activity-item">
                <span class="activity-time">{{ activity.time }}</span>
                <span class="activity-text">{{ activity.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- API Messages -->
      <div v-if="apiMessage" class="api-message" :class="apiMessageType">
        {{ apiMessage }}
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useSettingsStore } from '../stores/settings'
import { useAnalyticsStore } from '../stores/analytics'

const authStore = useAuthStore()
const settingsStore = useSettingsStore()
const analyticsStore = useAnalyticsStore()

const activeTab = ref('dashboard')
const apiMessage = ref('')
const apiMessageType = ref('')

// Profile form
const profileForm = ref({
  name: '',
  email: ''
})

// Password form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Navigation tabs
const tabs = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'profile', name: 'Profile' },
  { id: 'settings', name: 'Settings' },
  { id: 'analytics', name: 'Analytics' }
]

const tokenPreview = computed(() => {
  if (authStore.token) {
    return authStore.token.substring(0, 20) + '...'
  }
  return 'No token'
})

onMounted(async () => {
  // Check authentication
  const isAuthenticated = await authStore.checkAuth()
  if (!isAuthenticated) {
    window.location.href = '/login'
    return
  }
  
  // Initialize stores
  settingsStore.loadSettings()
  analyticsStore.startSession()
  
  // Set profile form data
  if (authStore.userProfile) {
    profileForm.value.name = authStore.userProfile.name
    profileForm.value.email = authStore.userProfile.email
  }
})

onUnmounted(() => {
  analyticsStore.stopSession()
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

const handleLogout = () => {
  analyticsStore.stopSession()
  authStore.logout()
}

const refreshProfile = async () => {
  const result = await authStore.updateProfile({
    name: profileForm.value.name,
    email: profileForm.value.email
  })
  
  if (result.success) {
    apiMessage.value = 'Profile refreshed successfully!'
    apiMessageType.value = 'success'
    analyticsStore.addActivity('Profile refreshed successfully')
    analyticsStore.incrementApiCalls()
  } else {
    apiMessage.value = result.error || 'Failed to refresh profile'
    apiMessageType.value = 'error'
  }
  
  setTimeout(() => {
    apiMessage.value = ''
  }, 3000)
}

const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/health')
    if (response.ok) {
      const data = await response.json()
      apiMessage.value = `API Test: ${data.message}`
      apiMessageType.value = 'success'
      analyticsStore.addActivity('API health check completed')
      analyticsStore.incrementApiCalls()
    } else {
      apiMessage.value = 'API test failed'
      apiMessageType.value = 'error'
    }
  } catch (error) {
    apiMessage.value = 'Network error during API test'
    apiMessageType.value = 'error'
  }
  
  setTimeout(() => {
    apiMessage.value = ''
  }, 3000)
}

const clearCache = () => {
  settingsStore.resetSettings()
  apiMessage.value = 'Cache cleared successfully'
  apiMessageType.value = 'success'
  analyticsStore.addActivity('Application cache cleared')
  setTimeout(() => {
    apiMessage.value = ''
  }, 3000)
}

const updateProfile = async () => {
  const result = await authStore.updateProfile({
    name: profileForm.value.name,
    email: profileForm.value.email
  })
  
  if (result.success) {
    apiMessage.value = 'Profile updated successfully!'
    apiMessageType.value = 'success'
    analyticsStore.addActivity('Profile information updated')
  } else {
    apiMessage.value = result.error || 'Failed to update profile'
    apiMessageType.value = 'error'
  }
  
  setTimeout(() => {
    apiMessage.value = ''
  }, 3000)
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    apiMessage.value = 'New passwords do not match'
    apiMessageType.value = 'error'
    return
  }
  
  const result = await authStore.changePassword({
    currentPassword: passwordForm.value.currentPassword,
    newPassword: passwordForm.value.newPassword
  })
  
  if (result.success) {
    apiMessage.value = 'Password changed successfully!'
    apiMessageType.value = 'success'
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    analyticsStore.addActivity('Password changed successfully')
  } else {
    apiMessage.value = result.error || 'Failed to change password'
    apiMessageType.value = 'error'
  }
  
  setTimeout(() => {
    apiMessage.value = ''
  }, 3000)
}

const saveSettings = async () => {
  const result = await settingsStore.saveSettings()
  
  if (result.success) {
    apiMessage.value = 'Settings saved successfully!'
    apiMessageType.value = 'success'
    analyticsStore.addActivity('Application settings updated')
  } else {
    apiMessage.value = result.error || 'Failed to save settings'
    apiMessageType.value = 'error'
  }
  
  setTimeout(() => {
    apiMessage.value = ''
  }, 3000)
}

const resetSettings = () => {
  settingsStore.resetSettings()
  apiMessage.value = 'Settings reset to default'
  apiMessageType.value = 'success'
  analyticsStore.addActivity('Settings reset to default')
  setTimeout(() => {
    apiMessage.value = ''
  }, 3000)
}
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.navbar {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand h2 {
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-tab {
  background: none;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.nav-tab:hover {
  background: #f8f9fa;
  color: #333;
}

.nav-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome-text {
  color: #666;
  font-weight: 500;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background: #c0392b;
}

.main-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.section-header p {
  font-size: 1.2rem;
  color: #666;
  margin: 0;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.2rem;
  color: #666;
  margin: 0;
}

.dashboard-grid, .settings-grid, .analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card, .settings-card, .analytics-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover, .settings-card:hover, .analytics-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.card h3, .settings-card h3, .analytics-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
}

.profile-info p, .status-info p, .system-info p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.95rem;
}

.status-success {
  color: #27ae60;
  font-weight: 600;
}

.token-preview {
  font-family: monospace;
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
}

/* Profile Section */
.profile-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-form, .password-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.update-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.update-btn:hover {
  transform: translateY(-2px);
}

.update-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Settings Section */
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item label {
  font-weight: 500;
  color: #333;
}

.setting-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.setting-item input[type="number"], .setting-item input[type="text"] {
  width: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.settings-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.save-btn, .reset-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.save-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.reset-btn {
  background: #6c757d;
  color: white;
}

.save-btn:hover, .reset-btn:hover {
  transform: translateY(-2px);
}

/* Analytics Section */
.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-weight: 500;
  color: #333;
}

.stat-value {
  font-weight: 600;
  color: #667eea;
}

.activity-list {
  max-height: 200px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  font-size: 0.85rem;
  color: #666;
}

.activity-text {
  color: #333;
  font-weight: 500;
}

.api-message {
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-top: 1rem;
}

.api-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.api-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    order: 2;
    width: 100%;
    justify-content: center;
  }
  
  .nav-user {
    order: 3;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .hero-content h1, .section-header h2 {
    font-size: 2rem;
  }
  
  .dashboard-grid, .settings-grid, .analytics-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-section {
    grid-template-columns: 1fr;
  }
  
  .settings-actions {
    flex-direction: column;
  }
}
</style> 