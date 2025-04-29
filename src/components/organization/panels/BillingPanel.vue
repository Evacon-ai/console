<template>
  <div class="billing-panel">
    <div class="text-subtitle1 text-weight-medium q-mb-sm">{{ $t('organizations.billing.title') }}</div>
    
    <!-- Current Plan -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6">{{ $t('organizations.billing.currentPlan') }}</div>
          <q-btn color="primary" :label="$t('organizations.billing.upgradePlan')" disable />
        </div>
        <div class="row items-center">
          <div class="col">
            <div class="text-h5 q-mb-sm">{{ $t('organizations.billing.freeTrial') }}</div>
            <div class="text-grey-7">{{ $t('organizations.billing.trialEnds', { days: 28 }) }}</div>
          </div>
          <div class="col-auto">
            <q-chip
              color="positive"
              text-color="white"
              icon="check_circle"
            >
              {{ $t('organizations.status.active') }}
            </q-chip>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Payment Methods -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6">{{ $t('organizations.billing.paymentMethods') }}</div>
          <q-btn color="primary" flat :label="$t('organizations.billing.addPaymentMethod')" disable />
        </div>
        <div class="text-grey-7 text-center q-pa-lg">
          <CreditCard class="w-12 h-12 q-mb-md text-grey-5" />
          <div>{{ $t('organizations.billing.noPaymentMethods') }}</div>
          <div class="text-caption">{{ $t('organizations.billing.addCreditCard') }}</div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Billing History -->
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6">{{ $t('organizations.billing.billingHistory') }}</div>
          <q-btn color="primary" flat icon="download" :label="$t('organizations.billing.export')" disable />
        </div>
        
        <q-table
          flat
          :rows="[]"
          :columns="columns"
          row-key="id"
          :loading="false"
          :pagination="{ rowsPerPage: 5 }"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary">
              <q-spinner-dots size="50px" color="primary" />
            </q-inner-loading>
          </template>

          <template v-slot:no-data>
            <div class="full-width row flex-center q-pa-lg text-grey-7">
              <Receipt class="w-12 h-12 q-mb-md text-grey-5" />
              <div class="col-12 text-center">{{ $t('organizations.billing.noInvoices') }}</div>
              <div class="col-12 text-center text-caption">
                {{ $t('organizations.billing.invoicesWillAppear') }}
              </div>
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Coming Soon Banner -->
    <div class="row justify-center q-mt-lg">
      <q-banner class="bg-primary text-white" style="border-radius: 8px;">
        <template v-slot:avatar>
          <Sparkles class="w-6 h-6" />
        </template>
        {{ $t('organizations.billing.comingSoon') }}
      </q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreditCard, Receipt, Sparkles } from 'lucide-vue-next'

const columns = [
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: 'date',
    sortable: true
  },
  {
    name: 'description',
    required: true,
    label: 'Description',
    align: 'left',
    field: 'description'
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'right',
    field: 'amount',
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: 'status'
  },
  {
    name: 'invoice',
    required: true,
    label: 'Invoice',
    align: 'center',
    field: 'invoice'
  }
]
</script>

<style scoped>
.billing-panel {
  width: 100%;
}

.q-table__grid-content {
  min-height: 300px;
}
</style>