import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { downloadIMG } from "src/assets";
import { notificationMessage } from "src/utils";
import formatCharacter from "src/utils/formatCharacter";
import "./InputUploadFile.scss";
import { InputUploadFileProps } from "./InputUploadFile.type";

const InputUploadFile: React.FC<InputUploadFileProps> = ({
  label,
  value,
  valueDefault,
  multiple = false,
  onChange,
  errorMessage,
  labelImg = true,
  className = "",
  style,
}) => {
  const [imagePreview, setImagePreview] = useState(valueDefault);

  useEffect(() => {
    setImagePreview(valueDefault);
  }, [valueDefault]);

  // const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
  //   const _target = e.target as HTMLInputElement;

  //   if (_target.files && _target.files.length > 0) {
  //     const file = _target.files[0];
  //     const convertBtoMB = formatCharacter.convertIntoMB(file.size);

  //     if (convertBtoMB >= 2) {
  //       return notificationMessage("error", "Hình ảnh không được quá 2MB");
  //     }
  //     onChange(_target.files[0]);

      
  //     // Kiểm tra kích thước của hình ảnh
  //     const img = new Image();
  //     img.onload = () => {
  //       if (img.width > 600 && img.height > 320) {
  //         onChange(file);
  //       } else {
  //         notificationMessage("error", "Kích thước hình ảnh không hợp lệ.");
  //       }
  //     };
  //     img.onerror = () => {
  //       notificationMessage("error", "Không thể đọc kích thước hình ảnh.");
  //     };
      
  //     const url_img = URL.createObjectURL(file);
  //     return setImagePreview(url_img);



  //   } else {
  //     notificationMessage(
  //       "error",
  //       "Định dạng file không được hỗ trợ. Vui lòng chỉ chọn file hình ảnh (*.png, *.jpg, *.jpeg)"
  //     );
  //   }
  // };
 const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
    const _target = e.target as HTMLInputElement;

    if (_target.files && _target.files.length > 0) {
      const file = _target.files[0];

      const convertBtoMB = formatCharacter.convertIntoMB(file.size);

      if (convertBtoMB >= 2) {
        return notificationMessage("error", "Hình ảnh không được quá 2MB");
      }

      // Kiểm tra kích thước của hình ảnh
      const img = new Image();
      img.onload = () => {
        onChange(file);
        const url_img = URL.createObjectURL(file);
        setImagePreview(url_img);
      };
      img.onerror = () => {
        notificationMessage("error", "Không thể đọc kích thước hình ảnh.");
      };
      img.src = URL.createObjectURL(file);
    } else {
      notificationMessage(
        "error",
        "Định dạng file không được hỗ trợ. Vui lòng chỉ chọn file hình ảnh (*.png, *.jpg, *.jpeg)"
      );
    }
  };
  return (
    <Box className="input-file" display="flex" flexDirection="column" gap={10}>
      {label && (
        <Typography variant="body1" component="span" fontWeight={700}>
          {label}
        </Typography>
      )}
      <input
        id="file_input"
        type="file"
        onChange={(e) => handleChangeImage(e)}
        multiple={multiple}
        accept="image/png, image/jpg, image/jpeg"
      />

      <label htmlFor="file_input">
        <img
          className={className}
          src={imagePreview && labelImg ? imagePreview : downloadIMG}
          style={style}
          alt=""
        />
      </label>
      <Typography
        variant="h2"
        component="span"
        marginTop={0.5}
        fontWeight={600}
        color="#f52727"
      >
        {errorMessage}
      </Typography>
    </Box>
  );
};

export default InputUploadFile;
