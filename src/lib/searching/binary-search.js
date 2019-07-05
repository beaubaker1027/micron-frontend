import { returnElementValue } from "../lib/nesting";

function binarySearch(array, comparator, x, left, right) {
  left = 0;
  right = array.length - 1;
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    let midValue = returnElementValue(array[mid], comparator);
    if (midValue.toString() === x.toString()) {
      return array[mid];
    } else if (x < midValue) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return false;
}

export default binarySearch;
