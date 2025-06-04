<script setup>
import { useActivityStore } from '../stores/activities'
import ActivityCard from '../components/ActivityCard.vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const activityStore = useActivityStore()
const router = useRouter()
const showAllActivities = ref(false)

const displayedActivities = computed(() => {
  const activities = activityStore.upcomingActivities
  return showAllActivities.value ? activities : activities.slice(0, 6)
})

const hasMoreActivities = computed(() => {
  return activityStore.upcomingActivities.length > 6
})

const goToContact = () => {
  router.push('/contact')
}

const toggleShowAll = () => {
  showAllActivities.value = !showAllActivities.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-blue-600 text-white">
      <div class="container mx-auto px-6 py-16">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold mb-4">Activités Enfants à Mauron</h1>
          <p class="text-xl mb-8">
            Découvrez notre sélection d'activités ludiques et éducatives pour vos enfants. 
            Des ateliers créatifs aux sorties nature, il y en a pour tous les goûts !
          </p>
          <div class="flex space-x-4">
            <a href="#activities">
              <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                Voir les activités
              </button>
            </a>
            <button 
              @click="goToContact"
              class="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Activités Variées</h3>
          <p class="text-gray-600">Des activités adaptées à tous les âges et tous les centres d'intérêt</p>
        </div>
        <div class="text-center">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Horaires Flexibles</h3>
          <p class="text-gray-600">Des créneaux adaptés aux emplois du temps des familles</p>
        </div>
        <div class="text-center">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Encadrement Qualifié</h3>
          <p class="text-gray-600">Des animateurs professionnels et passionnés</p>
        </div>
      </div>
    </div>

    <!-- Activities Section -->
    <div class="container mx-auto px-6 py-16" id="activities">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Prochaines Activités</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ActivityCard
          v-for="activity in displayedActivities"
          :key="activity.id"
          :activity="activity"
        />
      </div>
      
      <!-- Bouton Afficher plus/moins -->
      <div v-if="hasMoreActivities" class="text-center mt-8">
        <button
          @click="toggleShowAll"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
        >
          <span>{{ showAllActivities ? 'Afficher moins' : 'Afficher plus' }}</span>
          <svg
            class="ml-2 w-5 h-5 transform transition-transform duration-300"
            :class="{ 'rotate-180': showAllActivities }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template> 