<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('organizations.users.edit.title') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="row items-center q-mb-md">
            <q-avatar size="32px">
              <img :src="getUserAvatar" :alt="getUserFullName">
            </q-avatar>
            <div class="q-ml-sm">
              <div>{{ getUserFullName }}</div>
              <div class="text-caption text-grey-7">{{ user?.email }}</div>
            </div>
          </div>

          <q-select
            v-model="form.role"
            :options="roleOptions"
            :label="$t('organizations.users.edit.role')"
            outlined
            emit-value
            map-options
            :rules="[val => !!val || $t('organizations.users.edit.roleRequired')]"
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
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: boolean
  user: any | null
}>()

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: { role: string }): void
}>()

const loading = ref(false)
const form = ref({
  role: ''
})

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const roleOptions = [
  { label: t('organizations.users.roles.administrator'), value: 'admin' },
  { label: t('organizations.users.roles.user'), value: 'user' }
]

const getUserFullName = computed(() => {
  if (!props.user) return ''
  return `${props.user.first_name} ${props.user.last_name}`.trim()
})

const getUserAvatar = computed(() => {
  const name = getUserFullName.value
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=32&background=0D8ABC&color=fff`
})

// Set initial role when dialog opens
watch(() => props.modelValue, (newVal) => {
  if (newVal && props.user) {
    form.value.role = props.user.role
  }
})

const onSubmit = async () => {
  loading.value = true
  try {
    emit('submit', { role: form.value.role })
    dialogOpen.value = false
  } finally {
    loading.value = false
  }
}
</script>