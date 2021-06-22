<template>
  <div class="home"></div>
  {{ animationSpeed }}
  <MergeSort
    v-bind:array="array"
    v-bind:highlight="highlight"
    v-bind:animationSpeed="animationSpeed"
    v-if="sortingAlgo === 'merge'"
  />
  <QuickSort
    v-bind:array="array"
    v-bind:highlight="highlight"
    v-bind:animationSpeed="animationSpeed"
    v-if="sortingAlgo === 'quick'"
  />
  <BubbleSort
    v-bind:array="array"
    v-bind:highlight="highlight"
    v-bind:animationSpeed="animationSpeed"
    v-if="sortingAlgo === 'bubble'"
  />
  <div>
    <button @click="resetArray">Generate New Array</button>
  </div>
  <button style="margin-left: 5px" @click="sortingAlgo = 'merge'">
    Merge Sort
  </button>
  <button style="margin-left: 5px" @click="sortingAlgo = 'quick'">
    Quick Sort
  </button>
  <button style="margin-left: 5px" @click="sortingAlgo = 'bubble'">
    Bubble Sort
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { randomIntFromInterval } from "@/scripts/generateRandomNumber";
import MergeSort from "@/components/SortingVisualiser.vue"; // @ is an alias to /src
import QuickSort from "@/components/QuickSort.vue";
import BubbleSort from "@/components/BubbleSort.vue";

export default defineComponent({
  name: "Home",
  components: {
    MergeSort,
    QuickSort,
    BubbleSort,
  },
  setup() {
    const animationSpeed: number[] = reactive([30]);
    const array: number[] = reactive([]);
    const highlight: number[] = reactive([]);
    function resetArray() {
      animationSpeed[0] = 0;
      array.splice(0);
      array.push(1);
      for (let i = 0; i < 99; ++i) {
        array.push(randomIntFromInterval(5, 750));
      }
    }
    const sortingAlgo = ref("merge");
    return {
      animationSpeed,
      array,
      highlight,
      sortingAlgo,
      resetArray,
    };
  },
  mounted() {
    this.resetArray();
  },
});
</script>
<style lang="scss">
.array-container {
  margin: auto auto;
}

.array-bar {
  width: 10px;
  background-color: darkgrey;
  display: inline-block;
  margin: 0 1px;
}
</style>
