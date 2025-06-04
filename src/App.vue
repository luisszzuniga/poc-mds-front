<script setup>
import { useUserStore } from './stores/users'
import { useRouter } from 'vue-router'
import Footer from './components/Footer.vue'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="text-2xl font-bold text-blue-600">Activités Mauron</router-link>
          <div class="flex items-center space-x-4">
            <template v-if="userStore.isAuthenticated">
              <span class="text-gray-600">Bonjour, {{ userStore.currentUser.firstName }}</span>
              <button
                @click="handleLogout"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Déconnexion
              </button>
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="text-gray-600 hover:text-blue-600 transition duration-300"
                :class="{ 'text-blue-600': $route.name === 'login' }"
              >
                Connexion
              </router-link>
              <router-link
                to="/register"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                :class="{ 'bg-blue-700': $route.name === 'register' }"
              >
                Inscription
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow bg-gray-50">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
.router-link-active {
  @apply text-blue-600;
}
</style>
