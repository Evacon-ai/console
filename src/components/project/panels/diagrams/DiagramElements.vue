<template>
  <div class="diagram-elements">
    <div v-if="elements?.length" class="q-mt-none">
      <q-table
        :rows="elements"
        :columns="columns"
        row-key="identifier_text"
        flat
        bordered
        :rows-per-page-options="[10, 25, 50, 0]"
        :pagination="{ rowsPerPage: 10 }"
        class="elements-table"
        :rows-per-page-label="$t('common.table.rowsPerPage')"
        :records-per-page-label="$t('common.table.recordsPerPage')"
        :no-data-label="$t('common.table.noData')"
        :no-results-label="$t('common.table.noResults')"
        :loading-label="$t('common.table.loading')"
        :selected-records-label="$t('common.table.selectedRecords')"
      >
        <template #body-cell-type_category="props">
          <q-td :props="props">
            <q-chip
              dense
              size="sm"
              :color="props.value ? 'primary' : 'grey'"
              text-color="white"
            >
              {{ props.value || $t('projects.diagrams.noCategory') }}
            </q-chip>
          </q-td>
        </template>

        <template #body-cell-type="props">
          <q-td :props="props">
            <q-chip
              dense
              size="sm"
              :color="props.value ? 'secondary' : 'grey'"
              text-color="white"
            >
              {{ props.value || $t('projects.diagrams.noType') }}
            </q-chip>
          </q-td>
        </template>
        <template #body-cell-element_desc="props">
          <q-td :props="props">
            <div class="text-grey-8 text-wrap" style="max-width: 300px;">
              {{ props.value || '—' }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <div v-else class="column column items-center justify-center">
      <template v-if="hasPendingJob">
        <div class="q-pb-md">
          <div class="row items-center q-gutter-x-md">
            <q-spinner-dots color="primary" size="2em" />
            <span class="text-grey">{{ $t('projects.diagrams.extractingMessage') }}</span>
            <q-spinner-dots color="primary" size="2em" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-grey text-center q-pa-md">
          {{ $t('projects.diagrams.noElements') }}
        </div>
        <div class="q-pb-md">
          <q-btn
            color="primary"
            icon="code"
            :label="$t('projects.diagrams.extractElements')"
            @click="$emit('extract')"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, onMounted } from 'vue'
import { useJobsStore } from '../../../../stores/jobsStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const jobsStore = useJobsStore()

const props = defineProps<{
  elements?: Array<{
    type_category: string
    type: string
    element_desc: string
    identifier_text: string
    contains_text: boolean
  }>,
  diagramId: string,
  project: Project
}>()

const columns = computed(() => [
  {
    name: 'identifier_text',
    label: t('projects.diagrams.elementIdentifier'),
    field: 'identifier_text',
    align: 'left',
    sortable: true,
    style: 'width: 200px'
  },
  {
    name: 'type_category',
    label: t('projects.diagrams.elementCategory'),
    field: 'type_category',
    align: 'left',
    sortable: true,
    style: 'width: 150px'
  },
  {
    name: 'type',
    label: t('projects.diagrams.elementType'),
    field: 'type',
    align: 'left',
    sortable: true,
    style: 'width: 150px'
  },
  {
    name: 'element_desc',
    label: t('projects.diagrams.elementDescription'),
    field: 'element_desc',
    align: 'left',
    sortable: true
  }
])

onMounted(async () => {
  const job = jobsStore.organizationJobs.find(job => 
    job.type === 'diagram_elements_extraction' && 
    ['pending', 'processing'].includes(job.status) &&
    job.payload?.diagram_id === props.diagramId
  )

  if (!job) {
    try {
      await jobsStore.fetchOrganizationPendingJobs(props.project.organization_id)
    } catch (error) {
      console.error('Failed to fetch pending jobs:', error)
    }
  }
})

const hasPendingJob = computed(() => {
  return jobsStore.organizationJobs.some(job => 
    job.type === 'diagram_elements_extraction' && 
    ['pending', 'processing'].includes(job.status) &&
    job.payload?.diagram_id === props.diagramId
  )
})

const emit = defineEmits<{
  (e: 'extract'): void
}>()
</script>

<style scoped>
.diagram-elements {
  max-width: 100%;
  margin: 0 auto;
}

.elements-table {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.q-table__top) {
  padding: 12px 16px;
}

:deep(.q-table thead th) {
  font-weight: 600;
  background: rgba(0, 0, 0, 0.03);
}

.body--dark :deep(.q-table thead th) {
  background: rgba(255, 255, 255, 0.05);
}

:deep(.q-table tbody td) {
  padding: 12px 16px;
}

:deep(.q-table tbody tr:hover) {
  background: rgba(0, 0, 0, 0.02);
}

.body--dark :deep(.q-table tbody tr:hover) {
  background: rgba(255, 255, 255, 0.03);
}

.text-wrap {
  word-wrap: break-word;
  white-space: normal;
}
</style>