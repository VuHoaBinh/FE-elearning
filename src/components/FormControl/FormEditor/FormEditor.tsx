import ReactQuill from "react-quill";
import { FormEditorProps } from "./FormEditor.type";

const FormEditor: React.FC<FormEditorProps> = ({
  defaultValue,
  value,
  onChange,
  placeholder = "Nhập nội dung tiêu đề",
  style,
}) => {
  return (
    <ReactQuill
      style={style}
      defaultValue={defaultValue}
      value={value}
      theme="snow"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default FormEditor;
