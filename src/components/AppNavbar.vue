<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page" href="#">Home</RouterLink>
          </li>
        </ul>
      </div>
      <button v-if="!isDarkMode" class="btn btn-primary bi bi-moon" @click="toggleDarkMode">
      </button>
      <button v-if="isDarkMode" class="btn btn-primary bi bi-sun" @click="toggleDarkMode">
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
const emit = defineEmits(['toggleDarkMode']);
const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  emit('toggleDarkMode');
};

watchEffect(() => {
  document.documentElement.setAttribute(
    "data-bs-theme",
    isDarkMode.value ? "dark" : "light"
  );
});


// const toggleDarkMode = () => {
// };
</script>
