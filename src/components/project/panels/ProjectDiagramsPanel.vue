<template>
  <div class="project-diagrams">
    <div class="text-subtitle1 text-weight-medium q-mb-lg">{{ $t('projects.diagrams.title') }}</div>

    <template v-if="diagramsStore.getDiagramsByProjectId(project.id).value.length"> 
      <div class="row q-col-gutter-md row full-height">
        <div class="col-12 col-sm-6 col-md-4 row">  
          <q-card 
              flat 
              bordered 
              class="col self-stretch text-center q-pa-lg upload-zone"
              :class="{ 'drag-over': isDragging }"
              @dragenter.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @dragover.prevent
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <input
                type="file"
                ref="fileInput"
                accept="image/*,.pdf"
                class="hidden"
                @change="handleFileSelect"
              />
              <Upload class="text-grey-5 q-mb-md upload-icon" />
              <div class="text-grey-7 q-mt-sm">{{ $t('projects.diagrams.uploadHint') }}</div>
            </q-card>
          </div>
        <div v-for="diagram in diagramsStore.getDiagramsByProjectId(project.id).value" :key="diagram.id" class="col-12 col-sm-6 col-md-4">          
          <q-card flat bordered class="diagram-card"  @click="handleDiagramClick(diagram)">
            <q-card-section>
              <!-- Preview Area -->
              <div class="preview-area">
                <template v-if="diagram.url && isImageFile(diagram.url)">
                  <img 
                    :src="diagram.url" 
                    :alt="diagram.name"
                    class="diagram-preview"
                  />
                </template>
                <template v-else-if="diagram.url && isPdfFile(diagram.url)">
                  <div>
                    <!--<FilePdf class="pdf-icon" />
                    <div class="text-caption q-mt-sm">
                      {{ $t('projects.diagrams.pdfDocument') }}
                    </div>-->
                    <embed
                      :src="diagram.url"
                      type="application/pdf"
                      class="diagram-preview"
                    />
                  </div>
                </template>
                <template v-else>
                  <div class="empty-preview">
                    <FileText class="preview-icon text-grey-5" />
                    <div class="text-caption text-grey-7 q-mt-sm">
                      {{ $t('projects.diagrams.noPreview') }}
                    </div>
                  </div>
                </template>
              </div>

              <!-- Title -->
              <div class="row items-center justify-between q-mt-md">
                <div class="text-h6">{{ diagram.name }}</div>
              </div>

              <!-- Description -->
              <div class="text-grey-7 q-mt-sm">{{ diagram.description }}</div>
              
              <!-- Added Time -->
              <div class="text-caption text-grey-7 q-mt-sm">
                {{ $t('projects.generated', { time: formatTime(diagram.created_at) }) }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>

    <template v-else>
      <q-card 
        flat 
        bordered 
        class="text-center q-pa-lg upload-zone"
        :class="{ 'drag-over': isDragging }"
        @dragenter.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <input
          type="file"
          ref="fileInput"
          accept="image/*,.pdf"
          class="hidden"
          @change="handleFileSelect"
        />
        <Upload class="text-grey-5 q-mb-md upload-icon" />
        <div class="text-h6">{{ $t('projects.diagrams.noFile') }}</div>
        <div class="text-grey-7 q-mt-sm">{{ $t('projects.diagrams.uploadHint') }}</div>
      </q-card>
    </template>

    <DiagramDetails
      v-if="selectedDiagram"
      v-model="showDetails"
      :diagram="selectedDiagram"
      :project-id="project.id"
      @diagram-updated="onDiagramUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FileText, Upload, File as FilePdf } from 'lucide-vue-next'
import { useQuasar } from 'quasar'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useTimeFormatter } from '../../../utils/formatTime'
import { useDiagramsStore } from '../../../stores/diagramsStore'
import DiagramDetails from './DiagramDetails.vue'
import type { Project, Diagram } from '../../../types'

const props = defineProps<{
  project: Project
}>()

const { formatTime } = useTimeFormatter()
const diagramsStore = useDiagramsStore()
const $q = useQuasar()
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const selectedDiagram = ref<Diagram | null>(null)
const showDetails = ref(false)

onMounted(async () => {
  try {
    await diagramsStore.fetchProjectDiagrams(props.project.id)
  } catch (error) {
    console.error('Failed to fetch diagrams:', error)
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
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
  return url.toLowerCase().includes('.pdf');
}

const uploadDiagram = async (projectId: string, diagramId: string, file: File): Promise<string> => {
  const storage = getStorage()
  const path = `organizations/public/${props.project.organization_id}/projects/${projectId}/diagrams/${diagramId}/${file.name}`
  const fileRef = storageRef(storage, path)
  
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}

const handleFileUpload = async (file: File) => {
  if (!file) {
    $q.notify({
      color: 'negative',
      message: 'No file selected',
      position: 'top'
    })
    return
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  if (!allowedTypes.includes(file.type)) {
    $q.notify({
      color: 'negative',
      message: 'Invalid file type. Please upload an image or PDF.',
      position: 'top'
    })
    return
  }

  // Validate file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    $q.notify({
      color: 'negative',
      message: 'File size must be less than 5MB',
      position: 'top'
    })
    return
  }

  $q.loading.show()
  try {
    // Parse file name to extract meaningful information
    const parsedInfo = diagramsStore.parseDiagramFileName(file.name)
    
    // Create a new diagram entry
    const newDiagram = await diagramsStore.createDiagram(props.project.id, {
      name: parsedInfo.name,
      description: parsedInfo.description,
      url: ''
    })

    // Upload file to Firebase Storage
    const url = await uploadDiagram(props.project.id, newDiagram.id, file)
    
    // Update the diagram with the real URL
    await diagramsStore.updateDiagram(props.project.id, newDiagram.id, {
      ...newDiagram,
      url
    })
    
    // Refresh the diagrams list
    await diagramsStore.fetchProjectDiagrams(props.project.id)
    
    $q.notify({
      color: 'positive',
      message: 'File uploaded successfully',
      position: 'top'
    })
  } catch (error) {
    console.error('Upload failed:', error)
    $q.notify({
      color: 'negative',
      message: 'Failed to upload file',
      position: 'top'
    })
  } finally {
    $q.loading.hide()
  }
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  handleFileUpload(input.files[0])
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (!files?.length) return
  handleFileUpload(files[0])
}

const handleDiagramClick = (diagram: Diagram) => {
  selectedDiagram.value = diagram
  showDetails.value = true
}

const downloadDiagram = (diagram: Diagram) => {
  if (diagram.url) {
    // Create a temporary anchor element
    const a = document.createElement('a')
    a.href = diagram.url
    a.download = diagram.name || 'diagram'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

const onDiagramUpdated = (diagram: Diagram) => {
  selectedDiagram.value = diagram
}
</script>

<style scoped>
.project-diagrams {
  width: 100%;
}

.diagram-card {
  height: 100%;
  transition: all 0.2s ease;
  cursor: pointer;
}

.diagram-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.body--dark .diagram-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.preview-area {
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.03);
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body--dark .preview-area {
  background: rgba(255, 255, 255, 0.05);
}

.preview-area:hover {
  background: rgba(0, 0, 0, 0.05);
}

.body--dark .preview-area:hover {
  background: rgba(255, 255, 255, 0.08);
}

.diagram-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.empty-preview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pdf-preview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
}

.pdf-icon {
  width: 64px;
  height: 64px;
  color: #f44336; /* Red color for PDF icon */
}

.preview-icon {
  width: 48px;
  height: 48px;
}

.upload-zone {
  cursor: pointer;
  border: 2px dashed var(--q-primary);
  border-radius: 8px;
  transition: all 0.2s ease;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-zone:hover {
  background: rgba(0, 0, 0, 0.02);
}

.body--dark .upload-zone:hover {
  background: rgba(255, 255, 255, 0.05);
}

.drag-over {
  background: rgba(0, 0, 0, 0.05);
  border-color: var(--q-secondary);
}

.body--dark .drag-over {
  background: rgba(255, 255, 255, 0.08);
}

.upload-icon {
  width: 64px;
  height: 64px;
}

.hidden {
  display: none;
}

@media (max-width: 599px) {
  .preview-icon, .pdf-icon {
    width: 32px;
    height: 32px;
  }
  
  .upload-icon {
    width: 48px;
    height: 48px;
  }
}
</style>