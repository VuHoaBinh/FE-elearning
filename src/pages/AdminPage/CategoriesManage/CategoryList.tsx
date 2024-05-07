import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import FormControl from "src/components/FormControl";
import Table from "src/components/Table";
import { categoryStatusTypes, categoryTypes, statusTypes } from "src/data";
import { useTypingDebounce } from "src/hooks";
import { ICategory } from "src/types";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils";
import CreateCategory from "./CreateCategory";
import MultiDeleteCategory from "./MultiDeleteCategory";
import UpdateCategory from "./UpdateCategory";

const CategoryList = () => {
  document.title = "Quản lý danh mục";

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryId, setCategoryId] = useState<string | number>("");
  const [categoryIds, setCategoryIds] = useState<string[] | number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //for search
  //for debounce
  const [publish, setPublish] = useState<boolean>(true);
  const [isPending, setIsPending] = useState<string>("false");
  const [used, setUsed] = useState<boolean>(true);
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [categoryName, setCategoryName] = useState<string>();

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //modal
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showMultiDelete, setShowMultiDelete] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  //check isUpdate
  const [isCreateCompleted, setIsCreateCompleted] = useState<boolean>(false);
  const [isMultiDeleteCompleted, setIsMultiDeleteCompleted] =
    useState<boolean>(false);
  const [isUpdateCompleted, setIsUpdateCompleted] = useState<boolean>(false);

  const columsHeader: GridColDef[] = [
    { field: "id", headerName: "STT", width: 120 },
    { field: "name", headerName: "Tên danh mục", width: 420 },
    { field: "publish", headerName: "Xuất bản", width: 270 },
    { field: "used", headerName: "Trạng thái", width: 200 },
  ];

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, categoryName, publish, used, isPending]);

  useEffect(() => {
    if (isCreateCompleted || isUpdateCompleted || isMultiDeleteCompleted) {
      getCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateCompleted, isUpdateCompleted, isMultiDeleteCompleted]);

  //debounce to search
  useEffect(() => {
    setCategoryName(debouncedValue);
  }, [debouncedValue]);

  const getCategories = async () => {
    setLoading(true);
    const params = {
      name: categoryName,
      isPending,
      used,
      publish,
      page,
      limit: pageSize,
    };
    try {
      const response = await categoryApi.getCategories(params);
      // console.log(response);
      const { categories, total }: any = response;

      if (categories.length > 0) {
        const keys = getHeaderColumns(categories[0]);
        const res = getNewHeaderColumn(categories, keys, page, pageSize);
        setCategories(res);
      } else {
        setCategories(categories);
      }
      setLoading(false);
      setTotal(total);
    } catch (error) {
      setLoading(false);
      console.log("lỗi rồi", { error });
    }
  };

  const handleMultiDeleted = (ids: string[] | number[]) => {
    setCategoryIds(ids);
    setShowMultiDelete(true);
  };
  const handleModifyItem = async (id: string | number) => {
    setCategoryId(id);
    setShowUpdate(true);
  };

  return (
    <>
      <Table
        btnSearch={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormControl.Input
              style={{ width: 250 }}
              placeholder="Tìm kiếm bằng tên danh mục"
              onChange={(e: any) => setValue(e.target.value)}
            />
            <FormControl.InputSelect
              defaultValue={publish}
              list={statusTypes}
              onChange={(status) => setPublish(status)}
            />
            <FormControl.InputSelect
              defaultValue={used}
              list={categoryStatusTypes}
              onChange={(status) => setUsed(status)}
            />
            <FormControl.InputSelect
              defaultValue={isPending}
              list={categoryTypes}
              onChange={(status) => setIsPending(status)}
            />
          </Box>
        }
        getRowId={(row) => row.slug}
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        total={total}
        title="Danh sách thông tin danh mục"
        titleBtnAdd="Tạo danh mục mới"
        titleBtnMultiDelete="Xoá thông tin danh mục"
        columnsData={columsHeader}
        rowsData={categories}
        isLoading={loading}
        onModifyItem={handleModifyItem}
        handleAddItem={() => setShowCreate(true)}
        onDeleteSelectMultiItem={handleMultiDeleted}
      />
      <CreateCategory
        isUpdate={(status) => setIsCreateCompleted(status)}
        show={showCreate}
        onClose={() => setShowCreate(false)}
        setShow={setShowCreate}
      />
      <MultiDeleteCategory
        slugs={categoryIds}
        isUpdate={(status) => setIsMultiDeleteCompleted(status)}
        show={showMultiDelete}
        onClose={() => setShowMultiDelete(false)}
        setShow={setShowMultiDelete}
      />
      <UpdateCategory
        isUpdate={(status) => setIsUpdateCompleted(status)}
        id={categoryId}
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        setShow={setShowUpdate}
      />
    </>
  );
};

export default CategoryList;
