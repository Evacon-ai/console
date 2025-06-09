import axios from 'axios'
import { auth } from './firebase'

// Create axios instance with default config
const api = axios.create({
  baseURL: `https://${import.meta.env.VITE_API_HOST}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get current Firebase user
    const user = auth.currentUser
    if (user) {
      const idToken = await user.getIdToken(true)
      config.headers.Authorization = `Bearer ${idToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          auth.signOut().then(() => {
            if (!window.location.pathname.includes('/login')) {
              window.location.href = `/login?error=${encodeURIComponent('Session expired. Please login again.')}`
            }
          })
          break
        case 403:
          console.error('Access forbidden')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Server error')
          break
      }
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

export default api