<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('profile.editName') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.first_name"
                :label="$t('users.firstName')"
                outlined
                :rules="[val => !!val || $t('users.firstNameRequired')]"
                :disable="loading"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.last_name"
                :label="$t('users.lastName')"
                outlined
                :rules="[val => !!val || $t('users.lastNameRequired')]"
                :disable="loading"
              />
            </div>
          </div>

          <div v-if="error" class="text-negative q-mt-sm">
            {{ error }}
          </div>
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
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../stores/userStore'
import api from '../../lib/axios'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'name-updated'): void
}>()

const { t } = useI18n()
const userStore = useUserStore()

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const loading = ref(false)
const error = ref<string | null>(null)
const form = ref({
  first_name: '',
  last_name: ''
})

// Initialize form with current user data
watch(() => props.modelValue, (newVal) => {
  if (newVal && userStore.currentUser) {
    form.value = {
      first_name: userStore.currentUser.first_name || '',
      last_name: userStore.currentUser.last_name || ''
    }
  }
}, { immediate: true })

const onSubmit = async () => {
  if (!userStore.currentUser) return
  
  loading.value = true
  error.value = null

  try {
    // Update user in the API
    await api.put(`/users/${userStore.currentUser.id}`, {
      first_name: form.value.first_name,
      last_name: form.value.last_name
    })
    
    // Update local user store
    if (userStore.currentUser) {
      userStore.currentUser.first_name = form.value.first_name
      userStore.currentUser.last_name = form.value.last_name
    }
    
    dialogOpen.value = false
    emit('name-updated')
  } catch (e) {
    error.value = e instanceof Error ? e.message : t('users.failedToUpdateUser')
  } finally {
    loading.value = false
  }
}
</script>