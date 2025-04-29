<template>
  <div class="integrations-panel">
    <div class="text-subtitle1 text-weight-medium q-mb-sm">{{ $t('organizations.integrations.title') }}</div>
    <div class="row q-col-gutter-md">
    <div class="col-12 col-md-6">
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <div class="col">
              <div class="row items-center">
                <img 
                  src="/TIA portal logo.jpeg"
                  alt="TIA Portal"
                  style="height: 60px; width: auto;"
                />
              </div>
            </div>
            <div class="col-auto">
              <q-btn
                flat
                round
                color="primary"
                icon="key"
                @click="$emit('configure-tia')"
              >
                <q-tooltip>{{ $t('organizations.integrations.configureApiKey') }}</q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="text-grey-7">
            {{ $t('organizations.integrations.tiaPortal.description') }}
          </div>
          <div class="text-caption text-primary q-mt-sm">
            {{ $t('organizations.integrations.comingSoon') }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-6">
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <div class="col">
              <div class="row items-center">
                <img 
                  src="/Eplan-logo.png"
                  alt="EPLAN"
                  style="height: 60px; width: auto;"
                />
              </div>
            </div>
            <div class="col-auto">
              <q-btn
                flat
                round
                color="primary"
                icon="key"
                @click="$emit('configure-eplan')"
              >
                <q-tooltip>{{ $t('organizations.integrations.configureApiKey') }}</q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="text-grey-7">
            {{ $t('organizations.integrations.eplan.description') }}
          </div>
          <div class="text-caption text-primary q-mt-sm">
            {{ $t('organizations.integrations.comingSoon') }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</div>
</template>

<style scoped>
.integrations-panel {
  width: 100%;
}
</style>