import React from "react";

export interface FormEditorProps {
  style?: React.CSSProperties;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: any) => void;
}
