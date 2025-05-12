<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('projects.status.edit') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div v-for="status in statusOptions" :key="status.value" class="col-12">
              <q-btn
                :color="getStatusColor(status.value)"
                class="full-width q-py-sm"
                :label="status.label"
                @click="selectStatus(status.value)"
                :outline="form.status !== status.value"
              />
            </div>
          </div>
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
  (e: 'submit', data: { status: string }): void
}>()

const loading = ref(false)
const form = ref({
  status: ''
})

const selectStatus = (status: string) => {
  form.value.status = status
}

const statusOptions = [
  { label: 'ACTIVE', value: 'active' },
  { label: 'COMPLETED', value: 'completed' },
  { label: 'ON HOLD', value: 'on_hold' },
  { label: 'CANCELED', value: 'canceled' }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'light-blue'
    case 'completed': return 'teal'
    case 'on_hold': return 'warning'
    case 'canceled': return 'negative'
    default: return 'grey'
  }
}

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.project) {
    form.value = {
      status: props.project.status
    }
  }
})

const onSubmit = async () => {
  loading.value = true
  try {
    emit('submit', { status: form.value.status })
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>