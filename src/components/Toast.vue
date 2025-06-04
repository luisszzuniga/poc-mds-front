<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])
const isVisible = ref(true)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false
    setTimeout(() => emit('close'), 300) // Attendre la fin de l'animation
  }, props.duration)
})

const bgColor = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500'
}

const icon = {
  success: 'M5 13l4 4L19 7',
  error: 'M6 18L18 6M6 6l12 12',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}
</script>

<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-4 right-4 z-50"
    >
      <div
        :class="[bgColor[type], 'rounded-lg shadow-lg p-4 text-white flex items-center']"
      >
        <svg
          class="w-6 h-6 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="icon[type]"
          />
        </svg>
        <p class="text-sm font-medium">{{ message }}</p>
      </div>
    </div>
  </transition>
</template> 