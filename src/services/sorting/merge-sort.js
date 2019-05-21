const operators = {
  ">": (a,b)=>{return a>b},
  "<": (a,b)=>{return a<b}
}

function mergeSortObjects(array, comparator = undefined, ascending = "<"){
  if(!comparator) {
    return
  }
  if(array.length === 1) { return array; }

  let mid = Math.floor(array.length/2);

  var left = array.slice(0, mid);
  var right = array.slice(mid);

  return merge(mergeSortObjects(left, comparator),
      mergeSortObjects(right, comparator),
      comparator, ascending);
}

function merge(left, right, comparator, ascending){
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if(operators[ascending](elementContainsObject(left, leftIndex, comparator), elementContainsObject(right, rightIndex, comparator))){
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function elementContainsObject(array, index, nested){
  if(!nested){
    return array[index];
  }
  if(typeof array[index] !== "object"){
    throw new Error(`Element ${JSON.stringify(array[index])} does not contain the nested key ${nested}`)
  }
  return array[index][nested]
}
