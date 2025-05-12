import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Diagram } from '../types'
import api from '../lib/axios'

export const useDiagramsStore = defineStore('diagrams', () => {
  // Map of project ID to array of diagrams
  const diagramsByProject = ref<Map<string, Diagram[]>>(new Map())
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getDiagramsByProjectId = (projectId: string) => computed(() => 
    diagramsByProject.value.get(projectId) || []
  )

  const getDiagramById = (projectId: string, diagramId: string) => computed(() => 
    diagramsByProject.value.get(projectId)?.find(diagram => diagram.id === diagramId)
  )

  // Actions
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

  return {
    diagramsByProject,
    loading,
    error,
    getDiagramsByProjectId,
    getDiagramById,
    fetchProjectDiagrams,
    getDiagram,
    createDiagram,
    updateDiagram,
    deleteDiagram
  }
})