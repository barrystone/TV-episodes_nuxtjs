<script setup lang="ts">
import { onMounted, ref } from 'vue';
const config = useRuntimeConfig();
const route = useRoute();
const episodes = ref([]);

onMounted(async () => {
  const res = await fetch(
    `${config.apiBase}/shows/${route.params.id}?embed=episodes`
  );
  const data = await res.json();
  // console.log('data', data);
  episodes.value = data._embedded.episodes;
});
</script>

<template>
  <div>
    <header>
      <nuxt-link to="/">
        <button>back</button>
      </nuxt-link>
    </header>
    <main>
      <h2>Show ID: {{ $route.params.id }}</h2>
      <h3>List of Episodes</h3>
      <div class="shows">
        <div class="show" v-for="episode in episodes" :key="episode.id">
          <h4>{{ episode.name }}</h4>
          <div>Season:{{ episode.season }} Episode: {{ episode.number }}</div>
          <img :src="episode.image?.medium" alt="" />
          {{ episode.summary.slice(3, -4) }}
        </div>
      </div>
    </main>
  </div>
</template>
