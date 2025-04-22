import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'
import api from '../lib/axios'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const customerUsers = computed(() => 
    users.value.filter(user => user.level === 'customer')
  )

  const evaconUsers = computed(() => 
    users.value.filter(user => user.level === 'evacon')
  )

  // Actions
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      users.value = await api.get('/users')
    } catch (e) {
      console.error('Error fetching users:', e)
      error.value = e instanceof Error ? e.message : 'Failed to load users'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    loading.value = true
    error.value = null
    try {
      const newUser = await api.post('/users', userData)
      users.value.push(newUser)
      return newUser
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create user'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updateUser(id: string, updates: Partial<User>) {
    loading.value = true
    error.value = null
    try {
      const updatedUser = await api.put(`/users/${id}`, updates)
      const index = users.value.findIndex(user => user.id === id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      return updatedUser
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update user'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deleteUser(id: string) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/users/${id}`)
      users.value = users.value.filter(user => user.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete user'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    customerUsers,
    evaconUsers,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
})