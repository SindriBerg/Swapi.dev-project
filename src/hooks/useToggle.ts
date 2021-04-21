import { useState } from "react";

//Simple hook to handle swapping boolean values.
export function useToggle(arg = false) {
  //default value = false
  const [value, setValue] = useState(arg);
  //we set the value to be what it is not (!)
  return [
    value,
    (val?: boolean) => setValue((prev) => (val !== undefined ? val : !prev)),
  ] as const;
}
