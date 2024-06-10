import { useEffect, useRef } from "react";

export const useUpdateEffect = (fn: any, value: any) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, value);
};