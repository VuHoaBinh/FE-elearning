import React from "react";
import { Pagination as PaginationMui } from "@mui/material";

type Color = "primary" | "secondary" | "standard";
type Variant = "outlined" | "text";

interface PaginationProps {
  pageActive?: number;
  total?: number;
  variant?: Variant;
  color?: Color;
  disabled?: boolean;
  onChangeValue?: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  pageActive,
  variant = "outlined",
  color = "primary",
  disabled = false,
  onChangeValue,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChangeValue?.(value);
  };

  return (
    <PaginationMui
      onChange={handleChange}
      page={pageActive}
      count={total}
      color={color}
      variant={variant}
      disabled={disabled}
    />
  );
};
export default Pagination;
