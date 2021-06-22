<template>
  {{ array }}
  {{ highlight }}
  <div class="array-container">
    <div
      class="array-bar"
      v-for="(value, index) in array"
      v-bind:key="index"
      :style="changeBackground(index, value)"
    ></div>

    <button style="padding-left: 5px" @click="quickSortFunction">Sort</button>
  </div>
</template>

<script lang="ts">
//:style="changeBackground(index, value)"
import { defineComponent, ref, reactive, toRefs } from "vue";
import { quicksort } from "@/scripts/quicksortAlgorithm";
export default defineComponent({
  components: {},
  props: {
    array: {
      default: [1],
    },
    animationSpeed: { default: [0] },
    highlight: {
      default: [],
    },
  },
  setup(props) {
    const { animationSpeed, array, highlight } = toRefs(props);
    const sorting = ref(false);
    const highlightVal: number[] = highlight.value;
    const animationSpeedVal: number[] = animationSpeed.value;
    async function quickSortFunction() {
      if (!sorting.value) {
        sorting.value = true;
        animationSpeedVal[0] = 10;
        await quicksort(array.value, highlight.value);
        sorting.value = false;
      }
    }

    function changeBackground(index: number, value: number) {
      if (highlightVal[0] == index) {
        return "background: chartreuse; height:" + value + "px;";
      } else if (highlightVal[1] == index || highlightVal[2] == index) {
        if (highlightVal[3] == 0)
          return "background: royalblue; height:" + value + "px;";
        else return "background: crimson; height:" + value + "px;";
      } else return "background: cadetblue; height:" + value + "px;";
      //return "height:" + value + "px;";
    }
    //return changeBackground
    //quicksort(array.value);
    return { changeBackground, quickSortFunction };
  },
});
</script>
