```vue
<template>
  <div>
    <div class="diagram-preview-container">
      <template v-if="url && isImageFile(url)">
        <a :href="url" target="_blank" rel="noopener noreferrer">
          <img 
            :src="url" 
            :alt="name"
            class="diagram-preview cursor-pointer"
          />
        </a>
      </template>
      <template v-else-if="url && isPdfFile(url)">
        <a :href="url" target="_blank" rel="noopener noreferrer">
          <embed
            :src="url"
            type="application/pdf"
            width="100%"
            height="475px"
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
            <q-btn
          flat
          color="negative"
          icon="delete"
          :label="$t('common.delete')"
          @click="$emit('delete')"
        />
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
.diagram-preview-container {
  width: 100%;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.02);
  padding: 16px;
}

.body--dark .diagram-preview-container {
  background: rgba(255, 255, 255, 0.02);
}

.diagram-preview {
  width: auto;
  height: 475px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
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
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
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