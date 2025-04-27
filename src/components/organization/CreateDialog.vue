<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('organizations.addNew') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="form.name"
            :label="$t('organizations.name')"
            outlined
            :rules="[val => !!val || $t('organizations.nameRequired')]"
            :loading="loading"
            :disable="loading"
            autofocus
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../stores/userStore'
import { useOrganizationsStore } from '../../stores/organizationsStore'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'organization-created', id: string): void
}>()

const { t } = useI18n()
const userStore = useUserStore()
const organizationsStore = useOrganizationsStore()

const loading = ref(false)
const form = ref({
  name: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const onSubmit = async () => {
  loading.value = true
  try {
    const newOrg = await organizationsStore.createOrganization({
      name: form.value.name,
      logo_url: '',
      address: {
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'United States'
      },
      account_status: 'active',
      website: '',
      time_zone: 'America/New_York',
      notes: '',
      contact: {
        name: '',
        email: '',
        phone: ''
      },
      created_by: userStore.currentUser?.id || '',
      updated_by: userStore.currentUser?.id || ''
    })
    
    dialogOpen.value = false
    emit('organization-created', newOrg.id)
  } catch (error) {
    console.error('Failed to create organization:', error)
  } finally {
    loading.value = false
  }
}
</script>