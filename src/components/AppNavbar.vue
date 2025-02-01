<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
    </ul>
  </nav>

  <script setup lang="ts">
import { RouterLink } from 'vue-router';
export default {
  name: 'Navbar',
};
</script>
