<script setup>
import { useRouter } from 'vue-router'
import RegisterButton from './RegisterButton.vue'
import AvailablePlaces from './AvailablePlaces.vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToActivityDetail = () => {
  router.push(`/activity/${props.activity.id}`)
}
</script>

<template>
  <router-link :to="`/activity/${activity.id}`" class="hover:shadow-lg transition-shadow duration-300"> 
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img
        :src="activity.organizer.photo"
        :alt="activity.organizer.name"
        class="w-full h-48 object-cover"
      />
      <div class="absolute top-4 right-4">
        <AvailablePlaces
          :activity-id="activity.id"
          size="sm"
          badge
        />
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ activity.name }}</h3>
      <p class="text-gray-600 mb-4">{{ activity.description }}</p>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center text-gray-500">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ activity.location }}</span>
        </div>
        <div class="flex items-center text-gray-500">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ activity.date }} à {{ activity.time }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center text-gray-500">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>{{ activity.ageRange }}</span>
        </div>
        <RegisterButton
          :activity-id="activity.id"
          :max-places="activity.maxPlaces"
        />
      </div>
    </div>
  </div>
  </router-link>
</template> 