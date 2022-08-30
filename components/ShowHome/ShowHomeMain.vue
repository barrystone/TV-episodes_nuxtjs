<script setup lang="ts">
interface Props {
  showInfo: {
    name: string;
    image: { medium: string };
    summary: string;
    language: string;
    rating: { average: number };
    genres: Array<string>;
  };
}
const props = defineProps<Props>();
</script>

<template>
  <div class="flex justify-center items-center">
    <!-- <h1>ShowHomeMain props(showInfo.name): {{ showInfo.name }}</h1> -->
    <div
      class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800"
    >
      <img
        class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-80 md:rounded-none md:rounded-l-lg"
        :src="
          showInfo.image?.medium
            ? showInfo.image?.medium
            : '/assets/no-pictures.png'
        "
        alt=""
      />
      <div class="flex flex-col justify-between p-4 leading-normal ml-10">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ showInfo.name }}
        </h5>
        <div class="flex flex-row">
          <img src="/assets/language.png" alt="" class="w-5 h-5 mr-2" />
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ showInfo.language }}
          </p>
        </div>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ showInfo.genres }}

          <!-- {{ showInfo.summary?.slice(3, -4).startsWith("<b>")?showInfo.summary?.slice(3, -4).split('>')[2]:showInfo.summary?.slice(3, -4) }} -->
        </p>
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
            {{ showInfo.rating.average }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
