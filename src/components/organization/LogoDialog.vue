<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">Update Organization Logo</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div 
            class="upload-zone q-pa-md text-center"
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
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            
            <template v-if="selectedFile">
              <img 
                :src="previewUrl" 
                class="preview-image q-mb-md"
                alt="Logo preview"
              />
              <div class="text-caption">{{ selectedFile.name }}</div>
            </template>
            <template v-else>
              <Upload class="q-mb-sm upload-icon" />
              <div>Drop your logo here or click to select</div>
              <div class="text-caption text-grey">Supported formats: PNG, JPG, GIF</div>
            </template>
          </div>

          <div v-if="error" class="text-negative text-caption q-mt-sm">
            {{ error }}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn 
            type="submit" 
            color="primary" 
            label="Save" 
            :loading="loading"
            :disable="!selectedFile"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Upload } from 'lucide-vue-next'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import type { Organization } from '../../types'

const props = defineProps<{
  modelValue: boolean
  organization: Organization | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: { logo_url: string }): void
}>()

const loading = ref(false)
const error = ref('')
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const validateFile = (file: File) => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please select a valid image file (PNG, JPG, or GIF)')
  }

  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB')
  }
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  try {
    const file = input.files[0]
    validateFile(file)
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    error.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load file'
    selectedFile.value = null
    previewUrl.value = ''
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (!files?.length) return

  try {
    const file = files[0]
    validateFile(file)
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    error.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load file'
    selectedFile.value = null
    previewUrl.value = ''
  }
}

const uploadLogo = async (file: File): Promise<string> => {
  if (!props.organization) throw new Error('No organization selected')

  const storage = getStorage()
  const logoRef = storageRef(storage, `organizations/public/${props.organization.id}/logo`)

  
  await uploadBytes(logoRef, file)
  return getDownloadURL(logoRef)
}

const onSubmit = async () => {
  if (!selectedFile.value) return

  loading.value = true
  error.value = ''

  try {
    const logoUrl = await uploadLogo(selectedFile.value)
    emit('submit', { logo_url: logoUrl })
    dialogOpen.value = false
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to upload logo'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.upload-zone {
  border: 2px dashed var(--q-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
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
  width: 48px;
  height: 48px;
  color: var(--q-primary);
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 4px;
}

.hidden {
  display: none;
}
</style>