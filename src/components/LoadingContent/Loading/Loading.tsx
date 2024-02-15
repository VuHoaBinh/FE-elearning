import React from "react";
import { BeatLoader } from "react-spinners";

interface LoadingProps {
  color?: string;
  size?: number;
  loading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  color = "#8376d7",
  loading = true,
  size = 10,
}) => {
  return <BeatLoader color={color} loading={loading} size={size} />;
};

export default Loading;
