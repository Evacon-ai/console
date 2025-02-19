import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useUsersStore = defineStore('users', () => {
  const users = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const customerUsers = computed(() => 
    users.value.filter(user => user.role.startsWith('customer_'))
  )

  const evaconUsers = computed(() => 
    users.value.filter(user => user.role.startsWith('evacon_'))
  )

  // Actions
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase
        .rpc('get_users')

      if (rpcError) {
        throw rpcError
      }

      users.value = data || []
    } catch (e) {
      console.error('Error fetching users:', e)
      error.value = e instanceof Error ? e.message : 'Failed to load users'
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
    fetchUsers
  }
})