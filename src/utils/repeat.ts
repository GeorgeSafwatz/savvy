import { ReactNode } from "react";

export const repeat = (number: number, element: ReactNode) => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(element);
  }
  return result;
};
