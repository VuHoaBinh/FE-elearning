import React from "react";
import "./LoadingSkeleton.scss";

interface LoadingSkeletonProps {
  amount?: number;
  maxWidth?: number;
  width?: number;
  maxHeight?: number;
  height?: number;
  borderRadius?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  amount = 4,
  width = 300,
  height = 250,
  maxWidth,
  maxHeight,
  borderRadius = 0,
}) => {
  return (
    <>
      {Array(amount)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="skeleton"
            style={{ maxWidth, maxHeight, borderRadius, height, width }}
          ></div>
        ))}
    </>
  );
};

export default LoadingSkeleton;
