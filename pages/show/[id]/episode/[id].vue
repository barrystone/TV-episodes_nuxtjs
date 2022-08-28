<script setup lang="ts">
import { onMounted, ref } from 'vue';
const config = useRuntimeConfig();
const route = useRoute();

const episodes = ref([]);
const episode = ref({
  id: '',
  image: { medium: '' }
});
const showInfo = ref({
  name: ''
});

let slideIndex = 1;
const slides = document.getElementsByClassName('slide');
// const dots = document.getElementsByClassName('dot');

onMounted(async () => {
  const res = await fetch(
    `${config.apiBase}/shows/${route.path.split('/')[2]}?embed=episodes`
  );
  const data = await res.json();
  showInfo.value = data;
  episodes.value = data._embedded.episodes;
  episode.value = episodes.value.find((e) => e.id === Number(route.params.id));
  slideIndex = episodes.value.indexOf(episode.value) + 1;
});

if (episode.value) {
  localStorage.setItem(
    'Tv-episodes_latestEpisodeId',
    route.params.id.toString()
  );
} else {
  alert('Episode not Found');
  location.href = `/show/${route.path.split('/')[2]}/episode/`;
}

// change slide with the prev/next button
const moveSlide = (moveStep) => {
  localStorage.setItem(
    'Tv-episodes_latestEpisodeId',
    episodes.value[(slideIndex += moveStep) - 1].id
  );
  location.href = `/show/${route.path.split('/')[2]}/episode/`;
};
// change slide with the dots
const currentSlide = (n) => {
  showSlide((slideIndex = n));
};
const showSlide = (n) => {
  let i;

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  // hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add('hidden');
  }
  // remove active status from all dots
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].classList.remove('bg-yellow-500');
  //     dots[i].classList.add('bg-green-600');
  //   }

  // show the active slide
  slides[slideIndex - 1].classList.remove('hidden');

  //   highlight the active dot
  // dots[slideIndex - 1].classList.remove('bg-green-600');
  // dots[slideIndex - 1].classList.add('bg-yellow-500');
};
</script>

<template>
  <header class="relative flex items-center bg-white py-4 shadow-lg">
    <a
      :href="'/show/' + route.path.split('/')[2]"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer h-10 ml-5"
      >Back to show
      <!-- v-on:click="router.back()" -->

      <!-- <nuxt-link
      :to="'/show/' + route.path.split('/')[2]"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer h-10 ml-5"
      >Back to show -->

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
      <!-- </nuxt-link> -->
    </a>
    <h1
      class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-xl"
    >
      {{ showInfo.name }}
    </h1>
  </header>
  <!-- <h1 class="my-4 text-center text-4xl">KindaCode.com</h1>
  <h2 class="mb-10 text-center text-xl">Carousel Example</h2> -->

  <!-- Implement the carousel -->
  <div class="relative w-[600px] mx-auto">
    <!-- <div
      :class="
        episode.id === Number($route.params.id)
          ? 'slide relative '
          : 'slide relative '
      "
      v-for="episode in episodes"
      :key="episode.id"
    > -->
    <img class="w-full h-[300px] object-cover" :src="episode.image?.medium" />
    <div
      class="absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white"
    >
      {{ episode.id }}
      <br />
    </div>
    <!-- </div> -->
    <a
      class="absolute left-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer select-none"
      v-on:click="moveSlide(-1)"
    >
      ❮
    </a>
    <a
      class="absolute right-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer select-none"
      v-on:click="moveSlide(1)"
      >❯</a
    >
  </div>
  <br />

  <!-- The dots -->
  <!-- <div class="flex justify-center items-center space-x-5">
    <div
      class="dot w-4 h-4 rounded-full cursor-pointer"
      v-on:click="currentSlide(1)"
    ></div>
    <div
      class="dot w-4 h-4 rounded-full cursor-pointer bg-red-300"
      v-on:click="currentSlide(2)"
    ></div>
    <div
      class="dot w-4 h-4 rounded-full cursor-pointer bg-red-100"
      v-on:click="currentSlide(3)"
    ></div>
  </div> -->
</template>
