<script setup>
import { computed, onMounted } from 'vue'
import { usePlacesStore } from '../stores/places'

const props = defineProps({
  activityId: {
    type: Number,
    required: true
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  badge: {
    type: Boolean,
    default: false
  }
})

const placesStore = usePlacesStore()

const availablePlaces = computed(() => placesStore.getAvailablePlaces(props.activityId))

const textSize = computed(() => ({
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}[props.size]))

onMounted(() => {
  placesStore.initializePlaces()
})
</script>

<template>
  <div 
    class="flex items-center space-x-1" 
    :class="[
      textSize,
      badge ? 'bg-white px-2 py-1 rounded-full shadow-sm' : ''
    ]"
  >
    <svg
      class="w-4 h-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    <span v-if="showLabel" class="text-gray-600">Places disponibles :</span>
    <span
      :class="[
        'font-medium',
        availablePlaces > 5 ? 'text-green-600' :
        availablePlaces > 0 ? 'text-orange-600' : 'text-red-600'
      ]"
    >
      {{ availablePlaces }}
    </span>
  </div>
</template> 