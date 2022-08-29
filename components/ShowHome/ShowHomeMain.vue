<script setup lang="ts">
interface Props {
  showInfo: { name: string };
}
const props = defineProps<Props>();
// const props = defineProps({
//   showInfo: Object
// });
// const props = withDefaults(defineProps<Props>(), {
//   showInfo: null
// });
</script>

<!-- <script lang="ts">
export default {
  props: ['showInfo'],
  setup() {}
}; 
</script> -->

<template>
  <h1>ShowHomeMain props(showInfo.name): {{ showInfo.name }}</h1>
</template>
