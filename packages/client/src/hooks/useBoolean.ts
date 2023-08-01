import { useCallback, useState } from 'react';

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const setValueToFalse = useCallback(() => {
    setValue(false);
  }, [])

  const setValueToTrue = useCallback(() => {
    setValue(true);
  }, [])

  return { value, setValueToFalse, setValueToTrue };
};
