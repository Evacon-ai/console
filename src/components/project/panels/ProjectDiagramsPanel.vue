<template>
  <div class="project-diagrams">
    <div class="text-subtitle1 text-weight-medium q-mb-lg">{{ $t('projects.diagrams.title') }}</div>

    <template v-if="diagramsStore.getDiagramsByProjectId(project.id).value.length">
      <div class="row q-col-gutter-md">
        <div v-for="diagram in diagramsStore.getDiagramsByProjectId(project.id).value" :key="diagram.id" class="col-12 col-sm-6 col-md-4">
          <q-card flat bordered class="diagram-card">
            <q-card-section>
              <!-- Preview Area -->
              <div class="preview-area" @click="handleDiagramClick(diagram)">
                <template v-if="diagram.url">
                  <img 
                    :src="diagram.url" 
                    :alt="diagram.name"
                    class="diagram-preview"
                  />
                </template>
                <template v-else>
                  <div class="empty-preview">
                    <FileText class="preview-icon text-grey-5" />
                  </div>
                </template>
              </div>

              <!-- Title & Actions -->
              <div class="row items-center justify-between q-mt-md">
                <div class="text-h6">{{ diagram.name }}</div>
              </div>

              <!-- Description -->
              <div class="text-grey-7 q-mt-sm">{{ diagram.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>

    <template v-else>
      <q-card flat bordered class="text-center q-pa-lg">
        <Upload class="text-grey-5 q-mb-md" style="width: 64px; height: 64px;" />
        <div class="text-h6">{{ $t('projects.diagrams.noFile') }}</div>
        <div class="text-grey-7 q-mt-sm">{{ $t('projects.diagrams.uploadHint') }}</div>
      </q-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { FileText, Upload } from 'lucide-vue-next'
import { useQuasar } from 'quasar'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useDiagramsStore } from '../../../stores/diagramsStore'
import type { Project } from '../../../types'

const props = defineProps<{
  project: Project
}>()

const diagramsStore = useDiagramsStore()
const $q = useQuasar()

onMounted(async () => {
  try {
    await diagramsStore.fetchProjectDiagrams(props.project.id)
  } catch (error) {
    console.error('Failed to fetch diagrams:', error)
  }
})

const uploadDiagram = async (projectId: string, diagramId: string, file: File): Promise<string> => {
  const storage = getStorage()
  const path = `organizations/public/${props.project.organization_id}/projects/${projectId}/diagrams/${diagramId}/${file.name}`
  const fileRef = storageRef(storage, path)
  
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}

const handleDiagramClick = (diagram: { url?: string; id: string }) => {
  if (diagram.url) {
    window.open(diagram.url, '_blank')
  } else {
    // Safely access dialog with optional chaining
    $q?.dialog({
      title: 'Upload Diagram',
      message: 'Choose a file to upload',
      prompt: {
        model: null,
        type: 'file',
        accept: 'image/*,.pdf'
      },
      cancel: true,
      persistent: true
    })?.onOk(async (data: any) => {

      
      if (!data || data.length === 0) {
        $q?.notify({
          type: 'negative',
          message: 'No file selected'
        })
        return
      } 
      const file = data[0]
      console.log(file)

      $q?.loading.show()
      try {
        // Upload file to Firebase Storage
        const url = await uploadDiagram(props.project.id, diagram.id, file)
        
        // Update the diagram with the real URL
        await diagramsStore.updateDiagram(props.project.id, diagram.id, {
          ...diagram,
          url
        })
        
        $q?.notify({
          type: 'positive',
          message: 'File uploaded successfully'
        })
      } catch (error) {
        console.error('Upload failed:', error)
        $q?.notify({
          type: 'negative',
          message: 'Failed to upload file'
        })
      } finally {
        $q.loading.hide()
      }
    })
  }
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
  align-items: center;
  justify-content: center;
}

.preview-icon {
  width: 48px;
  height: 48px;
}

@media (max-width: 599px) {
  .preview-icon {
    width: 32px;
    height: 32px;
  }
}
</style>