<script setup lang="ts">
import { ref } from 'vue';
const config = useRuntimeConfig();
const shows = ref([]);
const searchInput = ref('');

const searchShow = async (text) => {
  const res = await fetch(`${config.apiBase}/search/shows?q=${text.value}`);
  const data = await res.json();
  shows.value = data;
};

const submit = async () => {
  if (!searchInput.value) return;
  searchShow(searchInput);
};
</script>

<template>
  <div>
    <header class="bg-white py-4 shadow-lg">
      <NuxtLink to="/search">Search</NuxtLink>
    </header>
    <main>
      <form @submit.prevent="submit">
        <input type="text" v-model="searchInput" />
        <button>Search</button>
      </form>

      <div class="shows">
        <div class="show" v-for="show in shows" :key="show.id">
          <nuxt-link :to="'/search/' + show.show.id">
            {{ show.show.name }}
            <img :src="show.show.image?.medium" alt="" />
          </nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>
