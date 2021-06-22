import {sleep} from "@/scripts/sleep.ts"
export async function mergeSort(array: number[], highlight: number[], animationSpeedArray: number[]) {
  const animations: number[][] = [[]];
  const auxiliaryArray: number[] = array.slice()
  merge(auxiliaryArray, animations, new Array(array.length), 0, array.length - 1)
  await animate(animations, array, highlight, animationSpeedArray)
  return
}



async function animate(animations: number[][], array: number[], highlight: number[], animationSpeedArray: number[]) {
  for (let i = 0; i < animations.length; ++i) {
    //console.log(animationSpeed)
    const animationSpeed = animationSpeedArray[0]
    // values to be swapped
    const index = animations[i][0]
    const swapIndex = animations[i][1]

    highlight[0] = index;
    highlight[1] = swapIndex;
    highlight[2] = -1;

    if (animationSpeed > 0)
      await sleep(animationSpeed)

    const tempArray: number[] = []
    //From this comparison, you know that the index infront was the comparison index
    let counter = 0;
    for (let x = index; x <= swapIndex; x++) {
      const test = array[x]
      tempArray.push(test)
    }

    if (animationSpeed > 0)
      await sleep(animationSpeed)

    highlight[1] = index + 1;
    array[index] = array[swapIndex];
    highlight[2] = index;
    //console.log(tempArray)
    for (let x = index + 1; x <= swapIndex; x++) {
      array[x] = tempArray[counter]
      counter++
      //console.log(`counter ${counter} and tempArraylen ${tempArray.length}`)
    }
    //}, i * 15);
  }
  highlight[0] = -1;
  highlight[1] = -1;
  highlight[2] = -1;
}


export function merge(auxiliaryArray: number[], animations: number[][], temp: number[], leftStart: number, rightEnd: number) {
  if (leftStart >= rightEnd) {
    return;
  }
  const middle = Math.floor((leftStart + rightEnd) / 2);
  merge(auxiliaryArray, animations, temp, leftStart, middle)
  merge(auxiliaryArray, animations, temp, middle + 1, rightEnd)
  mergeHalves(auxiliaryArray, animations, temp, leftStart, rightEnd)
}


export function mergeHalves(auxiliaryArray: number[], animations: number[][], temp: number[], leftStart: number, rightEnd: number) {
  const leftEnd = Math.floor((rightEnd + leftStart) / 2)
  const rightStart = leftEnd + 1;
  const size = rightEnd - leftStart + 1;

  let left = leftStart
  let right = rightStart
  let index = leftStart

  while (left <= leftEnd && right <= rightEnd) {
    if (auxiliaryArray[left] <= auxiliaryArray[right]) {
      temp[index] = auxiliaryArray[left];
      //animations.push([index, left])
      left++;
    } else {
      temp[index] = auxiliaryArray[right]
      animations.push([index, right])
      right++;
    }
    index++;
  }

  //console.log(temp)
  //console.log(temp)
  copyRemainder(auxiliaryArray, left, temp, index, leftEnd - left + 1)
  copyRemainder(auxiliaryArray, right, temp, index, rightEnd - right + 1)
  copyRemainder(temp, leftStart, auxiliaryArray, leftStart, size)
  //console.log(temp)
  //console.log(temp)
}

export function copyRemainder(from: number[], start: number, to: number[], startingIndex: number, length: number) {
  let i: number, si: number;
  for (i = start, si = startingIndex; i < start + length; i++, si++) {
    to[si] = from[i]
    //animations
  }
}


