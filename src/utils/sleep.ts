/**
 * @title Sleep
 * @description Pauses the execution of the program for the specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to "sleep" for
 * @returns the promise to be awaited
 */
export default (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
