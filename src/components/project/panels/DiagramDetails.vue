<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    maximized
    persistent
  >
    <q-card class="column full-height" style="max-height: 100vh;">
      <DiagramHeader
        :diagram="diagram"
        :extracting="extracting"
        @edit-name="showNameEdit = true"
        @edit-description="showDescriptionEdit = true"
      />

      <div class="row no-wrap" style="flex: 1; min-height: 0;">
        <!-- Left Menu -->
        <div class="col-auto menu-container" style="width: 200px;">
          <q-list class="q-pa-md">
            <q-item
              v-for="tab in tabs"
              :key="tab.value"
              clickable
              :active="activeTab === tab.value"
              @click="activeTab = tab.value"
              active-class="menu-item-active"
            >
              <q-item-section>{{ tab.label }}</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Content Area -->
        <div class="col q-pa-md" style="overflow: auto;">
          <div class="content-container">
            <template v-if="activeTab === 'diagram'">
              <DiagramPreview :url="diagram.url" :previewUrl="diagram.preview_url" :name="diagram.name" @delete="showDeleteConfirm = true"/>
            </template>
            <template v-else-if="activeTab === 'elements'">
              <DiagramElements :elements="currentDiagram?.elements" :diagram-id="diagram.id" :project="project" @extract="handleExtractElements"/>
            </template>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <!-- Delete Confirmation Dialog -->
  <q-dialog v-model="showDeleteConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">{{ t('projects.diagrams.deleteTitle') }}</div>
      </q-card-section>

      <q-card-section>
        <p>{{ t('projects.diagrams.deleteConfirm', { name: diagram.name }) }}</p>
        <p class="text-negative text-caption">{{ t('common.actionCannotBeUndone') }}</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="t('common.cancel')" v-close-popup />
        <q-btn
          flat
          color="negative"
          :label="t('common.delete')"
          @click="handleDelete"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <DiagramNameDialog
    v-if="diagram"
    v-model="showNameEdit"
    :diagram="diagram"
    @submit="onNameSubmit"
  />

  <DiagramDescriptionDialog
    v-if="diagram"
    v-model="showDescriptionEdit"
    :diagram="diagram"
    @submit="onDescriptionSubmit"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../../stores/userStore'
import { useJobsStore } from '../../../stores/jobsStore'
import { useDiagramsStore } from '../../../stores/diagramsStore'
import { useQuasar } from 'quasar'
import DiagramNameDialog from './DiagramNameDialog.vue'
import DiagramDescriptionDialog from './DiagramDescriptionDialog.vue'
import DiagramHeader from './diagrams/DiagramHeader.vue'
import DiagramPreview from './diagrams/DiagramPreview.vue'
import DiagramElements from './diagrams/DiagramElements.vue'
import type { Diagram } from '../../../types'
  
const props = defineProps<{
  modelValue: boolean
  diagram: Diagram
  projectId: string
  project: Project
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'diagram-updated', diagram: Diagram): void
}>()

const { t } = useI18n()
const userStore = useUserStore()
const jobsStore = useJobsStore()
const diagramsStore = useDiagramsStore()
const $q = useQuasar()

const activeTab = ref('diagram')
const tabs = [
  { value: 'diagram', label: t('projects.diagrams.tabs.diagram') },
  { value: 'elements', label: t('projects.diagrams.tabs.io_list') }
]

const showNameEdit = ref(false)
const showDescriptionEdit = ref(false)
const showDeleteConfirm = ref(false)
const extracting = ref(false)
const loading = ref(false)

// Get the current diagram from the store to ensure reactivity
const currentDiagram = computed(() => {
  return diagramsStore.getDiagramById(props.projectId, props.diagram.id).value
})

// Watch for changes in the current diagram and emit updates
watch(currentDiagram, (newDiagram) => {
  if (newDiagram && newDiagram.id === props.diagram.id) {
    emit('diagram-updated', newDiagram)
  }
}, { deep: true })

const handleExtractElements = async () => {
  $q.loading.show({
    message: t('projects.diagrams.extractingMessage'),
    backgroundColor: 'primary',
    spinnerColor: 'white',
    spinnerSize: 80
  })
  extracting.value = true
  try {
    const newJob = await jobsStore.createJob({
      type: 'diagram_elements_extraction',
      status: 'pending',
      organization_id: props.project.organization_id,
      payload: {
        diagram_id: props.diagram.id,
        project_id: props.projectId
      }
    })
    
    // Add the new job to organizationJobs list
    jobsStore.organizationJobs.push(newJob)
    
    $q.notify({
      color: 'positive',
      message: t('projects.diagrams.extractStarted'),
      position: 'top'
    })
  } catch (error) {
    console.error('Failed to extract elements:', error)
    $q.notify({
      color: 'negative',
      message: t('projects.diagrams.extractStartFailed'),
      position: 'top'
    })
  } finally {
    extracting.value = false
    $q.loading.hide()
  }
}

const handleDelete = async () => {
  try {
    await diagramsStore.deleteDiagram(props.projectId, props.diagram.id)
    showDeleteConfirm.value = false
    emit('update:modelValue', false)
    $q.notify({
      color: 'positive',
      message: t('projects.diagrams.deleteSuccess'),
      position: 'top'
    })
  } catch (error) {
    console.error('Failed to delete diagram:', error)
    $q.notify({
      color: 'negative',
      message: t('projects.diagrams.deleteFailed'),
      position: 'top'
    })
  }
}

const isImageFile = (url: string | undefined): boolean => {
  if (!url) return false
  try {
    const pathname = new URL(url).pathname
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(pathname)
  } catch {
    return false
  }
}

const isPdfFile = (url: string | undefined): boolean => {
  if (!url) return false
  return url.toLowerCase().includes('.pdf')
}

const onNameSubmit = async (data: { name: string }) => {
  try {
    const updatedDiagram = await diagramsStore.updateDiagram(props.projectId, props.diagram.id, {
      ...props.diagram,
      name: data.name
    })
    emit('diagram-updated', updatedDiagram)
  } catch (error) {
    console.error('Failed to update name:', error)
    $q.notify({
      color: 'negative',
      message: t('projects.diagrams.updateNameFailed'),
      position: 'top'
    })
  }
}

const onDescriptionSubmit = async (data: { description: string }) => {
  try {
    const updatedDiagram = await diagramsStore.updateDiagram(props.projectId, props.diagram.id, {
      ...props.diagram,
      description: data.description
    })
    emit('diagram-updated', updatedDiagram)
  } catch (error) {
    console.error('Failed to update description:', error)
    $q.notify({
      color: 'negative',
      message: t('projects.diagrams.updateDescriptionFailed'),
      position: 'top'
    })
  }
}

const openInNewTab = (url?: string) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.menu-container {
  width: 200px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
  overflow-y: auto;
}

.body--dark .menu-container {
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.02);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.body--dark .content-container {
  background: #1d1d1d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.menu-item-active {
  color: var(--q-secondary) !important;
  background: rgba(38, 166, 154, 0.1) !important;
  font-weight: 500;
  border-radius: 8px;
}

.body--dark .menu-item-active {
  background: rgba(38, 166, 154, 0.15) !important;
}

.q-item {
  border-radius: 8px;
  margin: 4px 0;
  padding: 12px 16px;
  min-height: 48px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.q-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--q-secondary);
}

.body--dark .q-item:hover {
  background: rgba(255, 255, 255, 0.07);
}
</style>