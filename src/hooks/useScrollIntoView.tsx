import { useEffect, useRef } from "react";

export const useScrollIntoView = () => {
  const scrollToTop = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToTop.current &&
      scrollToTop.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
  }, []);

  return scrollToTop;
};
