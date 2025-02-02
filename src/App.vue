<script setup lang="ts">
import AppNavbar from "./components/AppNavbar.vue"
import AppFooter from "./components/AppFooter.vue"
// import { RouterLink, RouterView } from 'vue-router'
import { ref } from "vue";

const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

// Cambiar el tema
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value.toString());
};

// Aplicar tema al cargar la página
// watchEffect(() => {
//   document.documentElement.setAttribute(
//     "data-bs-theme",
//     isDarkMode.value ? "dark" : "light"
//   );
// });
</script>

<template>

  <body :data-bs-theme="isDarkMode ? 'dark' : 'light'">

    <AppNavbar
       @toggleDarkMode="toggleDarkMode"
    />
    <!-- <button @click="toggleDarkMode" class="btn btn-primary">
      Cambiar a {{ isDarkMode ? "Modo Claro" : "Modo Oscuro" }}
    </button> -->
    <main>

      <div class="container-md">
        <RouterView />
      </div>
      <AppFooter />

    </main>
  </body>

  <!-- <RouterView /> -->
</template>
<style></style>
