<template>
  <div class="diagram-header q-pa-md">
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-h6 cursor-pointer" @click="$emit('edit-name')">{{ diagram.name }}</div>
      <div>        
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
        /> 
      </div>
    </div>
    <div class="row items-center justify-between q-mb-sm">
      <div class="cursor-pointer text-grey q-mb-md" @click="$emit('edit-description')">    
        {{ diagram.description || $t('projects.diagrams.addDescription') }}
      </div>
      <div class="text-grey-7"> 
        {{ $t('projects.diagrams.added') }} {{ formatTime(diagram.created_at) }}
        <template v-if="diagram.updated_at !== diagram.created_at">
          • {{ $t('projects.diagrams.lastModified') }} {{ formatTime(diagram.updated_at) }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeFormatter } from '../../../../utils/formatTime'
import type { Diagram } from '../../../../types'

const props = defineProps<{
  diagram: Diagram
  extracting: boolean
}>()

const emit = defineEmits<{
  (e: 'edit-name'): void
  (e: 'edit-description'): void
}>()

const { formatTime } = useTimeFormatter()
</script>

<style scoped>
.diagram-header {
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background: linear-gradient(to right, rgba(0, 0, 0, 0.02), transparent);
}

.body--dark .diagram-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(to right, rgba(255, 255, 255, 0.03), transparent);
}
</style>
