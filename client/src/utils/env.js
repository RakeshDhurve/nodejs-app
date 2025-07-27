// Environment configuration utility
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // App Configuration
  appTitle: import.meta.env.VITE_APP_TITLE || 'MEVN Application',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  
  // Feature flags
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // API endpoints
  endpoints: {
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      changePassword: '/api/auth/change-password'
    },
    profile: {
      get: '/api/profile',
      update: '/api/profile',
      delete: '/api/profile'
    },
    settings: {
      get: '/api/settings',
      update: '/api/settings'
    },
    users: '/api/users',
    health: '/api/health',
    info: '/api/info'
  }
}

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${config.apiUrl}${endpoint}`
}

// Helper function to check if we're in development mode
export const isDev = () => config.isDevelopment

// Helper function to check if we're in production mode
export const isProd = () => config.isProduction

// Helper function to get environment info
export const getEnvironmentInfo = () => {
  return {
    apiUrl: config.apiUrl,
    appTitle: config.appTitle,
    appVersion: config.appVersion,
    appEnv: config.appEnv,
    isDevelopment: config.isDevelopment,
    isProduction: config.isProduction
  }
} 