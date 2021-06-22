<template>
  <div class="home body row flex justify-content-center">
    {{ speedSize }}
    <div class="mx-auto">
      <div class="nav d-flex justify-content-center">
        <div class="sorting-button">
          <label for="speedSize" class="form-label">Array Size</label>
          <input
            type="range"
            class="form-range"
            min="10"
            max="100"
            step="10"
            v-model="speedSize"
            id="speedSize"
          />
        </div>

        <div class="button-splitter"></div>
        <button @click="resetArray" class="sorting-button">
          <h4>Reset Array</h4>
        </button>
        <div class="button-splitter"></div>
        <button class="sorting-button" @click="sortingAlgo = 'merge'">
          <h4>Merge Sort</h4>
        </button>
        <button class="sorting-button" @click="sortingAlgo = 'quick'">
          <h4>Quick Sort</h4>
        </button>
        <div class="button-splitter"></div>
        <button class="sorting-button" @click="sortArray"><h4>Sort</h4></button>
      </div>
      <div>
        <MergeSort
          v-bind:array="array"
          v-bind:highlight="highlight"
          v-bind:animationSpeed="animationSpeed"
          v-bind:sort="sort"
          v-bind:speedSize="speedSize"
          v-if="sortingAlgo === 'merge'"
        />
        <QuickSort
          v-bind:array="array"
          v-bind:highlight="highlight"
          v-bind:animationSpeed="animationSpeed"
          v-bind:sort="sort"
          v-bind:speedSize="speedSize"
          v-if="sortingAlgo === 'quick'"
        />
      </div>
    </div>
    <!-- <BubbleSort
    v-bind:array="array"
    v-bind:highlight="highlight"
    v-bind:animationSpeed="animationSpeed"
    v-if="sortingAlgo === 'bubble'"
  /> -->

    <!-- <button style="margin-left: 5px" @click="sortingAlgo = 'bubble'">
    Bubble Sort
  </button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { randomIntFromInterval } from "@/scripts/generateRandomNumber";
import MergeSort from "@/components/MergeSort.vue"; // @ is an alias to /src
import QuickSort from "@/components/QuickSort.vue";
import BubbleSort from "@/components/BubbleSort.vue";

export default defineComponent({
  name: "Home",
  components: {
    MergeSort,
    QuickSort,
    //BubbleSort,
  },
  setup() {
    const speedSize = ref(50);
    const animationSpeed: number[] = reactive([speedSize.value]);
    const array: number[] = reactive([]);
    const highlight: number[] = reactive([]);
    const sort = ref(false);
    function sortArray() {
      sort.value = !sort.value;
    }
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
      sort,
      sortArray,
      sortingAlgo,
      speedSize,
      resetArray,
    };
  },
  mounted() {
    this.resetArray();
  },
});
</script>
<style lang="scss">
$fog: #c9d1c8;
$forest: #304040;
* {
  color: $fog;
  .form-label {
    margin: 0 !important;
  }
}
.nav {
  height: 60px;
  width: auto;
  background: #5b7065;
  border: $forest;
  padding: 5px;
}

.button-splitter {
  width: 5px;
  background: $fog;
  margin: 10px 0px;
}

.sorting-button {
  background: none;
  border: none;
  color: $fog;
  padding: 0px 15px;
}

.array-container {
  margin: auto auto;
  display: flex;
  justify-content: center;
}

.array-bar {
  width: 10px;
  background-color: darkgrey;
  display: inline-block;
  margin: 0 1px;
}
</style>
