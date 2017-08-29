/**
 * Helper to find the index of an item within an array, using a callback to
 * determine the match.
 *
 * @public
 * @param array - Array to search.
 * @param cb - Callback which returns true on matches.
 */
export function findIndex<T>(array: T[], cb: (item: T, index: number) => boolean): number {
  let index = -1;

  for (let i = 0; array && i < array.length; i++) {
    if (cb(array[i], i)) {
      index = i;
      break;
    }
  }

  return index;
}

/**
 * Helper to find the first item within an array that satisfies the callback.
 * @param array - Array to search
 * @param cb - Callback which returns true on matches
 */
export function find<T>(array: T[], cb: (item: T, index: number) => boolean): T | undefined {
  let index = findIndex(array, cb);

  if (index < 0) {
    return undefined;
  }

  return array[index];
}

/**
 * Creates an array of a given size and helper method to populate.
 *
 * @public
 * @param size - Size of array.
 * @param getItem - Callback to populate given cell index.
 */
export function createArray<T>(size: number, getItem: (index: number) => T): T[] {
  let array: T[] = [];

  for (let i = 0; i < size; i++) {
    array.push(getItem(i));
  }

  return array;
}

/**
 * Convert the given array to a matrix with columnCount number
 * of columns.
 *
 * @public
 * @param items - The array to convert
 * @param columnCount - The number of columns for the resulting matrix
 * @returns {any[][]} - A matrix of items
 */
export function toMatrix<T>(items: T[], columnCount: number): T[][] {
  return items.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % columnCount === 0) {
      rows.push([currentValue]);
    } else {
      rows[rows.length - 1].push(currentValue);
    }
    return rows;
  }, [] as T[][]);
}

/**
 * Given an array, it returns a new array that does not contain the item at the given index.
 * @param array - The array to operate on
 * @param index - The index of the element to remove
 */
export function removeIndex<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => index !== i);
}