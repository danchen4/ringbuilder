export function sortArrayObject(key: string | number, array: any[], desc: boolean) {
  let arrayCopy = [...array];
  if (desc) {
    arrayCopy.sort((a, b) => a[key] - b[key]);
  } else {
    arrayCopy.sort((a, b) => b[key] - a[key]);
  }
  return arrayCopy;
}
