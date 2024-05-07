/**
 * Now, it has not support upload multiple files yet
 */

import React from "react";

export interface InputUploadFileProps {
  label?: string;
  value?: string | string[];
  valueDefault?: string;
  onChange: (value: any) => void;
  multiple?: boolean;
  errorMessage?: string;
  labelImg?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
