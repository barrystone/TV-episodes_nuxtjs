<script setup lang="ts">
const route = useRoute();
console.log('route-params-id', route.params.id);
</script>

<template>
  <div>
    <h1>
      {{ $route.params.id }}
    </h1>
    <!-- Because  :  const route = useRoute(); -->
    <!-- still work in bellow method, no $ behind -->
    {{ route.params.id }}
  </div>
</template>
