import { useEffect, useRef } from 'react';

export function useEffectUpdate(func, deps) {
  const isFirstRender = useRef(true);
 
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
      
    return func()
  }, deps)
}