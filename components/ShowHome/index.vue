<!-- 方法一：<script setup>處理 props  --------------------------->
<!-- <script setup>
const props = defineProps({
  showInfo: Object
});
</script> -->

<!-- 用以下元件 export default（方法二），可以避免底下此元件與子元件重複使用 <script setup>處理 props(方法一) 
，解決「 Cannot redeclare block-scoped variable 'props '」的問題(雖可用不同變數命名方式解決，是因無 export{} 無法辨識變數的問題)   -->

<!-- 方法二： export default 處理 props --------------------------->
<script lang="ts">
export default {
  props: ['showInfo'],
  setup() {}
};
</script>

<template>
  <ShowHomeMain :showInfo="showInfo" />
  <ShowHomeSub :showInfo="showInfo" />
</template>
