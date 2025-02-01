import { useState, useEffect } from 'react';
import { setTimeout } from 'timers';

const useDebounce = (value:string, delay:number) => {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    } , delay);

    return () => {
      clearTimeout(handler);
    }

  }, [value,delay])

  return debounceVal;
}

export default useDebounce;
