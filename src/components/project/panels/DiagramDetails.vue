<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    maximized
    persistent
  >
    <q-card class="column overflow-hidden-y" style="max-height: 100vh;">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <!-- Preview Area -->
            <template v-if="diagram.url && isImageFile(diagram.url)">
              <a :href="diagram.url" target="_blank" rel="noopener noreferrer">
                <img 
                  :src="diagram.url" 
                  :alt="diagram.name"
                  class="diagram-preview cursor-pointer"
                />
              </a>
            </template>
            <template v-else-if="diagram.url && isPdfFile(diagram.url)">
              <a :href="diagram.url" target="_blank" rel="noopener noreferrer">
                <embed
                  :src="diagram.url"
                  type="application/pdf"
                  width="100%"
                  height="675px"
                />
              </a>
            </template>
            <template v-else>
              <div class="empty-preview">
                <FileText class="preview-icon text-grey-5" />
                <div class="text-caption text-grey-7 q-mt-sm">
                  {{ $t('projects.diagrams.noPreview') }}
                </div>
              </div>
            </template>
            <div class="text-caption row justify-between">
              <div>{{ $t('projects.diagrams.added') }} {{ formatTime(diagram.created_at) }}</div>
              <div>{{ $t('projects.diagrams.lastModified') }} {{ formatTime(diagram.updated_at) }}</div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="row items-center justify-between">
              <div class="text-h6 cursor-pointer" @click="showNameEdit = true">{{ diagram.name }}</div>
              <q-btn
                flat
                round
                dense
                color="negative"
                icon="delete"
                @click="showDeleteConfirm = true"
              >
                <q-tooltip>{{ $t('common.delete') }}</q-tooltip>
              </q-btn>
            </div>
            <div class="cursor-pointer text-grey" @click="showDescriptionEdit = true">
              {{ diagram.description || $t('projects.diagrams.addDescription') }}
            </div>
            
            <!-- Extract Elements Button -->
            <div class="q-mt-md">
              <q-btn
                color="primary"
                icon="code"
                :label="'Extract elements'"
                @click="handleExtractElements"
                :loading="extracting"
              />
            </div>
            
            <!-- Elements List -->
            <div v-if="diagram.elements?.length" class="q-mt-lg">
              <div class="text-subtitle2 q-mb-sm">Elements</div>
              <q-list bordered separator>
                <q-item v-for="element in diagram.elements" :key="element.identifier_text">
                  <q-item-section>
                    <q-item-label>{{ element.identifier_text }}</q-item-label>
                    <q-item-label caption>
                      <div class="row items-center q-gutter-x-sm">
                        <q-chip
                          dense
                          size="sm"
                          :color="element.type_category ? 'primary' : 'grey'"
                          text-color="white"
                        >
                          {{ element.type_category || 'No Category' }}
                        </q-chip>
                        <q-chip
                          dense
                          size="sm"
                          :color="element.type ? 'secondary' : 'grey'"
                          text-color="white"
                        >
                          {{ element.type || 'No Type' }}
                        </q-chip>
                        <q-chip
                          v-if="element.contains_text"
                          dense
                          size="sm"
                          color="accent"
                          text-color="white"
                        >
                          Contains Text
                        </q-chip>
                      </div>
                      <div class="q-mt-xs text-grey-8">{{ element.element_desc }}</div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Delete Confirmation Dialog -->
  <q-dialog v-model="showDeleteConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('projects.diagrams.deleteTitle') }}</div>
      </q-card-section>

      <q-card-section>
        <p>{{ $t('projects.diagrams.deleteConfirm', { name: diagram.name }) }}</p>
        <p class="text-negative text-caption">{{ $t('common.actionCannotBeUndone') }}</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('common.cancel')" v-close-popup />
        <q-btn
          flat
          color="negative"
          :label="$t('common.delete')"
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
import { ref } from 'vue'
import { FileText } from 'lucide-vue-next'
import { useTimeFormatter } from '../../../utils/formatTime'
import { useUserStore } from '../../../stores/userStore'
import { useDiagramsStore } from '../../../stores/diagramsStore'
import { useQuasar } from 'quasar'
import DiagramNameDialog from './DiagramNameDialog.vue'
import DiagramDescriptionDialog from './DiagramDescriptionDialog.vue'
import type { Diagram } from '../../../types'
  
const props = defineProps<{
  modelValue: boolean
  diagram: Diagram
  projectId: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'diagram-updated', diagram: Diagram): void
}>()

const { formatTime } = useTimeFormatter()
const userStore = useUserStore()
const diagramsStore = useDiagramsStore()
const $q = useQuasar()

const showNameEdit = ref(false)
const showDescriptionEdit = ref(false)
const showDeleteConfirm = ref(false)
const extracting = ref(false)
const loading = ref(false)

const handleExtractElements = async () => {
  extracting.value = true
  try {
    // TODO: Implement element extraction
    await new Promise(resolve => setTimeout(resolve, 1000))
    $q.notify({
      color: 'positive',
      message: 'Elements extracted successfully',
      position: 'top'
    })
  } catch (error) {
    console.error('Failed to extract elements:', error)
    $q.notify({
      color: 'negative',
      message: 'Failed to extract elements',
      position: 'top'
    })
  } finally {
    extracting.value = false
  }
}
const handleDelete = async () => {
  try {
    await diagramsStore.deleteDiagram(props.projectId, props.diagram.id)
    showDeleteConfirm.value = false
    emit('update:modelValue', false)
    $q.notify({
      color: 'positive',
      message: $t('projects.diagrams.deleteSuccess'),
      position: 'top'
    })
  } catch (error) {
    console.error('Failed to delete diagram:', error)
    $q.notify({
      color: 'negative',
      message: $t('projects.diagrams.deleteFailed'),
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
      message: 'Failed to update diagram name',
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
      message: 'Failed to update diagram description',
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
.diagram-preview {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.diagram-preview:hover {
  transform: scale(1.02);
}

.pdf-preview {
  padding: 2rem;
}

.canvas-container {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.canvas-container:hover {
  transform: scale(1.02);
}

.canvas-container:hover::after {
  content: 'Click to open PDF';
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
}

.canvas-container canvas {
  max-width: 100%;
  height: auto !important;
}

.empty-preview {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
}

.body--dark .empty-preview {
  background: rgba(255, 255, 255, 0.05);
}

.preview-icon {
  width: 48px;
  height: 48px;
}

.pdf-icon {
  width: 96px;
  height: 96px;
}

.preview-area {
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: auto;
  background: rgba(0, 0, 0, 0.03);
  transition: background-color 0.2s ease;
  display: flex;
}
</style>