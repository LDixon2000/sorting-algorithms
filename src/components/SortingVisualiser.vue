<template>
  <button class="btn" style="padding-left: 5px" @click="mergeSortFunction">
    Sort
  </button>
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
import { defineComponent, ref, reactive, toRefs } from "vue";
import { randomIntFromInterval } from "@/scripts/generateRandomNumber";
import { mergeSort } from "@/scripts/sortingAlgorithms.ts";
export default defineComponent({
  name: "SortingVisualiser",
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
    //const state = reactive({
    //array: [0],
    //});
    const { array } = toRefs(props);
    const { highlight } = toRefs(props);
    const { animationSpeed } = toRefs(props);
    const highlightVal: number[] = highlight.value;
    const animationSpeedVal: number[] = animationSpeed.value;

    const sorting = ref(false);

    async function mergeSortFunction() {
      if (!sorting.value) {
        sorting.value = true;
        console.log(sorting.value);
        animationSpeedVal[0] = 10;
        await mergeSort(array.value, highlightVal, animationSpeedVal);

        sorting.value = false;
      }
      //const mergedArray: number[] = mergeSort(tempArray);
      //for (let i = 0; i < mergedArray.length; i++) {
      //array[i] = mergedArray[i];)
      //}
    }

    function changeBackground(index: number, value: number) {
      if (highlightVal[2] == index) {
        return "background: chartreuse; height:" + value + "px;";
      } else if (highlightVal[0] == index) {
        return "background: royalblue; height:" + value + "px;";
      } else if (highlightVal[1] == index && highlightVal[2] == -1) {
        return "background: crimson; height:" + value + "px;" + "flex";
      } else return "background: cadetblue; height:" + value + "px;";
      //return "height:" + value + "px;";
    }

    return {
      changeBackground,
      randomIntFromInterval,
      mergeSort,
      mergeSortFunction,
      sorting,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
