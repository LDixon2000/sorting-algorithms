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
import { mergeSort } from "@/scripts/mergesortAlgorithm";
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
    const { array, animationSpeed, highlight, sort, sortingSpeed } = toRefs(
      props
    );
    const highlightVal: number[] = highlight.value;
    const animationSpeedVal: number[] = animationSpeed.value;

    const sorting = ref(false);

    watch(sort, (sort, prevSort) => {
      if (sort != prevSort) {
        mergeSortFunction();
        sort = prevSort;
      }
    });
    async function mergeSortFunction() {
      if (!sorting.value) {
        sorting.value = true;
        animationSpeedVal[0] = sortingSpeed.value;
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
        //Bar being inserted.
        return "background: chartreuse; height:" + value + "px;";
      } else if (highlightVal[0] == index) {
        //Comparison bar.
        return "background: royalblue; height:" + value + "px;";
      } else if (highlightVal[1] == index && highlightVal[2] == -1) {
        //Bar to be moved.
        return "background: crimson; height:" + value + "px;";
      } else return "background: #C9D1C8; height:" + value + "px;";
      //return "height:" + value + "px;";
    }

    return {
      animationSpeedVal,
      changeBackground,
      mergeSortFunction,
      sorting,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
