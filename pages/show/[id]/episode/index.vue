<script setup lang="ts">
import { onMounted, ref } from 'vue';
const config = useRuntimeConfig();
// const router = useRouter();
const route = useRoute();
const episodes = ref([]);
const theEpisode = ref({
  id: '',
  image: { medium: '' },
  summary: '',
  season: '',
  number: 0,
  rating: {
    average: 0
  }
});
const showInfo = ref({
  name: ''
});
const latestEpisodeId = ref(
  localStorage.getItem('Tv-episodes_latestEpisodeId')
);

let slideIndex = 1;
const slides = document.getElementsByClassName('slide');
// const dots = document.getElementsByClassName('dot');

const findTheEpisode = () => {
  latestEpisodeId.value = localStorage.getItem('Tv-episodes_latestEpisodeId');
  theEpisode.value = episodes.value.find(
    (e) => e.id === Number(latestEpisodeId.value)
  );
};

onMounted(async () => {
  const res = await fetch(
    `${config.apiBase}/shows/${route.path.split('/')[2]}?embed=episodes`
  );
  const data = await res.json();
  showInfo.value = data;
  episodes.value = data._embedded.episodes;

  findTheEpisode();
  slideIndex = episodes.value.indexOf(theEpisode.value) + 1;
});

// change slide with the prev/next button
const moveSlide = (moveStep) => {
  showSlide((slideIndex += moveStep));
  localStorage.setItem(
    'Tv-episodes_latestEpisodeId',
    episodes.value[slideIndex - 1].id
  );
  findTheEpisode();
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
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].classList.remove('bg-yellow-500');
  //   dots[i].classList.add('bg-green-600');
  // }

  // show the active slide
  slides[slideIndex - 1].classList.remove('hidden');

  //   highlight the active dot
  // dots[slideIndex - 1].classList.remove('bg-green-600');
  // dots[slideIndex - 1].classList.add('bg-yellow-500');
};
</script>

<template>
  <div class="">
    <header class="relative flex items-center bg-white py-4 shadow-lg">
      <a
        :href="'/show/' + route.path.split('/')[2]"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer h-10 ml-5"
        >Back to show
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
      </a>
      <h1
        class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-xl"
      >
        {{ showInfo.name }}
      </h1>
    </header>
    <main>
      <!-- Implement the carousel -->
      <div
        class="relative mx-auto flex items-center justify-center md:mt-20 bg-slate-900"
      >
        <div
          :class="
            episode.id === Number(latestEpisodeId)
              ? 'slide relative bg-green-500 '
              : 'slide relative hidden'
          "
          v-for="episode in episodes"
          :key="episode.id"
        >
          <img
            class="w-full h-[300px] object-cover"
            :src="episode.image?.medium"
          />
          <div
            class="absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white"
          >
            {{ episode.name }}
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
      <div class="flex flex-col items-center justify-center">
        <div class="flex justify-center items-center h-5">
          <span> Rating: &nbsp;</span>
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
          <span>
            {{ theEpisode.rating.average }}
          </span>
        </div>
        <div class="mt-2">
          Season: &nbsp;{{ theEpisode.season }} &nbsp; Episode: &nbsp;
          {{ theEpisode.number }}
        </div>

        <p
          class="w-[95%] md:w-[70%] sm:w-[80%] mt-3 md:mt-5 text-center bg-white py-4 px-5 shadow-xl border-t-2 border-b-2 border-slate-400"
        >
          {{ theEpisode.summary.slice(3, -4) }}
        </p>
        <!-- <div class="flex items-center h-5 mr-5 mb-10">
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
        {{ theEpisode.rating.average }}
      </p>
    </div> -->
      </div>

      <!-- The dots -->
      <!-- <div class="flex justify-center items-center space-x-5">
        <div
          class="dot w-4 h-4 rounded-full cursor-pointer bg-red-200"
          v-for="(episode, index) in episodes"
          :key="episode.id"
          v-on:click="currentSlide(index)"
        ></div>
      </div> -->
    </main>
  </div>
</template>
