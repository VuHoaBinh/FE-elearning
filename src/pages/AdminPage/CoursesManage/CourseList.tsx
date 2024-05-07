import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import courseApi from "src/apis/courseApi";
import FormControl from "src/components/FormControl";
import Table from "src/components/Table";
import { statusCourseTypes } from "src/data";
import { useTypingDebounce } from "src/hooks";
import { useNavigate } from "react-router-dom";
import { ICourse } from "src/types";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils";

const columnsHeader: GridColDef[] = [
  {
    field: "_id",
    headerName: "STT",
    width: 100,
    hide: true,
  },
  {
    field: "id",
    headerName: "STT",
    width: 60,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Tên khoá học",
    width: 550,
  },
  {
    field: "author",
    headerName: "Tác giả",
    width: 250,
  },
];

const CourseList = () => {
  document.title = "Quản lý khoá học";
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);

  const [status, setStatus] = useState<string>("");

  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [name, setName] = useState<string>();

  const navigate = useNavigate();
  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, name, status]);

  useEffect(() => {
    setName(debouncedValue);
  }, [debouncedValue]);

  const getCourses = async () => {
    setLoading(true);
    const params = { page, limit: pageSize, name, status };

    try {
      const response = await courseApi.getCourses(params);
      const { courses, total }: any = response;
      // console.log("course", response);
      if (courses.length > 0) {
        const keys = getHeaderColumns(courses[0]);
        const data = getNewHeaderColumn(courses, keys, page, pageSize);

        const courseData = data.map((data, index) => {
          return {
            ...data,
            author: courses[index].author.fullName,
          };
        });
        // console.log("courseData", courseData);
        setCourses(courseData);
      } else {
        setCourses(courses);
      }

      setLoading(false);
      setTotal(total);
    } catch (error) {
      setLoading(false);
      console.log("lỗi rồi", { error });
    }
  };
  const goToCourseDetail = (id: any) => {
    let data: any;
    data = courses.filter((course) => course._id === id);
    // console.log("data nef", data[0].slug);
    navigate(`${data[0].slug}`);
  };
  return (
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
            placeholder="Nhập tên khoá học"
            onChange={(e: any) => setValue(e.target.value)}
          />
          <FormControl.InputSelect
            defaultValue={status}
            placeholder="Chọn trạng thái khóa học"
            list={statusCourseTypes}
            onChange={(status) => setStatus(status)}
          />
        </Box>
      }
      titleBtnAdd="Tạo tài khoản mới"
      isLoading={loading}
      title="Danh sách thông tin khoá học"
      columnsData={columnsHeader}
      getRowId={(row) => row._id}
      onPage={(page) => setPage(Number(page))}
      onPageSize={(pageSize) => setPageSize(Number(pageSize))}
      total={total}
      rowsData={courses}
      btnAdd={false}
      isModify={false}
      btnMultiDeleted={false}
      isCheckBoxSelection={false}
      isViewDetail={true}
      onViewItemDetail={goToCourseDetail}
    />
  );
};

export default CourseList;
