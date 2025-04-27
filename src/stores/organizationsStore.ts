import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Organization } from '../types'
import api from '../lib/axios'

export const useOrganizationsStore = defineStore('organizations', () => {
  const organizations = ref<Organization[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const activeOrganizations = computed(() => 
    organizations.value.filter(org => org.account_status === 'active')
  )

  const inactiveOrganizations = computed(() => 
    organizations.value.filter(org => org.account_status === 'inactive')
  )

  // Actions
  async function fetchOrganizations() {
    loading.value = true
    error.value = null
    try {
      organizations.value = await api.get('/organizations')
    } catch (e) {
      console.error('Error fetching organizations:', e)
      error.value = e instanceof Error ? e.message : 'Failed to load organizations'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function createOrganization(data: Omit<Organization, 'id' | 'created_at' | 'updated_at'>) {
    loading.value = true
    error.value = null
    try {
      const newOrg = await api.post('/organizations', data)
      organizations.value.push(newOrg)
      return newOrg
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create organization'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updateOrganization(id: string, updates: Partial<Organization>) {
    loading.value = true
    error.value = null
    try {
      const updatedOrg = await api.put(`/organizations/${id}`, updates)
      const index = organizations.value.findIndex(org => org.id === id)
      if (index !== -1) {
        organizations.value[index] = updatedOrg
      }
      return updatedOrg
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update organization'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deleteOrganization(id: string) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/organizations/${id}`)
      organizations.value = organizations.value.filter(org => org.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete organization'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    organizations,
    loading,
    error,
    activeOrganizations,
    inactiveOrganizations,
    fetchOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization
  }
})