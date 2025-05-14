```vue
<template>
  <div class="preview-wrapper">
    <q-btn
      flat
      color="negative"
      icon="delete"
      :label="$t('common.delete')"
      @click="$emit('delete')"
      class="delete-btn"
    />
    <div class="diagram-preview-container q-mt-md">
      <template v-if="url && isImageFile(url)">
        <a :href="url" target="_blank" rel="noopener noreferrer">
          <img 
            :src="url" 
            :alt="name"
            class="diagram-preview"
          />
        </a>
      </template>
      <template v-else-if="url && isPdfFile(url)">
        <a :href="url" target="_blank" rel="noopener noreferrer">
          <img 
            :src="previewUrl" 
            :alt="name"
            class="diagram-preview"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText } from 'lucide-vue-next'

const props = defineProps<{
  url?: string
  name: string
}>()

const emit = defineEmits<{
  (e: 'delete'): void
}>()
  
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
</script>

<style scoped>
.preview-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.diagram-preview-container {
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  justify-content: center;
}

.body--dark .diagram-preview-container {
  background: rgba(255, 255, 255, 0.02);
}

.diagram-preview {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;
}

.diagram-preview:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.body--dark .diagram-preview {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.body--dark .diagram-preview:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
}

.empty-preview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.body--dark .empty-preview {
  background: rgba(255, 255, 255, 0.03);
}

.preview-icon {
  width: 48px;
  height: 48px;
}
</style>
```