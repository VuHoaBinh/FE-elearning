import { useEffect, useState } from "react";

export function useTypingDebounce<T>(
  typing_text: T,
  delayTime: number = 1000
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(typing_text);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(typing_text), delayTime);

    return () => {
      clearTimeout(timer);
    };
  }, [typing_text, delayTime]);

  return debouncedValue;
}
