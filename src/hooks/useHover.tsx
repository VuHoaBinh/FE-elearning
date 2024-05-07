import React, { useEffect, useState } from "react";

export const useHover = () => {
  const nodeRef = React.useRef<any>(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!nodeRef.current) return;
    const dom = nodeRef.current;

    const handleMouseOver = () => {
      window.screen.width > 900 && setShow(true);
    };

    const handleMouseOut = () => {
      setShow(false);
    };

    dom.addEventListener("mouseover", handleMouseOver);
    dom.addEventListener("mouseout", handleMouseOut);
    return () => {
      dom.removeEventListener("mouseover", handleMouseOver);
      dom.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return {
    nodeRef,
    show,
  };
};
