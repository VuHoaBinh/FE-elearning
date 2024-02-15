import IcomoonReact from "icomoon-react";
import React, { CSSProperties } from "react";
import iconSet from "./selection.json";

interface IcoMoonProps {
  icon: string;
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const Icon: React.FC<IcoMoonProps> = ({
  color,
  size,
  icon,
  className,
  onClick,
  style,
}) => {
  return (
    <IcomoonReact
      className={className}
      style={style}
      onClick={onClick}
      iconSet={iconSet}
      color={color ?? "#444"}
      size={size ?? 100}
      icon={icon}
    />
  );
};

export default Icon;
