<template>
  <div class="array-container">
    <div
      class="array-bar"
      v-for="(value, index) in array"
      v-bind:key="index"
      :style="changeBackground(index, value)"
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
    animationSpeed: { default: [0] },
    highlight: {
      default: [],
    },
    sort: { default: false },
    sortingSpeed: { default: 3 },
  },
  setup(props) {
    const { animationSpeed, array, highlight, sort, sortingSpeed } = toRefs(
      props
    );
    const highlightVal: number[] = highlight.value;
    const animationSpeedVal: number[] = animationSpeed.value;
    const sorting = ref(false);
    //function checkArray() {
    //const tempArray = array.value.slice(0);
    //tempArray.sort((a, b) => a - b);
    //return tempArray;
    //}
    watch(sort, (sort, prevSort) => {
      if (sort != prevSort) {
        quickSortFunction();
      }
    });

    async function quickSortFunction() {
      if (!sorting.value) {
        sorting.value = true;
        animationSpeedVal[0] = sortingSpeed.value;
        await quicksort(array.value, highlightVal, animationSpeedVal);

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
      } else return "background: #C9D1C8; height:" + value + "px;";
      //return "height:" + value + "px;";
    }
    //return changeBackground
    //quicksort(array.value);
    return { animationSpeedVal, changeBackground, quickSortFunction, sorting };
  },
});
</script>
