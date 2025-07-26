<template>
  <div class="landing-container">
    <nav class="navbar">
      <div class="nav-brand">
        <h2>MEVN App</h2>
      </div>
      <div class="nav-user">
        <span class="welcome-text">Welcome, {{ user?.name || 'User' }}</span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
    </nav>
    
    <main class="main-content">
      <div class="hero-section">
        <div class="hero-content">
          <h1>Welcome to Your Dashboard</h1>
          <p>You've successfully logged into your MEVN application!</p>
        </div>
      </div>
      
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-icon">👤</div>
          <h3>Profile Information</h3>
          <div class="profile-info">
            <p><strong>Name:</strong> {{ user?.name || 'N/A' }}</p>
            <p><strong>Email:</strong> {{ user?.email || 'N/A' }}</p>
            <p><strong>User ID:</strong> {{ user?.id || 'N/A' }}</p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-icon">🔐</div>
          <h3>Authentication Status</h3>
          <div class="status-info">
            <p><strong>Status:</strong> <span class="status-success">Authenticated</span></p>
            <p><strong>Token:</strong> <span class="token-preview">{{ tokenPreview }}</span></p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-icon">⚡</div>
          <h3>Quick Actions</h3>
          <div class="actions">
            <button @click="refreshProfile" class="action-btn">Refresh Profile</button>
            <button @click="testAPI" class="action-btn">Test API</button>
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
      
      <div v-if="apiMessage" class="api-message" :class="apiMessageType">
        {{ apiMessage }}
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)
const apiMessage = ref('')
const apiMessageType = ref('')

const tokenPreview = computed(() => {
  const token = localStorage.getItem('token')
  if (token) {
    return token.substring(0, 20) + '...'
  }
  return 'No token'
})

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  } else {
    // Redirect to login if no user data
    router.push('/login')
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

const refreshProfile = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    apiMessage.value = 'No authentication token found'
    apiMessageType.value = 'error'
    return
  }
  
  try {
    const response = await fetch('http://localhost:5000/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.ok) {
      const profileData = await response.json()
      user.value = profileData
      apiMessage.value = 'Profile refreshed successfully!'
      apiMessageType.value = 'success'
    } else {
      apiMessage.value = 'Failed to refresh profile'
      apiMessageType.value = 'error'
    }
  } catch (error) {
    apiMessage.value = 'Network error while refreshing profile'
    apiMessageType.value = 'error'
  }
  
  // Clear message after 3 seconds
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
    } else {
      apiMessage.value = 'API test failed'
      apiMessageType.value = 'error'
    }
  } catch (error) {
    apiMessage.value = 'Network error during API test'
    apiMessageType.value = 'error'
  }
  
  // Clear message after 3 seconds
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
}

.nav-brand h2 {
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
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
  max-width: 1200px;
  margin: 0 auto;
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

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.card h3 {
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
  
  .nav-user {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style> 