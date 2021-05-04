import React, { FunctionComponent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent = ({ children }) => {
  const elementRef = useRef<HTMLElement | null>(null);
  if (!elementRef.current) {
    const div = document.createElement("div");
    elementRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return;
    modalRoot.appendChild(elementRef.current!);

    return () => {
      modalRoot.removeChild(elementRef.current!);
    };
  }, []);

  return createPortal(<div>{children}</div>, elementRef.current);
};

export default Modal;
