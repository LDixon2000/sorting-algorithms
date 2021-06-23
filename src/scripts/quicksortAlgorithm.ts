import {sleep} from "@/scripts/sleep.ts"
export async function quicksort(array: number[], highlight: number[], animationSpeedArray: number[]) {
  const animations: number[][] = []
  const switchArray: number[][] = []
  const tempArray = array.slice(0)
  sort(tempArray, animations, switchArray, 0, array.length - 1)
  await animate(array, highlight, animations, switchArray, animationSpeedArray)
  return
}
async function animate(array: number[], highlight: number[], animations: number[][], switchArray: number[][], animationSpeedArray: number[]) {
  let counter = 0;
  highlight[0] = -1
  highlight[1] = -1
  highlight[2] = -1
  highlight[3] = -1
  for (let i = 0; i < animations.length; ++i) {
    const animationSpeed = animationSpeedArray[0] / 2
    if (animationSpeed > 0)
      await (sleep(animationSpeed))
    if (animations[i][3] == 1) {
      const left = animations[i][1]
      const right = animations[i][2]
      array[left] = switchArray[counter][0]
      array[right] = switchArray[counter][1]
      counter++;
    }

    for (let x = 0; x < animations[i].length; x++) {
      highlight[x] = animations[i][x]
    }
    if (animationSpeed > 0)
      await (sleep(animationSpeed))
  }

  highlight[0] = -1
  highlight[1] = -1
  highlight[2] = -1
  highlight[3] = -1
}
function sort(array: number[], animations: number[][], switchArray: number[][], left: number, right: number) {
  if (left >= right) return
  const pivot: number = array[Math.floor((left + right) / 2)]
  //console.log(`right ${right} left ${left} pivot ${pivot} `)
  const index: number = partition(array, animations, switchArray, left, right, pivot);
  sort(array, animations, switchArray, left, index - 1);
  sort(array, animations, switchArray, index, right);
}

function partition(array: number[], animations: number[][], switchArray: number[][], left: number, right: number, pivot: number) {
  const middle = Math.floor((left + right) / 2)
  while (left <= right) {
    while (array[left] < pivot) {
      left++;
      addAnimation(array, animations, middle, left, right)
    }

    while (array[right] > pivot) {
      right--;

      addAnimation(array, animations, middle, left, right)
    }

    if (left <= right) {
      swap(array, animations, switchArray, left, right, middle);
      left++;
      right--;
    }
  }
  return left
}

function swap(array: number[], animations: number[][], switchArray: number[][], left: number, right: number, pivot: number) {
  addAnimation(array, animations, pivot, left, right, 1)
  console.log(`${left} : ${pivot} : ${right} `)
  const temp = array[left]
  const temp2 = array[right]
  switchArray.push([temp2, temp])
  array[left] = temp2;
  array[right] = temp

}

function addAnimation(
  array: number[], animations: number[][], evaluating: number, left: number, right: number, swap = 0) {
  const tempArray: number[] = []
  tempArray.push(evaluating)
  tempArray.push(left)
  tempArray.push(right)
  tempArray.push(swap)
  animations.push(tempArray)
}


