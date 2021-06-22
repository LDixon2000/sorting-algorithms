export async function animate(animations: number[], array: number[], index: number, changeIndex: number) {
  console.log("test")
  const tempArray: number[] = array.slice(0, index - 1);
  tempArray.push(array[changeIndex]);
  tempArray.concat(array.slice(index, changeIndex - 1))
  tempArray.concat(array.slice(changeIndex + 1))
  for (let i = 0; i < tempArray.length; i++) {
    animations[i] = tempArray[i]
  }
}


const timer = (ms: number) => new Promise(res => setTimeout(res, ms))
