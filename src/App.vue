<script setup>
import { RouterView } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from './stores/users'
import { useRouter } from 'vue-router'
import Footer from './components/Footer.vue'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <DefaultLayout v-if="!isAdminRoute">
    <RouterView />
  </DefaultLayout>
  <RouterView v-else />
</template>

<style>
.router-link-active {
  @apply text-blue-600;
}
</style>
