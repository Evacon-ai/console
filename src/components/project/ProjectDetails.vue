<template>
  <q-dialog
    v-model="dialogOpen"
    position="right"
    :maximized="$q.screen.lt.lg"
    full-height
    :style="$q.screen.gt.md ? 'width: 1200px' : ''"
    transition-show="slide-left"
    transition-hide="slide-right"
    @hide="onDialogHide"
  >
    <q-card v-if="project" class="full-height overflow-hidden-y" style="width: 100%; min-width: 1100px;">
      <!-- Header -->
      <div class="project-header q-px-lg q-py-md">
        <div class="row items-center full-width">
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
                <FolderGit2 class="w-10 h-10" />
              </div>
            </template>
          </div>
          <div class="column">
            <div class="text-h5 cursor-pointer" @click="showNameEdit = true">{{ project.name }}</div>
            <div class="text-subtitle1 text-grey-7 cursor-pointer" @click="showDescriptionEdit = true">{{ project.description }}</div>
            <div class="text-caption text-grey-7 row items-center cursor-pointer" @click="showLocationEdit = true">
              <LocationDisplay
                :city="project.location.city"
                :state="project.location.state"
                :country="project.location.country"
              />
            </div>
          </div>
          <q-space />
          <div class="column items-end">
            <q-btn icon="close" flat round dense v-close-popup class="q-mb-sm" />       
            <div @click="showStatusEdit = true">
              <q-chip
                :color="getStatusColor(project.status)"
                text-color="white"
                class="status-btn"
                :class="{ 'cursor-pointer': canEdit }"
                size="sm"
                :disable="!canEdit"
              >
                {{ $t(`projects.status.options.${project.status}`) }}
                <q-tooltip v-if="!canEdit">
                  {{ $t('projects.onlyAdminsCanChangeStatus') }}
                </q-tooltip>
              </q-chip>
            </div>
          </div>
        </div>
      </div>

      <q-separator />

      <div class="column" style="min-height: 0;">
        <div class="row no-wrap" style="width: 100%; height: calc(100vh - 140px);">
          <!-- Left Menu -->
          <div class="col-auto" style="width: 250px; height: 100%;">
            <q-scroll-area class="fit">
              <q-list class="q-pa-md">
                <q-item
                  v-for="tab in tabs"
                  :key="tab.value"
                  clickable
                  :active="activeTab === tab.value"
                  @click="activeTab = tab.value"
                  active-class="project-menu-item-active"
                >
                  <q-item-section avatar>
                    <component :is="tab.icon" class="w-5 h-5 menu-icon" />
                  </q-item-section>
                  <q-item-section>{{ $t(`projects.${tab.value}.title`) }}</q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
  
          <!-- Content Area -->
          <div class="col row full-width" style="height: 100%;">
            <q-scroll-area class="col full-width">
              <div class="q-pa-lg">
                <!-- Diagrams Tab -->
                <ProjectDiagramsPanel
                  v-if="activeTab === 'diagrams'"
                  :project="project"
                />
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </q-card>

    <ProjectNameDialog
      v-if="project"
      v-model="showNameEdit"
      :project="project"
      @submit="onNameSubmit"
    />

    <ProjectDescriptionDialog
      v-if="project"
      v-model="showDescriptionEdit"
      :project="project"
      @submit="onDescriptionSubmit"
    />

    <ProjectStatusDialog
      v-if="project"
      v-model="showStatusEdit"
      :project="project"
      @submit="onStatusSubmit"
    />

    <ProjectLocationDialog
      v-if="project"
      v-model="showLocationEdit"
      :project="project"
      @submit="onLocationSubmit"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { FolderGit2, FileText } from 'lucide-vue-next'
import { useOrganizationsStore } from '../../stores/organizationsStore'
import { useUserStore } from '../../stores/userStore'
import { useProjectsStore } from '../../stores/projectsStore'
import LocationDisplay from '../shared/LocationDisplay.vue'
import ProjectDiagramsPanel from './panels/ProjectDiagramsPanel.vue'
import ProjectNameDialog from './ProjectNameDialog.vue'
import ProjectDescriptionDialog from './ProjectDescriptionDialog.vue'
import ProjectStatusDialog from './ProjectStatusDialog.vue'
import ProjectLocationDialog from './ProjectLocationDialog.vue'
import type { Project } from '../../types'

const props = defineProps<{
  modelValue: boolean
  project: Project | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'project-updated'): void
}>()

const { locale } = useI18n()
const $q = useQuasar()
const organizationsStore = useOrganizationsStore()
const userStore = useUserStore()
const projectsStore = useProjectsStore()
const activeTab = ref('diagrams')
const updating = ref(false)
const showNameEdit = ref(false)
const showDescriptionEdit = ref(false)
const showStatusEdit = ref(false)
const showLocationEdit = ref(false)
const isRTL = computed(() => ['ar', 'he'].includes(locale.value))

const tabs = [
  { value: 'diagrams', icon: FileText }
]

const getOrganizationLogo = (organizationId: string) => {
  return organizationsStore.organizations.find(org => org.id === organizationId)?.logo_url
}

onMounted(() => {
  if (props.project?.organization_id) {
    organizationsStore.fetchOrganizationById(props.project.organization_id)
  }
})

const canEdit = computed(() => {
  return userStore.isEvaconAdmin
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'light-blue'
    case 'completed': return 'teal'
    case 'on_hold': return 'warning'
    case 'canceled': return 'negative'
    default: return 'grey'
  }
}

const onNameSubmit = async (data: { name: string }) => {
  if (!props.project) return
  
  updating.value = true
  try {
    await projectsStore.updateProject(props.project.id, {
      ...props.project,
      name: data.name
    })
    emit('project-updated')
  } catch (error) {
    console.error('Failed to update name:', error)
  } finally {
    updating.value = false
  }
}

const onDescriptionSubmit = async (data: { description: string }) => {
  if (!props.project) return
  
  updating.value = true
  try {
    await projectsStore.updateProject(props.project.id, {
      ...props.project,
      description: data.description
    })
    emit('project-updated')
  } catch (error) {
    console.error('Failed to update description:', error)
  } finally {
    updating.value = false
  }
}

const onStatusSubmit = async (data: { status: string }) => {
  if (!props.project) return
  
  updating.value = true
  try {
    await projectsStore.updateProject(props.project.id, {
      ...props.project,
      status: data.status
    })
    emit('project-updated')
  } catch (error) {
    console.error('Failed to update status:', error)
  } finally {
    updating.value = false
  }
}

const onLocationSubmit = async (data: { city: string; state: string; postal_code: string; country: string }) => {
  if (!props.project) return
  
  updating.value = true
  try {
    await projectsStore.updateProject(props.project.id, {
      ...props.project,
      location: {
        ...props.project.location,
        ...data
      }
    })
    emit('project-updated')
  } catch (error) {
    console.error('Failed to update location:', error)
  } finally {
    updating.value = false
  }
}

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const onDialogHide = () => {
  activeTab.value = 'diagrams'
}
</script>

<style scoped>
.project-header {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.03), transparent);
  min-height: 72px;
  width: 100%;
}

.body--dark .project-header {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.05), transparent);
}

.project-logo {
  width: 80px;
  height: 80px;
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

.project-menu-item-active {
  color: var(--q-secondary) !important;
  background: rgba(38, 166, 154, 0.1) !important;
  font-weight: 500;
}

.project-menu-item-active .menu-icon {
  color: var(--q-secondary);
}

.q-item {
  border-radius: 8px;
  margin: 4px 8px;
  padding: 12px 16px;
  min-height: 48px;
  transition: all 0.2s ease;
}

.q-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.body--dark .project-menu-item-active {
  background: rgba(38, 166, 154, 0.15) !important;
}

.body--dark .q-item:hover {
  background: rgba(255, 255, 255, 0.07);
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