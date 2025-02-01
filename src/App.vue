<script setup lang="ts">
import AppNavbar from "./components/AppNavbar.vue"
import AppFooter from "./components/AppFooter.vue"
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <AppNavbar />
  <main>
    <div class="container-fluid">
    <RouterView />
    </div>
    <AppFooter />
  </main>
  <!-- <RouterView /> -->
</template>

<style scoped></style>
