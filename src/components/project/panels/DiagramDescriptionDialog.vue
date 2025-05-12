<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('projects.diagrams.editDescription') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="form.description"
            type="textarea"
            :label="$t('projects.diagrams.description')"
            outlined
            autogrow
            :loading="loading"
            :disable="loading"
            autofocus
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" v-close-popup :disable="loading" />
          <q-btn type="submit" color="primary" :label="$t('common.save')" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Diagram } from '../../../types'

const props = defineProps<{
  modelValue: boolean
  diagram: Diagram
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: { description: string }): void
}>()

const loading = ref(false)
const form = ref({
  description: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.diagram) {
    form.value = {
      description: props.diagram.description || ''
    }
  }
})

const onSubmit = async () => {
  loading.value = true
  try {
    emit('submit', { description: form.value.description })
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>