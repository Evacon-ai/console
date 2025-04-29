<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="form.apiKey"
            :label="label"
            outlined
            :type="showKey ? 'text' : 'password'"
            :rules="[val => !!val || 'API key is required']"
          >
            <template v-slot:append>
              <q-icon
                :name="showKey ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showKey = !showKey"
              />
            </template>
          </q-input>

          <div class="text-caption text-grey-7 q-mt-sm">
            {{ description }}
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
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  label: string
  description: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: { apiKey: string }): void
}>()

const loading = ref(false)
const showKey = ref(false)
const form = ref({
  apiKey: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const onSubmit = async () => {
  loading.value = true
  try {
    emit('submit', { apiKey: form.value.apiKey })
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>