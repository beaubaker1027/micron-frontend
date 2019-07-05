import { returnElementValue } from "../lib/nesting";

const operators = {
  ">": (a, b) => {
    return a > b;
  },
  "<": (a, b) => {
    return a < b;
  }
};

function mergeSort(array, comparator = undefined, ascending = "<") {
  if (!comparator) {
    return;
  }
  if (array.length === 1) {
    return array;
  }

  let mid = Math.floor(array.length / 2);

  var left = array.slice(0, mid);
  var right = array.slice(mid);

  return merge(
    mergeSort(left, comparator),
    mergeSort(right, comparator),
    comparator,
    ascending
  );
}

function merge(left, right, comparator, ascending) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (
      operators[ascending](
        returnElementValue(left[leftIndex], comparator),
        returnElementValue(right[rightIndex], comparator)
      )
    ) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

export default mergeSort;
