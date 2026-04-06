// Merge Sort for comparison-based sorting algorithms
export function mergeSort<T>(array: T[], compareFn: (a: T, b: T) => number): T[] {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid), compareFn);
  const right = mergeSort(array.slice(mid), compareFn);

  return merge(left, right, compareFn);
}

function merge<T>(left: T[], right: T[], compareFn: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (compareFn(left[i]!, right[j]!) <= 0) {
      result.push(left[i]!);
      i++;
    } else {
      result.push(right[j]!);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}