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

  // Initialize store with customer organization if needed
  async function initializeStore(userId: string, userLevel: string, organizationId?: string) {
    if (userLevel === 'customer' && organizationId) {
      await fetchOrganizationById(organizationId)
    }
  }

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

  async function fetchOrganizationById(id: string) {
    loading.value = true
    error.value = null
    try {
      const org = await api.get(`/organizations/${id}`)
      // Update or add the organization to the store
      const index = organizations.value.findIndex(o => o.id === id)
      if (index !== -1) {
        organizations.value[index] = org
      } else {
        organizations.value.push(org)
      }
      return org
    } catch (e) {
      console.error('Error fetching organization:', e)
      error.value = e instanceof Error ? e.message : 'Failed to load organization'
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
      
      // Fetch all organizations to ensure data consistency
      await fetchOrganizations()
      
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
    initializeStore,
    fetchOrganizations,
    fetchOrganizationById,
    createOrganization,
    updateOrganization,
    deleteOrganization
  }
})