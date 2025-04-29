import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, SignUpCredentials } from '../types'
import api from '../lib/axios'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { mockApi } from '../lib/mockDb'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const userMetadata = ref<Map<string, UserMetadata>>(new Map())

  const isAuthenticated = computed(() => currentUser.value !== null)
  const isEvaconAdmin = computed(() => currentUser.value?.level === 'evacon' && currentUser.value?.role === 'admin')
  const isEvaconStaff = computed(() => currentUser.value?.level === 'evacon' && currentUser.value?.role === 'user')

  // Actions
  async function fetchUserMetadata(userId: string) {
    if (userMetadata.value.has(userId)) {
      return userMetadata.value.get(userId)
    }

    try {
      const response = await api.get(`/users/${userId}`)
      const metadata = {
        first_name: response.first_name,
        last_name: response.last_name
      }
      userMetadata.value.set(userId, metadata)
      return metadata
    } catch (e) {
      console.error('Failed to fetch user metadata:', e)
      return {
        first_name: '—',
        last_name: ''
      }
    }
  }

  async function signUp({ email, password }: SignUpCredentials) {
    loading.value = true
    error.value = null
    
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Create user in our API
      const newUser = await api.post('/users', {
        firebase_uid: firebaseUser.uid,
        email: firebaseUser.email,
        role: 'customer_user',
        level: 'customer'
      })
      
      currentUser.value = newUser
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Sign up failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function login({ email, password }: LoginCredentials) {
    loading.value = true
    error.value = null
    let errorMessage = null
    
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password)
      
      // Get user metadata from our API
      const userData = await api.get(`/users/me`)
      if (!userData || !userData.id) {
        errorMessage = 'User account not found'
        throw new Error(errorMessage)
      }
      
      currentUser.value = userData
      return true
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Login failed'
      error.value = message
      
      // Map Firebase errors to user-friendly messages
      if (message.includes('auth/wrong-password')) {
        error.value = 'Invalid email or password'
      } else if (message.includes('auth/user-not-found')) {
        error.value = 'No account found with this email'
      } else if (message.includes('auth/too-many-requests')) {
        error.value = 'Too many attempts. Please try again later'
      }
      
      return false
    } finally {
      loading.value = false
    }
  }

  async function resetPassword(email: string) {
    loading.value = true
    error.value = null

    try {
      await sendPasswordResetEmail(auth, email)
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Password reset failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function updatePassword(code: string, newPassword: string) {
    loading.value = true
    error.value = null

    try {
      await confirmPasswordReset(auth, code, newPassword)
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Password update failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      currentUser.value = null
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Logout failed'
      return false
    }
  }

  async function initSession() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Get user metadata from our API
          const userData = await api.get(`/users/me`)
          if (userData) {
            currentUser.value = userData
          } else {
            currentUser.value = null
          }
        } else {
          currentUser.value = null
        }
        unsubscribe()
        resolve(true)
      })
    })
  }

  return {
    currentUser,
    loading,
    error,
    isAuthenticated,
    isEvaconAdmin,
    isEvaconStaff,
    signUp,
    fetchUserMetadata,
    login,
    logout,
    resetPassword,
    updatePassword,
    initSession
  }
})