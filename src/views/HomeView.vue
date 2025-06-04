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
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div class="container mx-auto px-6 py-24 relative">
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold mb-6 leading-tight animate-fade-in">
            Activités Enfants à Mauron
          </h1>
          <p class="text-xl mb-10 text-blue-100 leading-relaxed">
            Découvrez notre sélection d'activités ludiques et éducatives pour vos enfants. 
            Des ateliers créatifs aux sorties nature, il y en a pour tous les goûts !
          </p>
          <div class="flex space-x-6">
            <a href="#activities" class="transform hover:scale-105 transition-transform duration-300">
              <button class="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
                Voir les activités
              </button>
            </a>
            <button 
              @click="goToContact"
              class="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container mx-auto px-6 py-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div class="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-4 text-gray-800">Activités Variées</h3>
          <p class="text-gray-600 leading-relaxed">Des activités adaptées à tous les âges et tous les centres d'intérêt</p>
        </div>
        <div class="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div class="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-4 text-gray-800">Horaires Flexibles</h3>
          <p class="text-gray-600 leading-relaxed">Des créneaux adaptés aux emplois du temps des familles</p>
        </div>
        <div class="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div class="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold mb-4 text-gray-800">Encadrement Qualifié</h3>
          <p class="text-gray-600 leading-relaxed">Des animateurs professionnels et passionnés</p>
        </div>
      </div>
    </div>

    <!-- Activities Section -->
    <div class="container mx-auto px-6 py-24 bg-gradient-to-b from-white to-gray-50" id="activities">
      <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">Prochaines Activités</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ActivityCard
          v-for="activity in displayedActivities"
          :key="activity.id"
          :activity="activity"
          class="transform hover:scale-105 transition-all duration-300"
        />
      </div>
      
      <!-- Bouton Afficher plus/moins -->
      <div v-if="hasMoreActivities" class="text-center mt-12">
        <button
          @click="toggleShowAll"
          class="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span>{{ showAllActivities ? 'Afficher moins' : 'Afficher plus' }}</span>
          <svg
            class="ml-3 w-6 h-6 transform transition-transform duration-300"
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

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 