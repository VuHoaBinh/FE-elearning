import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { categoryTypes, statusTypes } from "src/data";
import { ICategory } from "src/types";

interface CategoryDetailProps {
  id: string | number;
  show?: boolean;
  onClose?: () => void;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({
  id,
  show = false,
  onClose,
}) => {
  const [categoryDetail, setCategoryDetail] = useState<ICategory>({});

  useEffect(() => {
    id && getCategoryDetail(id);
  }, [id]);

  const getCategoryDetail = async (id: any) => {
    try {
      const response = await categoryApi.getCategoryDetail(id);
      const { category }: any = response;
      setCategoryDetail(category);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <ModalContainer
      title="Thông tin chi tiết danh mục"
      open={show}
      onClose={onClose}
    >
      <Box component="form">
        <FormControl.Input
          label="Tên danh mục"
          value={categoryDetail.name}
          disabled
        />
        <FormControl.Input label="slug" value={categoryDetail.slug} disabled />

        <FormControl.InputSelect
          label="Xuất bản"
          list={statusTypes}
          defaultValue={categoryDetail.publish}
          disabled
        />
        <FormControl.InputSelect
          label="Trạng thái"
          list={categoryTypes}
          defaultValue={categoryDetail.isPending?.toString()}
          disabled
        />
      </Box>
    </ModalContainer>
  );
};

export default CategoryDetail;
