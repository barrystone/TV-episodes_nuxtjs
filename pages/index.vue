<script setup lang="ts">
let homeDefaultSearchValue = 'breaking';
</script>

<template>
  <TVLists :searchedText="homeDefaultSearchValue" :isHome="true" />
</template>
