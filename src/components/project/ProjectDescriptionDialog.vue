<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('projects.description.edit') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="form.description"
            type="textarea"
            :label="$t('projects.description.description')"
            outlined
            autogrow
            :rules="[val => !!val || $t('projects.description.required')]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" v-close-popup />
          <q-btn type="submit" color="primary" :label="$t('common.save')" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Project } from '../../types'

const props = defineProps<{
  modelValue: boolean
  project: Project | null
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
  if (newVal && props.project) {
    form.value = {
      description: props.project.description
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