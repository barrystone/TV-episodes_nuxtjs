<script setup lang="ts">
import { onMounted, ref } from 'vue';
const config = useRuntimeConfig();
const route = useRoute();
const episodes = ref([]);
let latestEpisodeId = localStorage.getItem('Tv-episodes_latestEpisodeId');

let slideIndex = 1;
const slides = document.getElementsByClassName('slide');
// const dots = document.getElementsByClassName('dot');

onMounted(async () => {
  const res = await fetch(
    `${config.apiBase}/shows/${route.path.split('/')[2]}?embed=episodes`
  );

  const data = await res.json();
  episodes.value = data._embedded.episodes;

  latestEpisodeId = localStorage.getItem('Tv-episodes_latestEpisodeId');
  console.log('latestEpisodeId', latestEpisodeId);
  slideIndex =
    episodes.value
      .map((e, index) => e.id === Number(latestEpisodeId) && index)
      .filter((e) => typeof e === 'number')[0] + 1;
});

// change slide with the prev/next button
const moveSlide = (moveStep) => {
  showSlide((slideIndex += moveStep));
  localStorage.setItem(
    'Tv-episodes_latestEpisodeId',
    episodes.value[slideIndex - 1].id
  );
  latestEpisodeId = localStorage.getItem('Tv-episodes_latestEpisodeId');
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
  <h1 class="my-4 text-center text-4xl">KindaCode.com</h1>
  <h2 class="mb-10 text-center text-xl">Carousel Example</h2>

  <!-- Implement the carousel -->
  <div class="relative w-[600px] mx-auto">
    <div
      :class="
        episode.id === Number(latestEpisodeId)
          ? 'slide relative '
          : 'slide relative hidden'
      "
      v-for="episode in episodes"
      :key="episode.id"
    >
      <img class="w-full h-[300px] object-cover" :src="episode.image?.medium" />
      <div
        class="absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white"
      >
        {{ episode.id }}
        <br />
      </div>
    </div>
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
