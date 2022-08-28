<script lang="ts">
export default {
  name: 'ShowEpisodes',
  props: ['showInfo', 'episodes'],
  methods: {
    storeEpisodeIdInfo(id) {
      localStorage.setItem('Tv-episodes_latestEpisodeId', id);
    }
  },
  setup(props) {
    const info = ref();
    const eps = ref();

    watchEffect(() => {
      info.value = props.showInfo;
      eps.value = props.episodes;
    });

    return { info, eps };
  }
};
</script>
<template>
  <div
    class="p-4 w-full max-w-screen-xl m-auto my-10 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-between items-center border-white border-b">
      <h5
        class="text-xl font-bold leading-none text-gray-900 dark:text-white mb-3"
      >
        List of Episodes
      </h5>
      <div
        v-if="!info.rating.average && !eps[0]"
        class="text-md font-medium text-black hover:underline dark:text-black flex bg-white p-2 rounded"
      >
        No information yet
      </div>
      <div
        v-if="info.rating.average"
        class="text-sm font-medium text-white hover:underline dark:text-white flex"
      >
        <span> Show Rating : &nbsp;</span>
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
          <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            {{ info.rating.average }}
          </p>
        </div>
      </div>
    </div>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-300">
        <li class="py-3 sm:py-4" v-for="episode in eps" :key="episode.id">
          <nuxt-link
            :to="'/show/' + info.id + '/episode/'"
            v-on:click="storeEpisodeIdInfo(episode.id)"
          >
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

                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
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
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
