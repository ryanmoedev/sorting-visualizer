export function getQuickSortAnimations(array) {
  const animations = [];
  const sortedArray = quickSort(array, animations);
  return animations;
}
function quickSort(array, animations) {
  quickSortHelper(array, 0, array.length - 1, animations);
  return array;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;

  let pivot = startIdx;
  let left = pivot + 1;
  let right = endIdx;
  animations.push({ type: "pivot", index: pivot });
  animations.push({ type: "left", index: left });
  animations.push({ type: "right", index: right });
  while (right >= left) {
    if (array[left] > array[pivot] && array[right] < array[pivot]) {
      animations.push({ type: "swap", index: [left, right], newHeight: [array[right], array[left]] });
      swap(left, right, array);
    }
    if (array[left] <= array[pivot]) {
      animations.push({ type: "left", index: left });
      left++;
    }
    if (array[right] >= array[pivot]) {
      animations.push({ type: "right", index: right });
      right--;
    }
  }
  animations.push({ type: "swap", index: [right, pivot], newHeight: [array[pivot], array[right]] });
  swap(right, pivot, array);
  if (right - 1 - startIdx < endIdx - (right + 1)) {
    quickSortHelper(array, startIdx, right - 1, animations);
    quickSortHelper(array, right + 1, endIdx, animations);
  } else {
    quickSortHelper(array, right + 1, endIdx, animations);
    quickSortHelper(array, startIdx, right - 1, animations);
  }
  return array;
}
function swap(a, b, array) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
