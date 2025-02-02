<script setup lang="ts">
import { ref, onMounted } from "vue";
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";

const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

onMounted(() => {
  document.documentElement.setAttribute("data-bs-theme", isDarkMode.value ? "dark" : "light");
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value.toString());
  document.documentElement.setAttribute("data-bs-theme", isDarkMode.value ? "dark" : "light");
};
</script>

<template>
  <div class="app-container">
    <AppNavbar @toggleDarkMode="toggleDarkMode" />
    <main class="content">
      <div class="container-md">
        <RouterView />
      </div>
    </main>
    <AppFooter class="footer" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.footer {
  flex-shrink: 0;
}
</style>
