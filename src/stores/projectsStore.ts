import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '../types'
import api from '../lib/axios'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const allProjects = computed(() => projects.value || [])

  const projectsByOrganizationId = (organizationId: string) => computed(() =>
    projects.value.filter(project => project.organization_id === organizationId)
  )

  // Actions
  async function fetchProjects() {
    loading.value = true
    error.value = null
    try {
      projects.value = await api.get('/projects')
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load projects'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    loading.value = true
    error.value = null
    try {
      const newProject = await api.post('/projects', project)
      projects.value.push(newProject)
      return newProject
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create project'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updateProject(id: string, updates: Partial<Project>) {
    loading.value = true
    error.value = null
    try {
      const updatedProject = await api.put(`/projects/${id}`, updates)
      const index = projects.value.findIndex(project => project.id === id)
      if (index !== -1) {
        projects.value[index] = updatedProject
      }
      return updatedProject
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update project'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deleteProject(id: string) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/projects/${id}`)
      projects.value = projects.value.filter(project => project.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete project'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    loading,
    error,
    allProjects,
    projectsByOrganizationId,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  }
})