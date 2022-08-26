<script setup lang="ts">
const test = 'TESTING';
</script>

<template>
  <div>
    <header class="bg-white py-4 shadow-lg">
      <NuxtLink to="/search">Search</NuxtLink>
    </header>
    <main>
      <p>
        {{ test }}
      </p>
    </main>
  </div>
</template>
