<template>
  <q-page padding>
    <div class="column q-mb-lg">
      <div class="row items-center justify-between">
        <div class="text-h4">{{ $t('projects.title') }}</div>
        <div class="row items-center q-gutter-sm">
          <q-btn
            flat
            round
            color="primary"
            icon="refresh"
            :loading="projectsStore.loading"
            @click="projectsStore.fetchProjects"
          >
            <q-tooltip>{{ $t('common.refresh') }}</q-tooltip>
          </q-btn>
          <q-btn
            v-if="showNewProjectButton"
            color="primary"
            icon="add"
            :label="$t('common.newProject')"
            @click="showNewProject = true"
          />
        </div>
      </div>
      
      <!-- Organization Filter Header -->
      <div v-if="selectedOrganization" class="row items-center q-mt-md">
        <q-chip
          class="bg-primary text-white"
          removable
          @remove="clearOrganizationFilter"
        >
          {{ $t('projects.showingProjectsFor', { name: selectedOrganization.name }) }}
        </q-chip>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="projectsStore.loading" class="row justify-center items-center" style="min-height: 200px;">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="row q-col-gutter-md">
      <template v-if="projects && projects.length">
        <div class="col-12" v-for="project in projects" :key="project.id">
          <q-card flat bordered class="cursor-pointer" @click="showProject(project)">
            <q-card-section>
              <div class="row items-start justify-between">
                <div class="row items-center">
                  <div class="project-logo" :class="isRTL ? 'q-ml-md' : 'q-mr-md'">
                    <template v-if="getOrganizationLogo(project.organization_id)">
                      <img 
                        :src="getOrganizationLogo(project.organization_id)" 
                        :alt="project.name"
                        class="project-logo-image"
                      >
                    </template>
                    <template v-else>
                      <div class="project-logo-fallback">
                        <FolderGit2 class="w-6 h-6" />
                      </div>
                    </template>
                  </div>
                  <div>
                    <div class="text-h6 q-mb-xs">{{ project.name }}</div>
                    <div class="text-grey-7">{{ project.description }}</div>                  
                  </div>
                </div>
                <div class="column items-end">
                  <q-chip
                    :color="getStatusColor(project.status)"
                    text-color="white" 
                    class="status-btn q-mb-sm"
                    size="sm" 
                  >
                    {{ $t(`organizations.status.${project.status}`) }}
                  </q-chip>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="row items-center justify-between q-pl-xs">
                <div v-if="project.location" class="text-caption text-grey-7 row items-center">
                  <LocationDisplay
                    :city="project.location.city"
                    :state="project.location.state"
                    :country="project.location.country"
                  />
                </div>
                <div class="row items-center text-grey-7">
                  {{ $t('projects.generated', { time: formatTime(project.created_at) }) }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
      <template v-else>
        <div class="col-12 text-center q-pa-xl">
          <FolderGit2 class="text-grey-5 q-mb-md" style="width: 64px; height: 64px;" />
          <div class="text-h6 text-grey-7">
            {{ selectedOrganization 
              ? $t('projects.noProjectsForOrganization', { name: selectedOrganization.name })
              : $t('projects.noProjects') }}
          </div>
        </div>
      </template>
    </div>

    <NewProject
      v-model="showNewProject"
      @project-created="onProjectCreated"
    />
    <ProjectDetails
      v-if="showDetails && selectedProject"
      v-model="showDetails"
      :project="selectedProject"
      @project-updated="onProjectUpdated"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProjectsStore } from '../stores/projectsStore'
import { useUserStore } from '../stores/userStore'
import { useOrganizationsStore } from '../stores/organizationsStore'
import { FolderGit2, Calendar } from 'lucide-vue-next'
import NewProject from '../components/project/NewProject.vue'
import ProjectDetails from '../components/project/ProjectDetails.vue'
import LocationDisplay from '../components/LocationDisplay.vue'
import { useTimeFormatter } from '../utils/formatTime'
import { useRoute, useRouter } from 'vue-router'
import type { Project } from '../types'
import { countries } from '../utils/countries'

const { locale } = useI18n()
const projectsStore = useProjectsStore()
const userStore = useUserStore()
const organizationsStore = useOrganizationsStore()
const route = useRoute()
const router = useRouter()
const showNewProject = ref(false)
const showDetails = ref(false)
const selectedProject = ref<Project | null>(null)
const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

const selectedOrganization = computed(() => {
  const orgId = route.query.organization as string
  return orgId ? organizationsStore.organizations.find(org => org.id === orgId) : null
})

const clearOrganizationFilter = () => {
  router.push({ query: {} })
}

const { formatTime } = useTimeFormatter()

const getCountryCode = (countryName: string) => {
  if (!countryName) return 'US'
  const country = countries.find(c => c.value === countryName)
  return country?.code || 'US'
}

const projects = computed(() => {
  const allProjects = projectsStore.allProjects
  if (selectedOrganization.value) {
    return allProjects.filter(project => project.organization_id === selectedOrganization.value.id)
  }
  return allProjects
})

const showNewProjectButton = computed(() => {
  return userStore.currentUser?.level==="evacon" || userStore.currentUser?.role==="admin"
})
  
const getOrganizationLogo = (organizationId: string) => {
  const organization = organizationsStore.organizations.find(org => org.id === organizationId)
  return organization?.logo_url
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'light-blue'
    case 'completed': return 'teal'
    case 'on_hold': return 'warning'
    case 'canceled': return 'negative'
    default: return 'grey'
  }
}

const showProject = (project: Project) => {
  if (!project) return
  selectedProject.value = { ...project }
  showDetails.value = true
}

const onProjectUpdated = async () => {
  await projectsStore.fetchProjects()
  const updatedProject = projectsStore.projects.find(p => p.id === selectedProject.value?.id)
  if (updatedProject) {
    selectedProject.value = { ...updatedProject }
  }
}

const onProjectCreated = async (id: string) => {
  await projectsStore.fetchProjects()
  const newProject = projectsStore.projects.find(p => p.id === id)
  if (newProject) {
    selectedProject.value = { ...newProject }
    showDetails.value = true
  }
}

onMounted(async () => {
  try {
    await projectsStore.fetchProjects()
    if (projectsStore.projects.length > 0) {
      // Fetch organizations for any loaded projects
      const uniqueOrgIds = new Set(projectsStore.projects.map(p => p.organization_id))
      await Promise.all(Array.from(uniqueOrgIds).map(id => 
        organizationsStore.fetchOrganizationById(id)
      ))
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }
})
</script>

<style>
.large-tooltip {
  font-size: 14px !important;
}

.project-logo {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--q-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-logo-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.status-btn {
  text-transform: uppercase !important;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 12px;
  padding: 4px 12px;
}
</style>