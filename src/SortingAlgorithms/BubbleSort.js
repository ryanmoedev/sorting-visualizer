export function getBubbleSortAnimations(array) {
  const animations = [];
  const sortedArray = bubbleSort(array.slice(), animations);
  console.log(sortedArray);
  return animations;
}

function bubbleSort(array, animations) {
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      animations.push({ type: "focus", index: i });
      animations.push({ type: "focus", index: i + 1 });
      if (array[i] > array[i + 1]) {
        animations.push({ type: "swap", index: [i, i + 1], newHeight: [array[i + 1], array[i]] });
        swap(i, i + 1, array);
        swapped = true;
      }
    }
  }
  return array;
}

function swap(a, b, array) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
