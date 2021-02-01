export function clean(arr: string[]) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      arr.splice(i, 1);
    }
  }
  return arr;
}
