<template>
  <div class="home body row flex justify-content-center">
    <div class="nav d-flex justify-content-center">
      <div class="sorting-button">
        <label for="arraySize" class="form-label">Array Size</label>
        <input
          type="range"
          class="form-range"
          min="10"
          max="100"
          step="10"
          v-model="arraySize"
          id="arraySize"
        />
      </div>
      <div class="sorting-button">
        <label for="sortingSpeed" class="form-label">Sorting Speed</label>
        <input
          type="range"
          class="form-range"
          min="10"
          max="3000"
          step="10"
          v-model="sortingSpeed"
          id="sortingSpeed"
        />
      </div>

      <div class="button-splitter"></div>
      <button
        @click="
          resetArray();
          sortingAlgo = 'array';
        "
        class="sorting-button"
      >
        <h4>Reset Array</h4>
      </button>
      <div class="button-splitter"></div>
      <button
        class="sorting-button"
        @click="
          if (sortingAlgo == 'merge') {
            sort = true;
          } else {
            sortingAlgo = 'merge';
          }
        "
      >
        <h4>Merge Sort</h4>
      </button>
      <button
        class="sorting-button"
        @click="
          if (sortingAlgo == 'quick') {
            sort = true;
          } else {
            sortingAlgo = 'quick';
          }
        "
      >
        <h4>Quick Sort</h4>
      </button>
      <div class="button-splitter"></div>
      <!-- <button class="sorting-button" @click="sortArray">
          <h4>Sort</h4></button
        > -->
    </div>
    <div>
      <Array v-bind:array="array" v-if="sortingAlgo === 'array'" />
      <MergeSort
        v-bind:array="array"
        v-bind:highlight="highlight"
        v-bind:animationSpeed="animationSpeed"
        v-bind:sort="sort"
        v-bind:sortingSpeed="sortingSpeed"
        v-if="sortingAlgo === 'merge'"
      />
      <QuickSort
        v-bind:array="array"
        v-bind:highlight="highlight"
        v-bind:animationSpeed="animationSpeed"
        v-bind:sort="sort"
        v-bind:sortingSpeed="sortingSpeed"
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
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import { sleep } from "@/scripts/sleep.ts";
import { randomIntFromInterval } from "@/scripts/generateRandomNumber";
import Array from "@/components/Array.vue";
import MergeSort from "@/components/MergeSort.vue"; // @ is an alias to /src
import QuickSort from "@/components/QuickSort.vue";
import BubbleSort from "@/components/BubbleSort.vue";

export default defineComponent({
  name: "Home",
  components: {
    Array,
    MergeSort,
    QuickSort,
    //BubbleSort,
  },
  setup() {
    const animationSpeed: number[] = reactive([50]);
    const array: number[] = reactive([]);
    const arraySize = ref(50);
    const highlight: number[] = reactive([]);
    const sort = ref(false);
    const sortingAlgo = ref("array");
    const sortingSpeed = ref(50);

    watch(arraySize, (arraySize, prevArraySize) => {
      if (arraySize != prevArraySize) {
        resetArray();
      }
    });
    watch(sortingAlgo, (sortingAlgo, prevSortingAlgo) => {
      if (sortingAlgo != prevSortingAlgo) {
        resetArray(prevSortingAlgo);
      }
    });
    async function resetArray(prevSortingAlgo?: string) {
      if (sort.value == true) sort.value = false;
      animationSpeed[0] = 0;
      if (prevSortingAlgo != "array") {
        await sleep(sortingSpeed.value);
      }
      animationSpeed[0] = sortingSpeed.value;
      array.splice(0);
      for (let i = 0; i < arraySize.value; ++i) {
        array.push(randomIntFromInterval(5, 750));
      }
    }

    return {
      animationSpeed,
      array,
      arraySize,
      highlight,
      sort,
      sortingAlgo,
      sortingSpeed,
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
  padding: 5px 0px;
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
