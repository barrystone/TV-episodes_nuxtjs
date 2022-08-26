<script setup lang="ts">
const config = useRuntimeConfig();

console.log('TEST', config.apiBase);
</script>

<template>
  <div>
    <header class="bg-white py-4 shadow-lg">
      <NuxtLink to="/search">Search</NuxtLink>
    </header>
    <main>
      <p></p>
    </main>
  </div>
</template>
