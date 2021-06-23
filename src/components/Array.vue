<template>
  <div class="array-container">
    <div
      class="array-bar"
      v-for="(value, index) in array"
      v-bind:key="index"
      :style="'background: #C9D1C8; height:' + value + 'px;'"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
import { quicksort } from "@/scripts/quicksortAlgorithm";
export default defineComponent({
  props: {
    array: {
      default: [1],
    },
  },
  setup(props) {
    const { array } = toRefs(props);
    //return changeBackground
    //quicksort(array.value);
  },
});
</script>
