import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Diagram } from '../types'
import { DateTime } from 'luxon'
import api from '../lib/axios'
import { useQuasar } from 'quasar'

export const useDiagramsStore = defineStore('diagrams', () => {
  // Map of project ID to array of diagrams
  const diagramsByProject = ref<Map<string, Diagram[]>>(new Map())
  const loading = ref(false)
  const error = ref<string | null>(null)
  const $q = useQuasar()

  // Getters

  const parseDate = (input: any): number => {
    // Firestore Timestamp instance (from Firestore SDK)
    if (input?.toDate instanceof Function) {
      return input.toDate().getTime()
    }
  
    // Manually detect and convert _seconds / _nanoseconds (if not full Timestamp)
    if (typeof input?._seconds === 'number') {
      return input._seconds * 1000 + Math.floor((input._nanoseconds || 0) / 1e6)
    }
  
    return 0
  }
  
  const getDiagramsByProjectId = (projectId: string) => computed(() => {
    const diagrams = diagramsByProject.value.get(projectId) || []
    return [...diagrams].sort((a, b) => {
      const dateA = parseDate(a.created_at)
      const dateB = parseDate(b.created_at)
      return dateB - dateA // Newest first
    })
  })

  const getDiagramById = (projectId: string, diagramId: string) => computed(() => 
    diagramsByProject.value.get(projectId)?.find(diagram => diagram.id === diagramId)
  )

  // Actions
  async function getDiagramDataExtract(projectId: string, diagramId: string) {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/projects/${projectId}/diagrams/${diagramId}/extract`)
      const projectDiagrams = diagramsByProject.value.get(projectId) || []
      const index = projectDiagrams.findIndex(d => d.id === diagramId)
      
      if (index !== -1) {
        projectDiagrams[index] = response
        diagramsByProject.value.set(projectId, projectDiagrams)
      }
      
      return response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to extract diagram data'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function fetchProjectDiagrams(projectId: string) {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/projects/${projectId}/diagrams`)
      diagramsByProject.value.set(projectId, response)
      return response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load diagrams'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function getDiagram(projectId: string, diagramId: string) {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/projects/${projectId}/diagrams/${diagramId}`)
      const projectDiagrams = diagramsByProject.value.get(projectId) || []
      const index = projectDiagrams.findIndex(d => d.id === diagramId)
      
      if (index !== -1) {
        projectDiagrams[index] = response
      } else {
        projectDiagrams.push(response)
      }
      
      diagramsByProject.value.set(projectId, projectDiagrams)
      return response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load diagram'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function createDiagram(projectId: string, data: Omit<Diagram, 'id' | 'project_id' | 'created_at' | 'updated_at'>) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post(`/projects/${projectId}/diagrams`, data)
      const projectDiagrams = diagramsByProject.value.get(projectId) || []
      projectDiagrams.push(response)
      diagramsByProject.value.set(projectId, projectDiagrams)
      return response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create diagram'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updateDiagram(projectId: string, diagramId: string, data: Partial<Diagram>) {
    loading.value = true
    error.value = null
    try {
      const response = await api.put(`/projects/${projectId}/diagrams/${diagramId}`, data)
      const projectDiagrams = diagramsByProject.value.get(projectId) || []
      const index = projectDiagrams.findIndex(d => d.id === diagramId)
      
      if (index !== -1) {
        projectDiagrams[index] = response
        diagramsByProject.value.set(projectId, projectDiagrams)
      }
      
      return response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update diagram'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deleteDiagram(projectId: string, diagramId: string) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/projects/${projectId}/diagrams/${diagramId}`)
      const projectDiagrams = diagramsByProject.value.get(projectId) || []
      const filteredDiagrams = projectDiagrams.filter(d => d.id !== diagramId)
      diagramsByProject.value.set(projectId, filteredDiagrams)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete diagram'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  // Helper function to parse file name into name and description
  const parseDiagramFileName = (fileName: string): { name: string, description: string } => {
    // Remove file extension
    const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "")
    return {
      name: nameWithoutExtension,
      description: ''
    }
  }

  return {
    diagramsByProject,
    loading,
    error,
    parseDiagramFileName,
    getDiagramsByProjectId,
    getDiagramById,
    fetchProjectDiagrams,
    getDiagramDataExtract,
    getDiagram,
    createDiagram,
    updateDiagram,
    deleteDiagram
  }
})