<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">{{ $t('jobs.title') }}</div>
    <q-table
      v-model:selected="selectedJobs"
      :rows="jobsWithUsers"
      :columns="[
          {
            name: 'id',
            label: $t('jobs.id'),
            field: 'id',
            sortable: true,
            align: 'left'
          },
          {
            name: 'created_at',
            label: $t('jobs.createdAt'),
            field: 'created_at',
            format: val => formatTime(val),
            sortable: true,
            align: 'left'
          },
          {
            name: 'created_by',
            label: $t('jobs.createdBy'),
            field: 'created_by',
            sortable: true,
            align: 'left'
          },
          {
            name: 'type',
            label: $t('jobs.type'),
            field: 'type',
            sortable: true,
            align: 'left'
          },
          {
            name: 'status',
            label: $t('jobs.status.label'),
            field: 'status',
            sortable: true,
            align: 'left'
          }
        ]"
      row-key="id"
      :loading="jobsStore.loading"
      :no-data-label="$t('jobs.noJobsFound')"
      :rows-per-page-label="$t('common.table.rowsPerPage')"
      :records-per-page-label="$t('common.table.recordsPerPage')"
      :no-results-label="$t('common.table.noResults')"
      :loading-label="$t('common.table.loading')"
      :selected-records-label="$t('common.table.selectedRecords')"
    >
      <template #body-cell-created_by="props">
        <q-td :props="props">
          <div class="row items-center">
            <template v-if="getUserById(props.row.created_by)">
              <q-avatar size="28px" color="secondary" text-color="white">
                {{ getInitials(props.row.created_by) }}
              </q-avatar>
              <span class="q-ml-sm">{{ getFullName(props.row.created_by) || $t('jobs.unknownUser') }}</span>
            </template>
            <template v-else>
              <span>{{ $t('jobs.unknownUser') }}</span>
            </template>
          </div>
        </q-td>
      </template>
      <template #body-cell-status="props">
        <q-td :props="props">
          <div class="row items-center">
            <q-badge :color="getStatusColor(props.value)" :label="$t(`jobs.status.${props.value}`)" />
            <q-spinner-dots
              v-if="props.value === 'pending'"
              color="warning"
              size="1em"
              class="q-ml-sm"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUsersStore } from '../stores/usersStore'
import { useJobsStore } from '../stores/jobsStore'
import { computed, onMounted } from 'vue'
import { useTimeFormatter } from '../utils/formatTime'
import { ref } from 'vue'
const jobsStore = useJobsStore()
const usersStore = useUsersStore()
const { formatTime } = useTimeFormatter()
const selectedJobs = ref([])

const jobsWithUsers = computed(() => {
  return jobsStore.jobs.map(job => ({
    ...job,
    user: usersStore.getUserById(job.created_by)?.value
  }))
})

const getUserById = (userId: string) => {
  return usersStore.getUserById(userId)?.value
}

onMounted(async () => {
  await usersStore.fetchUsers()
  await jobsStore.fetchJobs()
})

const getFullName = (userId: string) => {
  const user = getUserById(userId)
  return user ? `${user.first_name} ${user.last_name}` : 'Unknown User'
}

const getInitials = (userId: string) => {
  const user = getUserById(userId)
  if (!user) return '?'
  return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
}

const getStatusColor = (status: string): string => {
  const colors = {
    pending: 'warning',
    processing: 'info',
    completed: 'positive',
    failed: 'negative',
    aborted: 'grey'
  }
  return colors[status as keyof typeof colors] || 'grey'
}
</script>