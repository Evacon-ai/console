<template>
  <div class="row items-center justify-center no-wrap ltr" :class="{ 'cursor-pointer': clickable }" @click="onClick">
    <div class="logo-container">
      <template v-if="!imageError">
        <img 
          src="/evacon.ai.png" 
          alt="Evacon.ai" 
          class="logo-image" 
          :style="{ height: `${size}px` }" 
          @error="handleImageError"
        />
      </template>
      <template v-else>
        <div class="fallback-logo" :style="{ height: `${size}px` }">
          <Cpu class="logo-icon" :style="{ width: `${size}px`, height: `${size}px` }" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Cpu } from 'lucide-vue-next'

defineProps({
  showText: {
    type: Boolean,
    default: true
  },
  textClass: {
    type: String,
    default: ''
  },
  clickable: {
    type: Boolean,
    default: false
  },
  size: {
    type: Number,
    default: 32
  }
})

const emit = defineEmits(['click'])
const imageError = ref(false)

const onClick = () => emit('click')
const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.logo-container {
  display: inline-flex;
  color: var(--q-primary);
}

.fallback-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  color: var(--q-secondary);
}

.ltr {
  direction: ltr !important;
}

/* Make logo responsive */
@media (max-width: 400px) {
  .logo-image, .fallback-logo {
    height: 24px !important;
  }
  
  .logo-icon {
    width: 24px !important;
    height: 24px !important;
  }
}
</style>