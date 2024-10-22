<template>
  <nav class="mb-4 bg-gray-800 p-4">
    <RouterLink
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      class="rounded-md px-3 py-2 text-sm font-medium text-white"
      active-class="bg-gray-900"
    >
      {{ route.name }}
    </RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router"

const router = useRouter()
const routes = router.getRoutes()
</script>
<style scoped></style>
