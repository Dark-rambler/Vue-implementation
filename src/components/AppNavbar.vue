<template>
  <nav class="navbar navbar-expand-lg bg-body-secondary py-4">
    <div class="container-fluid px-5">
      <a class="navbar-brand" href="#">Four Sides Group</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item mt-1 ">
            <RouterLink to="/" class="nav-link active" aria-current="page" href="#">Usuarios</RouterLink>
          </li>
          <div class="d-block d-lg-none">
            <button v-if="!isDarkMode" class="btn btn-gray border border-4 rounded bi bi-moon" @click="toggleDarkMode">
            </button>
            <button v-if="isDarkMode" class="btn btn-gray border border-4   bi bi-sun" @click="toggleDarkMode">
            </button>
          </div>
        </ul>
      </div>
      <div class="d-none d-lg-block">
        <button v-if="!isDarkMode" class="btn btn-gray border border-4 rounded bi bi-moon" @click="toggleDarkMode">
        </button>
        <button v-if="isDarkMode" class="btn btn-gray border border-4   bi bi-sun" @click="toggleDarkMode">
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';

const emit = defineEmits(['toggleDarkMode']);
const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

watchEffect(() => {
  document.documentElement.setAttribute(
    "data-bs-theme",
    isDarkMode.value ? "dark" : "light"
  );
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  emit('toggleDarkMode');
};

</script>
