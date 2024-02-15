import classNames from "classnames";
import React from "react";
import { defaultIMG } from "src/assets";
import "./Image.scss";

interface ImageProps {
  src?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  borderRadius?: number | string;
  onClick?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  borderRadius,
  className,
  onClick,
  ...rest
}) => {
  return (
    <img
      className={classNames("image-content", className)}
      src={src || defaultIMG}
      alt="img alt"
      style={{ width, height, borderRadius }}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Image;
