<script setup lang="ts">
import { onMounted, ref } from 'vue';
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const shows = ref([]);
const searchInput = ref(route.params.id ? route.params.id : '');

const searchShow = async (text) => {
  const res = await fetch(`${config.apiBase}/search/shows?q=${text}`);
  const data = await res.json();
  shows.value = data;
  console.log(shows.value.length);
};

onMounted(async () => {
  searchShow(route.params.id);
});

const submit = async () => {
  router.push({
    path: '/search/' + searchInput.value
  });
};
</script>

<template>
  <div>
    <header class="bg-white py-4 shadow-lg">
      <!-- <NuxtLink to="/search">Search</NuxtLink> -->
      <form @submit.prevent="submit" class="mx-20">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >Search</label
        >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            v-model="searchInput"
            class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search TV"
            required
          />
          <NuxtLink
            :to="'/search/' + searchInput"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </NuxtLink>
        </div>
      </form>
      <div
        class="relative flex p-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 mx-20 mt-5"
        role="alert"
      >
        <svg
          aria-hidden="true"
          class="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <!-- <span class="sr-only">Info</span> -->
        <div class="text-sm">
          Search :
          <span class="font-medium text-lg"> {{ searchInput }}</span>
          <div class="absolute right-0 top-1/2 -translate-y-1/2 mr-10">
            Results:
            <span class="ml-1 font-medium text-base">{{ shows.length }}</span>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="bg-white">
        <div
          class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <h2 class="sr-only">search</h2>

          <div
            class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          >
            <!-- <div class="shows"> -->
            <div class="show" v-for="show in shows" :key="show.show.id">
              <nuxt-link class="group" :to="'/show/' + show.show.id">
                <div
                  class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
                >
                  <img
                    :src="show.show.image?.medium"
                    alt=""
                    class="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 class="mt-4 text-sm text-gray-700">
                  {{ show.show.name }}
                </h3>
                <p class="mt-1 text-lg font-medium text-gray-900">rating</p>
              </nuxt-link>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
