<template>
  <div class="diagram-elements">
    <div v-if="elements?.length" class="q-mt-md">
      <div class="text-subtitle2 q-mb-sm">{{ $t('projects.diagrams.elements') }}</div>
      <q-list bordered separator>
        <q-item v-for="element in elements" :key="element.identifier_text">
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
                  {{ element.type_category || $t('projects.diagrams.noCategory') }}
                </q-chip>
                <q-chip
                  dense
                  size="sm"
                  :color="element.type ? 'secondary' : 'grey'"
                  text-color="white"
                >
                  {{ element.type || $t('projects.diagrams.noType') }}
                </q-chip>
                <q-chip
                  v-if="element.contains_text"
                  dense
                  size="sm"
                  color="accent"
                  text-color="white"
                >
                  {{ $t('projects.diagrams.containsText') }}
                </q-chip>
              </div>
              <div class="q-mt-xs text-grey-8">{{ element.element_desc }}</div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else class="column column items-center justify-center">
      <div class="text-grey text-center q-pa-md">
        {{ $t('projects.diagrams.noElements') }}
      </div>
      <div class="q-pb-md">
        <q-btn
          color="primary"
          icon="code"
          :label="$t('projects.diagrams.extractElements')"
          @click="$emit('extract')"
          :loading="extracting"
        />
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  elements?: Array<{
    type_category: string
    type: string
    element_desc: string
    identifier_text: string
    contains_text: boolean
  }>
}>()

const emit = defineEmits<{
  (e: 'extract'): void
}>()
</script>

<style scoped>
.diagram-elements {
  max-width: 800px;
  margin: 0 auto;
}

:deep(.q-item) {
  padding: 16px;
}

:deep(.q-item__label--caption) {
  margin-top: 8px;
}
</style>