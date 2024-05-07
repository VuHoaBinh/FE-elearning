import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import courseApi from "src/apis/courseApi";
import FormControl from "src/components/FormControl";
import Pagination from "src/components/Pagination";
import { useTypingDebounce } from "src/hooks";
import { ICourse, SearchKeyProps } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import CourseContainer from "./CourseContainer";
import "./CoursePage.scss";

const CoursePage = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [searchKey, setSearchKey] = useState<SearchKeyProps>();
  const [totalCourse, setTotalCourse] = useState<number>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //for search
  const [categoryList, setCategoryList] = useState<any>();
  const [category, setCategory] = useState<string>("all");
  const [price, setPrice] = useState<any>("0");
  const [sort, setSort] = useState<string>("default");

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [name, setName] = useState<string>();

  useEffect(() => {
    setName(debouncedValue);
    setPage(1);
  }, [debouncedValue]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getCourses();
  }, [limit, page, sort, category, name, price]);

  // call page
  useEffect(() => {
    if (window.screen.width <= 430) {
      setLimit(4);
    }
  }, []);

  const getCourses = async () => {
    const params = {
      publish: true,
      limit,
      page,
      sort,
      category,
      name,
      ...price,
    };
    setIsLoading(true);
    try {
      const response = await courseApi.getCourses(params);
      const { courses, searchKey, total }: any = response;
      setCourses(courses);
      setSearchKey(searchKey);
      setIsLoading(false);
      setTotalCourse(total);
      setTotal(formatCharacter.numberRound(total / limit));
    } catch (error) {
      console.log("lỗi rồi", { error });
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await categoryApi.getCategories();
      const { categories }: any = response;
      const listCategory = categories.map((category: any) => {
        return { name: category.name, value: category.slug };
      });
      setCategoryList([{ name: "Tất cả", value: "all" }, ...listCategory]);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="course-page">
      <span className="title">Danh sách các khoá học</span>
      {/* search input */}
      <div className="search-courses">
        {/* input search text */}
        <FormControl.Input
          className="input-text"
          style={{ width: 350 }}
          placeholder="Hãy nhập tên khoá học muốn tìm"
          onChange={(e: any) => setValue(e.target.value)}
        />
        {/* input select item */}
        <div className="input-select">
          {categoryList && (
            <Box sx={{ width: 270 }}>
              <FormControl.InputSelect
                defaultValue={category}
                list={categoryList}
                onChange={(status) => {
                  setPage(1);
                  setCategory(status);
                }}
                style={{ border: "1px solid #e2e8f0" }}
              />
            </Box>
          )}
        </div>
      </div>

      {/* what for u using to search?? */}
      <div className="keyword-to-search">
        {name && searchKey?.suggestion && searchKey.original !== "" ? (
          <>
            <span className="key-search">
              Đang search với từ khoá <b>{searchKey.original}</b>
            </span>
            <span>
              Hiển thị kết quả cho từ <b>{searchKey.suggestion}</b>
            </span>
          </>
        ) : totalCourse && totalCourse > 0 ? (
          <span>
            Có <b>{totalCourse}</b> kết quả hiển thị
          </span>
        ) : (
          <span>Không có kết quả hiển thị</span>
        )}
      </div>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 45,
          }}
        >
          <CourseContainer
            title="Khoá Học Đang Hoạt Động"
            courses={courses}
            isLoading={isLoading}
          />
          {total > 0 && (
            <Pagination
              pageActive={page}
              total={total}
              onChangeValue={(value: any) => {
                setPage(value);
              }}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};
export default CoursePage;
