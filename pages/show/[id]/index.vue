<script setup lang="ts">
import { onMounted, ref } from 'vue';
const config = useRuntimeConfig();
const route = useRoute();
const showInfo = ref({
  name: ''
});
const episodes = ref([]);

onMounted(async () => {
  const res = await fetch(
    `${config.apiBase}/shows/${route.params.id}?embed=episodes`
  );
  const data = await res.json();
  showInfo.value = data;
  episodes.value = data._embedded.episodes;
  // console.log('showInfo', showInfo);
  // console.log('episodes', episodes);
});

const storeEpisodeIdInfo = (id) => {
  localStorage.setItem('Tv-episodes_latestEpisodeId', id);
};
</script>

<template>
  <div>
    <header class="flex items-center bg-white py-4 shadow-lg">
      <nuxt-link
        to="/"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer h-10 ml-5"
        >Back to Home

        <svg
          aria-hidden="true"
          class="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </nuxt-link>
      <h3 class="ml-5">List of Episodes</h3>
    </header>
    <main>
      <div
        class="p-4 w-full max-w-screen-xl m-auto my-10 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex justify-between items-center mb-4">
          <h5
            class="text-xl font-bold leading-none text-gray-900 dark:text-white"
          >
            {{ showInfo.name }}
          </h5>
          <a
            href="#"
            class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-300">
            <li
              class="py-3 sm:py-4"
              v-for="episode in episodes"
              :key="episode.id"
            >
              <nuxt-link
                :to="'/show/' + route.params.id + '/episode/'"
                v-on:click="storeEpisodeIdInfo(episode.id)"
              >
                <!-- <h4>{{ episode.name }}</h4> -->
                <!-- <div> -->
                <!-- Season:{{ episode.season }} Episode: {{ episode.number }} -->
                <!-- </div> -->
                <!-- <img :src="episode.image?.medium" alt="" /> -->
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <img :src="episode.image?.medium" alt="" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex flex-row">
                      <div class="flex items-center h-5 mr-5 mb-10">
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Rating star</title>
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          ></path>
                        </svg>
                        <p
                          class="ml-2 text-sm font-bold text-gray-900 dark:text-white"
                        >
                          {{ episode.rating.average }}
                        </p>
                      </div>
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-white"
                      >
                        {{ episode.name }}
                      </p>
                    </div>

                    <p
                      class="text-sm text-gray-500 truncate dark:text-gray-400"
                    >
                      {{ episode.summary.slice(3, -4) }}
                    </p>
                  </div>
                  <div
                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white leading-10"
                  >
                    Season: {{ episode.season }}
                    <br />
                    Episode: {{ episode.number }}
                  </div>
                </div>
                <!-- <div class="shows"> -->
                <!-- <div class="show" v-for="episode in episodes" :key="episode.id"> -->
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- </div> -->
      <!-- </div> -->
    </main>
  </div>
</template>
