import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Job, JobStatus } from '../types'
import api from '../lib/axios'
import { webSocketService } from '../lib/websocket'
import { useUserStore } from './userStore'
import { useDiagramsStore } from './diagramsStore'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const organizationJobs = ref<Job[]>([])
  
  // Initialize WebSocket connection and handle job updates
  const initializeWebSocket = async () => {
    const userStore = useUserStore()
    const diagramsStore = useDiagramsStore()
    
    // Connect to WebSocket first
    webSocketService.connect(userStore)
    
    // Set up message handler
    webSocketService.onMessage(async (data) => {
      if (data.type === 'job_update') {
        const updatedJob = data.job
        
        // Fetch the latest job data from the API
        const freshJob = await getJobById(updatedJob.id)
        
        // Update job in jobs list if it exists
        const jobIndex = jobs.value.findIndex(job => job.id === updatedJob.id)
        if (jobIndex !== -1) {
          jobs.value[jobIndex] = freshJob
        }
        
        // Update job in organizationJobs if it exists
        const orgJobIndex = organizationJobs.value.findIndex(job => job.id === updatedJob.id)
        if (orgJobIndex !== -1) {
          organizationJobs.value[orgJobIndex] = freshJob
        }

        // If this is a completed diagram_elements_extraction job, refresh the related diagram
        if (freshJob.type === 'diagram_elements_extraction' && 
            freshJob.status === 'completed' && 
            freshJob.payload?.diagram_id && 
            freshJob.payload?.project_id) {
          try {
            await diagramsStore.getDiagram(freshJob.payload.project_id, freshJob.payload.diagram_id)
            console.log("------diagramsStore.getDiagram-----")
          } catch (error) {
            console.error('Failed to refresh diagram after job completion:', error)
          }
        }
      }
    })
  }

  // Actions
  async function fetchJobs() {
    loading.value = true
    error.value = null
    try {
      jobs.value = await api.get('/jobs')
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load jobs'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function fetchOrganizationPendingJobs(organizationId: string): Promise<Job[]> {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/jobs/organization/${organizationId}?status=pending`)
      organizationJobs.value = response
      return organizationJobs.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load jobs'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function getJobById(id: string) {
    loading.value = true
    error.value = null
    try {
      const job = await api.get(`/jobs/${id}`)
      const index = jobs.value.findIndex(j => j.id === id)
      if (index !== -1) {
        jobs.value[index] = job
      } else {
        jobs.value.push(job)
      }
      return job
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load job'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function createJob(data: Omit<Job, 'id' | 'created_at' | 'updated_at'>) {
    loading.value = true
    error.value = null
    try {
      const newJob = await api.post('/jobs', data)
      jobs.value.push(newJob)
      return newJob
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create job'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updateJob(id: string, updates: Partial<Job>) {
    loading.value = true
    error.value = null
    try {
      const updatedJob = await api.put(`/jobs/${id}`, updates)
      const index = jobs.value.findIndex(job => job.id === id)
      if (index !== -1) {
        jobs.value[index] = updatedJob
      }
      return updatedJob
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update job'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deleteJob(id: string) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/jobs/${id}`)
      jobs.value = jobs.value.filter(job => job.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete job'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    jobs,
    loading,
    error,
    organizationJobs,
    initializeWebSocket,
    fetchJobs,
    fetchOrganizationPendingJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
  }
})