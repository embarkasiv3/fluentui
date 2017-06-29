export function findIndex(array: any[], cb: (item: any, index?: number) => boolean): number {
  let index = -1;

  for (let i = 0; array && i < array.length; i++) {
    if (cb(array[i], i)) {
      index = i;
      break;
    }
  }

  return index;
}

export function createArray(size: number, getItem: (index?: number) => any) {
  let array = [];

  for (let i = 0; i < size; i++) {
    array.push(getItem(i));
  }

  return array;
}

/**
 * Convert the given array to a matrix with columnCount number
 * of columns
 * @param items - The array to convert
 * @param columnCount - The number of columns for the resulting matrix
 * @returns {any[][]} - A matrix of items
 */
export function toMatrix<T>(items: T[], columnCount: number): T[][] {
  return items.reduce((rows, currentValue, index) => {
    if (index % columnCount === 0) {
      rows.push([currentValue]);
    } else {
      rows[rows.length - 1].push(currentValue);
    }
    return rows;
  }, [] as T[][]);
}
