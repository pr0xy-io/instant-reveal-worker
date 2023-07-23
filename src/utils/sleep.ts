/** @description "Pauses" the program for a defined amount of time. */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default sleep;
