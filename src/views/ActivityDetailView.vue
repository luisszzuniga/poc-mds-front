<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useActivityStore } from '../stores/activities'
import RegisterButton from '../components/RegisterButton.vue'
import AvailablePlaces from '../components/AvailablePlaces.vue'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const activityStore = useActivityStore()

const activity = computed(() => {
  return activityStore.getActivityById(Number(route.params.id))
})

const goBack = () => {
  router.back()
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête avec image de fond -->
    <div class="relative h-64 bg-gray-900">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative h-full flex items-center justify-center">
        <button
          @click="goBack"
          class="absolute top-4 left-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div class="text-center text-white">
          <h1 class="text-3xl font-bold mb-2">{{ activity?.name }}</h1>
          <p class="text-lg">{{ activity?.location }}</p>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Colonne de gauche : Description et détails -->
        <div class="md:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p class="text-gray-600 mb-6">{{ activity?.description }}</p>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(activity?.date) }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ activity?.time }} ({{ activity?.duration }})</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>{{ activity?.ageRange }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <AvailablePlaces
                  :activity-id="activity?.id"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne de droite : Animateur et inscription -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Animateur</h2>
            <div class="flex items-center mb-6">
              <img
                :src="activity?.organizer.photo"
                :alt="activity?.organizer.name"
                class="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p class="text-lg font-medium text-gray-900">{{ activity?.organizer.name }}</p>
                <p class="text-gray-600">Animateur</p>
              </div>
            </div>
            <RegisterButton
              :activity-id="activity?.id"
              :max-places="activity?.maxPlaces"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 