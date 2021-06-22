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
//:style="changeBackground(index, value)"
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
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
    sort: { default: false },
    speedSize: { default: 3 },
  },
  setup(props) {
    const { animationSpeed, array, highlight, sort, speedSize } = toRefs(props);
    const highlightVal: number[] = highlight.value;
    const animationSpeedVal: number[] = animationSpeed.value;
    const sorting = ref(false);

    watch(sort, async (sort, prevSort) => {
      if (sort != prevSort) {
        quickSortFunction();
        sort = false;
      }
    });
    async function quickSortFunction() {
      if (!sorting.value) {
        sorting.value = true;
        animationSpeedVal[0] = speedSize.value;
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
      } else return "background: #C9D1C8; height:" + value + "px;";
      //return "height:" + value + "px;";
    }
    //return changeBackground
    //quicksort(array.value);
    return { changeBackground, quickSortFunction };
  },
});
</script>
