export function getBubbleSortAnimations(array) {
  const animations = [];
  for (let lastUnsortedIndex = array.length-1; lastUnsortedIndex > 0 ; lastUnsortedIndex--) {
    for (let i = 0; i < lastUnsortedIndex ; i++) {
      animations.push([i, i + 1])
      animations.push([i, i + 1])
      if (array[i] > array[i+1]) {
        animations.push([true, i + 1, array[i]]);
        swap(array, i, i+1);
      } else {
        animations.push([[false]]);
      }
    }
  }
  return animations;
}

export function getSelectionSortAnimations(array) {
  var animations = [];
  for (let lastUnsortedIndex = array.length - 1; lastUnsortedIndex > 0 ; lastUnsortedIndex--) {
    let largestIndex = 0;
    for (let i = 1; i <= lastUnsortedIndex ; i++) {
      animations.push(["color", i, largestIndex])
      animations.push(["color", i, largestIndex])
      if (array[i] > array[largestIndex]) {
        largestIndex = i;
      }
    }
    animations.push([true, largestIndex, array[largestIndex], lastUnsortedIndex]);
    animations.push([[false]]);
    swap(array, largestIndex, lastUnsortedIndex);
  }   
  return animations;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function getInsertionSortAnimations(array) {
  console.log(array);
  var animations = [];
  for (let firstUnsortedIndex = 1; firstUnsortedIndex < array.length; firstUnsortedIndex++) {
    let itemToInsert = array[firstUnsortedIndex];
    let i;
    for (i = firstUnsortedIndex; i > 0 && itemToInsert < array[i-1]; i--) {
      animations.push(["color", i, i-1]);
      animations.push(["color", i, i-1]);
      animations.push([true, i, i-1]);
      animations.push([[false]]);
      array[i] = array[i-1];
    }
    animations.push(["insert", i, itemToInsert]);
    animations.push([[false]]);
    array[i] = itemToInsert;
  }
  return animations;
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
  
function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(array, left, right, animations){
  console.log(array);
  let pivot;
  let partitionIndex;

  if(left < right) {
    pivot = right;
    partitionIndex = partition(array, pivot, left, right, animations);
    
    quickSort(array, left, partitionIndex - 1, animations);
    quickSort(array, partitionIndex + 1, right, animations);
  }
  return array;
}
   
function partition(array, pivot, left, right, animations){
  let pivotValue = array[pivot];
  let partitionIndex = left;

  for(let i = left; i < right; i++) {
    animations.push(["color", i, pivot]);
    animations.push(["color", i, pivot]);
    if(array[i] < pivotValue){
      console.log("rodando");
      animations.push([true, i, partitionIndex, array[partitionIndex]]);
      animations.push([[false]]);
      swap(array, i, partitionIndex);
      partitionIndex++;
    }
  }
  animations.push([true, right, partitionIndex, array[partitionIndex]]);
  animations.push([[false]]);
  swap(array, right, partitionIndex);
  return partitionIndex;
}