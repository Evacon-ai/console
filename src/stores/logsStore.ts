import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../lib/axios'
import { useUserStore } from './userStore'

export type LogAction = 'create' | 'update' | 'delete' | 'login' | 'logout'
export type EntityType = 'organization' | 'project' | 'user' | 'diagram' | 'session'

export interface Log {
  id: string
  created_by: string
  created_at: string | { _seconds: number; _nanoseconds: number }
  action: LogAction
  entity_type: EntityType
  entity_id: string
  details: any
  user?: {
    first_name: string
    last_name: string
    email: string
  }
}

export const useLogsStore = defineStore('logs', () => {
  const logs = ref<Log[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const nextStartAfter = ref<string | null>(null)
  const hasMore = ref(true)
  const userStore = useUserStore()
  
  // Getters
  const sortedLogs = computed(() => {
    return [...logs.value].sort((a, b) => {
      // Handle different timestamp formats
      const getTimestamp = (timestamp: any): number => {
        if (typeof timestamp === 'string') {
          return new Date(timestamp).getTime()
        } else if (timestamp && typeof timestamp._seconds === 'number') {
          return timestamp._seconds * 1000 + (timestamp._nanoseconds || 0) / 1000000
        }
        return 0
      }

      const timeA = getTimestamp(a.created_at)
      const timeB = getTimestamp(b.created_at)
      
      return timeB - timeA // Newest first
    })
  })

  // Actions
  async function fetchLogs(limit = 10) {
    loading.value = true
    error.value = null
    
    try {
      // Reset state for a fresh fetch
      logs.value = []
      nextStartAfter.value = null
      hasMore.value = true
      
      const response = await api.get(`/logs?limit=${limit}`)
      logs.value = response.logs || []
      nextStartAfter.value = response.nextStartAfter
      hasMore.value = !!response.nextStartAfter
      
      return response.logs
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch logs'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function fetchMoreLogs(limit = 10) {
    if (!hasMore.value || loading.value) return []
    
    loading.value = true
    error.value = null
    
    try {
      const url = nextStartAfter.value 
        ? `/logs?limit=${limit}&startAfter=${encodeURIComponent(nextStartAfter.value)}`
        : `/logs?limit=${limit}`
      
      const response = await api.get(url)
      
      if (response.logs && response.logs.length > 0) {
        logs.value = [...logs.value, ...response.logs]
        nextStartAfter.value = response.nextStartAfter
        hasMore.value = !!response.nextStartAfter
      } else {
        hasMore.value = false
      }
      
      return response.logs || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch more logs'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function createLog(logData: {
    user_id: string;
    action: LogAction;
    entity_type: EntityType;
    entity_id: string;
    details?: any;
  }) {
    loading.value = true
    error.value = null
    
    try {
      // Extract current user's name:
      logData.user_first_name = userStore.currentUser?.first_name
      logData.user_last_name = userStore.currentUser?.last_name
      
      const response = await api.post('/logs', logData)
      
      // Add the new log to the beginning of the logs array if it exists
      if (response) {
        logs.value = [response, ...logs.value]
      }
      
      return response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create log'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  // Helper function to log organization creation
  async function logOrganizationCreation(userId: string, organizationId: string, organizationName: string) {
    return createLog({
      user_id: userId,
      action: 'create',
      entity_type: 'organization',
      entity_id: organizationId,
      details: {
        name: organizationName
      }
    });
  }

  // Helper function to log organization update
  async function logOrganizationUpdate(userId: string, organizationId: string, organizationName: string, changes: any) {
    return createLog({
      user_id: userId,
      action: 'update',
      entity_type: 'organization',
      entity_id: organizationId,
      details: {
        name: organizationName,
        changes
      }
    });
  }

  // Helper function to format log action for display
  function formatLogAction(log: Log): string {
    const action = log.action.toLowerCase()
    const entityType = log.entity_type.toLowerCase()
    
    let actionText = ''
    
    switch (action) {
      case 'create':
        actionText = 'created'
        break
      case 'update':
        actionText = 'updated'
        break
      case 'delete':
        actionText = 'deleted'
        break
      default:
        actionText = action
    }
    
    return `${actionText} ${entityType}`
  }

  // Helper function to get user name from log
  function getLogUserName(log: Log): string {
    if (log.user) {
      return `${log.user.first_name} ${log.user.last_name}`.trim()
    }
    return 'Unknown User'
  }

  return {
    logs,
    loading,
    error,
    hasMore,
    sortedLogs,
    fetchLogs,
    fetchMoreLogs,
    createLog,
    logOrganizationCreation,
    logOrganizationUpdate,
    formatLogAction,
    getLogUserName
  }
})