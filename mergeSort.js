// Assignment for The Odin Project
// Merge sort algorithm modified for binary search tree assignment to remove duplicates

// mergeSort takes an unsorted array (arr),
// and cuts it in half recursively until there is a single element in each array (leftSorted, rightSorted)
// Merge is called to sort the two arrays,
// and mergeSort unwinds itself to get to the next pair of arrays to merge
export default function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  const leftSorted = mergeSort(left);
  const rightSorted = mergeSort(right);
  return merge(leftSorted, rightSorted);
}

// merge takes two arrays and merges them in order
function merge(left, right) {
  const sortedArr = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    // Removes duplicates!
    if (left[i] === right[j]) {
      i++;
      continue;
    }

    if (left[i] < right[j]) {
      sortedArr.push(left[i]);
      i++;
    } else {
      sortedArr.push(right[j]);
      j++;
    }
  }

  // Remaining values from array concatenated to sortedArr, and returned
  if (i >= left.length) {
    return sortedArr.concat(right.slice(j));
  } else {
    return sortedArr.concat(left.slice(i));
  }
}
