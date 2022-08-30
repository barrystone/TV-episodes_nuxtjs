<script setup lang="ts">
import { onMounted, ref } from 'vue';
const config = useRuntimeConfig();
const route = useRoute();
const showInfo = ref({
  name: '',
  rating: { average: 0 }
});
const episodes = ref([]);

onMounted(async () => {
  const res = await fetch(
    `${config.apiBase}/shows/${route.params.id}?embed=episodes`
  );
  const data = await res.json();
  showInfo.value = data;
  episodes.value = data._embedded.episodes;
  console.log('showInfo', showInfo.value);
  // console.log('episodes', episodes);
});
</script>

<template>
  <div>
    <Navbar :showName="showInfo.name" />
    <main>
      <ShowHome
        v-if="!$route.hash || $route.hash === '#home'"
        :showInfo="showInfo"
      />
      <ShowEpisodes
        v-if="$route.hash === '#episodes'"
        :showInfo="showInfo"
        :episodes="episodes"
      />
    </main>
  </div>
</template>
