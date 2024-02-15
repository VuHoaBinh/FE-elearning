import React, { useCallback, useEffect, useState } from "react";

export const useClickOutSide = (nodeHtml?: string) => {
  const nodeRef = React.useRef<any>(null);
  const [show, setShow] = useState(false);

  const handleClickOutSide = useCallback(
    (event: Event) => {
      const target = event.target as HTMLTextAreaElement;

      if (!nodeRef.current) return;

      if (nodeHtml) {
        !nodeRef.current.contains(target) &&
          target.matches(nodeHtml) &&
          setShow(false);
      } else {
        !nodeRef.current.contains(target) && setShow(false);
      }
    },
    [nodeHtml]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [handleClickOutSide]);

  return { nodeRef, show, setShow };
};
