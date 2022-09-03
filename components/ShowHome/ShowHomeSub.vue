<script lang="ts">
export default {
  props: ['showInfo'],
  setup() {
    const tabId = ref('information-tab');
    const others_1_isOpen = ref(0);
    const others_2_isOpen = ref(0);
    const selectTab = (id) => (tabId.value = id);

    return { tabId, selectTab, others_1_isOpen, others_2_isOpen };
  }
};
</script>

<template>
  <div
    class="w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select tab</label>
      <select
        id="tabs"
        class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 sm:text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>Information</option>
        <option>Story</option>
        <option>Others</option>
      </select>
    </div>
    <ul
      class="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 sm:flex dark:divide-gray-600 dark:text-gray-400"
      id="fullWidthTab"
      data-tabs-toggle="#fullWidthTabContent"
      role="tablist"
    >
      <li class="w-full">
        <button
          id="information-tab"
          data-tabs-target="#stats"
          type="button"
          role="tab"
          aria-controls="stats"
          aria-selected="true"
          class="inline-block p-4 w-full bg-gray-50 rounded-tl-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          @click="selectTab('information-tab')"
          :class="
            tabId === 'information-tab' ? 'bg-gray-100 dark:bg-gray-600' : ''
          "
        >
          Information
        </button>
      </li>
      <li class="w-full">
        <button
          id="story-tab"
          data-tabs-target="#about"
          type="button"
          role="tab"
          aria-controls="about"
          aria-selected="false"
          class="inline-block p-4 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          @click="selectTab('story-tab')"
          :class="tabId === 'story-tab' ? 'bg-gray-100 dark:bg-gray-600' : ''"
        >
          Story
        </button>
      </li>
      <li class="w-full">
        <button
          id="others-tab"
          data-tabs-target="#faq"
          type="button"
          role="tab"
          aria-controls="faq"
          aria-selected="false"
          class="inline-block p-4 w-full bg-gray-50 rounded-tr-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          @click="selectTab('others-tab')"
          :class="tabId === 'others-tab' ? 'bg-gray-100 dark:bg-gray-600' : ''"
        >
          Others
        </button>
      </li>
    </ul>
    <div
      id="fullWidthTabContent"
      class="border-t border-gray-200 dark:border-gray-600"
    >
      <div
        class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        :class="tabId === 'information-tab' ? '' : 'hidden'"
        id="stats"
        role="tabpanel"
        aria-labelledby="stats-tab"
      >
        <dl
          class="grid grid-cols-2 gap-8 p-4 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8"
        >
          <div class="flex flex-col justify-center items-center">
            <dt class="mb-2 text-2xl font-extrabold">
              {{ showInfo.premiered ? showInfo.premiered : '---' }}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">
              Premiered
            </dd>
          </div>
          <div class="flex flex-col justify-center items-center">
            <dt class="mb-2 text-2xl font-extrabold">
              {{ showInfo.ended ? showInfo.ended : '---' }}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">Ended</dd>
          </div>
          <div class="flex flex-col justify-center items-center">
            <dt class="mb-2 text-3xl font-extrabold">
              {{ showInfo.averageRuntime }}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">
              AverageRuntime
            </dd>
          </div>
          <div class="flex flex-col justify-center items-center">
            <dt class="mb-2 text-3xl font-extrabold">
              {{
                showInfo.webChannel?.name ? showInfo.webChannel?.name : '---'
              }}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">
              WebChannel
            </dd>
          </div>
          <div class="flex flex-col justify-center items-center">
            <dt class="mb-2 text-3xl font-extrabold">
              {{ showInfo.network?.name ? showInfo.network?.name : '---' }}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">Network</dd>
          </div>
          <div class="flex flex-col justify-center items-center">
            <dt class="mb-2 text-xl font-extrabold">{{ showInfo.status }}</dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">Status</dd>
          </div>
        </dl>
      </div>
      <div
        class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 flex justify-center items-center"
        :class="tabId === 'story-tab' ? '' : 'hidden'"
        id="about"
        role="tabpanel"
        aria-labelledby="about-tab"
      >
        <div
          class="text-white w-[80%] py-5 leading-9 text-lg tracking-wide [&>p>b]:text-yellow-100 [&>p>b]:px-2"
          v-html="showInfo.summary"
        />
        <!-- {{ showInfo.summary?.slice(3, -4).startsWith("<b>")?showInfo.summary?.slice(3, -4).split('>')[2]:showInfo.summary?.slice(3, -4) }} -->
      </div>
      <div
        class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        :class="tabId === 'others-tab' ? '' : 'hidden'"
        id="faq"
        role="tabpanel"
        aria-labelledby="faq-tab"
      >
        <div
          id="accordion-flush"
          data-accordion="collapse"
          data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          data-inactive-classes="text-gray-500 dark:text-gray-400"
        >
          <h2 id="heading-1">
            <button
              type="button"
              class="flex justify-between items-center py-5 w-full font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
              data-accordion-target="#accordion-flush-body-1"
              aria-expanded="true"
              aria-controls="accordion-flush-body-1"
              @click="
                others_1_isOpen ? (others_1_isOpen = 0) : (others_1_isOpen = 1)
              "
            >
              <span>Official site ?</span>
              <svg
                data-accordion-icon
                class="w-6 h-6 shrink-0"
                :class="others_1_isOpen ? '' : 'rotate-180'"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          <div
            id="accordion-flush-body-1"
            aria-labelledby="accordion-flush-heading-1"
            :class="others_1_isOpen ? '' : 'hidden'"
          >
            <div
              class="py-5 font-light border-b border-gray-200 dark:border-gray-700"
            >
              <a
                :href="showInfo.officialSite"
                target="_blank"
                class="text-blue-600 dark:text-blue-500 hover:underline"
              >
                {{ showInfo.officialSite }}
              </a>
            </div>
          </div>
          <h2 id="heading-2">
            <button
              type="button"
              class="flex justify-between items-center py-5 w-full font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
              data-accordion-target="#accordion-flush-body-2"
              aria-expanded="false"
              aria-controls="accordion-flush-body-2"
              @click="
                others_2_isOpen ? (others_2_isOpen = 0) : (others_2_isOpen = 1)
              "
            >
              <span>TVmaze URL ?</span>
              <svg
                data-accordion-icon
                class="w-6 h-6 shrink-0"
                :class="others_2_isOpen ? '' : 'rotate-180'"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          <div
            id="accordion-flush-body-2"
            aria-labelledby="accordion-flush-heading-2"
            :class="others_2_isOpen ? '' : 'hidden'"
          >
            <div
              class="py-5 font-light border-b border-gray-200 dark:border-gray-700"
            >
              <a
                :href="showInfo.officialSite"
                target="_blank"
                class="text-blue-600 dark:text-blue-500 hover:underline"
              >
                {{ showInfo.url }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
