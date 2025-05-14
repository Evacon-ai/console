<template>
  <div class="row no-wrap">
    <div class="diagram-preview-container">
      <template v-if="url && isImageFile(url)">
        <a :href="url" target="_blank" rel="noopener noreferrer">
          <img :src="url" :alt="name" class="diagram-preview" />
        </a>
      </template>
      <template v-else-if="url && isPdfFile(url)">
        <a :href="url" target="_blank" rel="noopener noreferrer">
          <img :src="previewUrl" :alt="name" class="diagram-preview" />
        </a>
      </template>
      <template v-else>
        <div class="empty-preview">
          <FileText class="preview-icon text-grey-5" />
          <div class="text-caption text-grey-7 q-mt-sm">
            {{ $t("projects.diagrams.noPreview") }}
          </div>
        </div>
      </template>
    </div>
    <div class="q-ml-md delete-button-container">
      <q-btn
        flat
        color="negative"
        icon="delete"
        :label="$t('common.delete')"
        @click="$emit('delete')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText } from "lucide-vue-next";

const props = defineProps<{
  url?: string;
  name: string;
}>();

const emit = defineEmits<{
  (e: "delete"): void;
}>();

const isImageFile = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    const pathname = new URL(url).pathname;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(pathname);
  } catch {
    return false;
  }
};

const isPdfFile = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.toLowerCase().includes(".pdf");
};
</script>

<style scoped>
.diagram-preview-container {
  flex-grow: 1;
  overflow: auto; /* allow scrolling if needed */
  background: rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: flex-start; /* align top */
  justify-content: flex-start; /* align left */
  padding: 12px;
}

.body--dark .diagram-preview-container {
  background: rgba(255, 255, 255, 0.02);
}

.diagram-preview {
  max-width: 100%;
  height: auto; /* prevent vertical stretching */
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

.delete-button-container {
  flex-shrink: 0; /* prevent shrinking */
}
</style>
