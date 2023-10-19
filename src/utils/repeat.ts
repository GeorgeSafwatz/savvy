import { ReactNode } from "react";

/**
 * ## Repeat
 * Repeats an element a specified number of times and returns an array containing the repeated elements.
 *
 * @param {number} number - The number of times to repeat the element.
 * @param {ReactNode} element - The element to be repeated.
 * @return {ReactNode[]} An array containing the repeated elements.
 */
export const repeat = (number: number, element: ReactNode): ReactNode[] => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(element);
  }
  return result;
};
