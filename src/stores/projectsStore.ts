import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '../types'
import api from '../lib/axios'
import { useUserStore } from './userStore'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const userStore = useUserStore()

  // Getters
  const allProjects = computed(() => {
    // If user is a customer, only show their organization's projects
    if (userStore.currentUser?.level === 'customer' && userStore.currentUser?.organization_id) {
      return projects.value.filter(
        project => project.organization_id === userStore.currentUser?.organization_id
      )
    }
    
    // For Evacon users, show all projects
    return projects.value
  })

  const projectsByOrganizationId = (organizationId: string) => computed(() => {
    if (!Array.isArray(projects.value)) {
      return []
    }
    return projects.value.filter(project => project.organization_id === organizationId)
  })

  // Actions
  async function fetchProjects() {
    loading.value = true
    error.value = null
    const currentUser = userStore.currentUser
    
    try {
      let response
      // For customer users, fetch only their organization's projects
      if (currentUser?.level === 'customer' && currentUser?.organization_id) {
        const orgId = currentUser.organization_id
        response = await api.get(`/projects?organization_id=${orgId}`)
      } else {
        // For Evacon users, fetch all projects
        response = await api.get('/projects')
      }
      
      // Ensure we always set an array
      console.log('Fetched projects response:', response)
      projects.value = response || []
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
      if (Array.isArray(projects.value)) {
        projects.value.push(newProject)
      } else {
        projects.value = [newProject]
      }
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
      if (Array.isArray(projects.value)) {
        const index = projects.value.findIndex(project => project.id === id)
        if (index !== -1) {
          projects.value[index] = updatedProject
        }
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
      if (Array.isArray(projects.value)) {
        projects.value = projects.value.filter(project => project.id !== id)
      }
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