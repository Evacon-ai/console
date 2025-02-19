import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials } from '../types'
import { supabase } from '../lib/supabase'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => currentUser.value !== null)
  const isEvaconStaff = computed(() => 
    currentUser.value?.role === 'evacon_admin' || 
    currentUser.value?.role === 'evacon_staff'
  )
  const isEvaconAdmin = computed(() => 
    currentUser.value?.role === 'evacon_admin'
  )

  async function login({ email, password }: LoginCredentials) {
    loading.value = true
    error.value = null
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) throw authError

      if (authData.user) {
        const metadata = authData.user.user_metadata
        currentUser.value = {
          id: authData.user.id,
          email: authData.user.email!,
          firstName: metadata.first_name || '',
          lastName: metadata.last_name || '',
          role: metadata.role || 'customer_user',
          createdAt: authData.user.created_at,
          updatedAt: authData.user.updated_at
        }
        return true
      }
      return false
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function resetPassword(email: string) {
    loading.value = true
    error.value = null

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/new-password`
      })

      if (resetError) throw resetError
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Password reset failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function updatePassword(password: string) {
    loading.value = true
    error.value = null

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password
      })

      if (updateError) throw updateError
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Password update failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      error.value = signOutError.message
      return false
    }
    currentUser.value = null
    return true
  }

  async function initSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const metadata = session.user.user_metadata
      currentUser.value = {
        id: session.user.id,
        email: session.user.email!,
        firstName: metadata.first_name || '',
        lastName: metadata.last_name || '',
        role: metadata.role || 'customer_user',
        createdAt: session.user.created_at,
        updatedAt: session.user.updated_at
      }
    }
  }

  return {
    currentUser,
    loading,
    error,
    isAuthenticated,
    isEvaconStaff,
    isEvaconAdmin,
    login,
    logout,
    resetPassword,
    updatePassword,
    initSession
  }
})