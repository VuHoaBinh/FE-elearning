import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import uploadDocumentApi from "src/apis/uploadDocumentApi";
import FormControl from "src/components/FormControl";
import LoadingContent from "src/components/LoadingContent";
import ModalContainer from "src/components/ModalContainer";
import { dateCourseTypes, statusCourseTypes } from "src/data";
import LayoutContainer from "src/layouts/LayoutContainer";
import { isPending, isSuccess } from "src/reducers";
import { CourseStatus, CourseType, ICourse } from "src/types";
import { notificationMessage } from "src/utils";
import * as Yup from "yup";
import { ICategoriesCourse } from "../TeacherCourseDetail";
import "./TeacherCourse.scss";

const TeacherCourse: React.FC = () => {
  document.title = "Khoá học của tôi";

  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [categories, setCategories] = useState<ICategoriesCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    sort: "",
  });
  const nav = useNavigate();
  const dispatch = useDispatch();

  const getListCourses = (params?: Object) => {
    !loading && setLoading(true);
    teacherApi
      .getCourses(params)
      .then((res: any) => {
        setLoading(false);
        dispatch(isSuccess());
        setCourses(res.courses);
      })
      .catch(() => setLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      originalPrice: "",
      currentPrice: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập khóa học"),
      description: Yup.string().required("Vui lòng nhập nội dung khóa học"),
    }),
    onSubmit: async (values) => {
      dispatch(isPending());
      courseApi
        .createNewCourse({
          ...values,
          thumbnail: image,
          originalPrice: "0",
          currentPrice: "0",
        })
        .then(() => {
          formik.resetForm({
            values: {
              name: "",
              description: "",
              category: categories[0].value,
              originalPrice: "0",
              currentPrice: "0",
            },
          });
          toast.success("Tạo khóa học thành công", {
            position: "bottom-right",
          });
          setShowModal(false);
          setImage("");
          getListCourses();
        });
    },
  });

  const postImage = (image: File) => {
    dispatch(isPending());
    // const formData = new FormData();
    // formData.append("image", image);

    uploadDocumentApi
      .uploadImage(image)
      .then((res: any) => {
        dispatch(isSuccess());
        const { url } = res;
        notificationMessage("success", "Upload Thumbnail thành công");
        setImage(url);
      })
      .catch((err) => {
        dispatch(isSuccess());
        console.log("Lỗi rồi", err);
      });
  };

  useEffect(() => {
    dispatch(isPending());
    categoryApi.getCategories().then((res: any) => {
      setCategories(
        res.categories.map((category: any) => {
          return { value: category._id, name: category.name };
        })
      );
      formik.setFieldValue("category", res.categories[0]._id);
    });
    getListCourses();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      getListCourses(filter);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <LayoutContainer titleShow={false} footerShow={false}>
      <div className="teacher">
        <h2 className="teacher_title">Khoá học của tôi</h2>

        <div className="teacher_navbar">
          <FormControl.Input
            style={{ width: 300 }}
            placeholder="Nhập tên khoá học của bạn"
            value={filter.name}
            onChange={(e) =>
              setFilter({
                ...filter,
                name: (e.target as HTMLInputElement).value,
              })
            }
          />
          <FormControl.InputSelect
            style={{ width: 225 }}
            placeholder="Chọn trạng thái khóa học"
            defaultValue={filter.status}
            list={statusCourseTypes}
            onChange={(status) => setFilter({ ...filter, status })}
          />
          <FormControl.InputSelect
            style={{ width: 225 }}
            placeholder="Chọn thời gian khóa học"
            defaultValue={filter.sort}
            list={dateCourseTypes}
            onChange={(status) => setFilter({ ...filter, sort: status })}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            sx={{
              height: 45,
              marginLeft: "auto",
            }}
          >
            Tạo khoá học mới
          </Button>
        </div>

        {loading ? (
          <LoadingContent.Loading />
        ) : courses.length === 0 ? (
          <div className="teacher_none">
            Hiện tại chưa khóa học nào{" "}
            {CourseStatus[filter.status as CourseType]}
          </div>
        ) : (
          <div className="teacher_course-list">
            {courses.map((course, index) => (
              <div className="teacher_course-item" key={index}>
                <div className="left">
                  <img
                    src="https://s.udemycdn.com/course/200_H/placeholder.jpg"
                    alt="course"
                  />
                </div>
                <div className="right">
                  <div className="item">
                    <span>{course.name}</span>
                    <span
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: course.description || "",
                      }}
                    />
                  </div>
                  <div className="overlay"></div>
                  <div
                    className="edit"
                    onClick={() => nav("/teacher/course/" + course._id)}
                  >
                    Chỉnh sửa / Quản lý khoá học
                  </div>
                  <div className="item">
                    Trạng thái khóa học:{" "}
                    <span>{CourseStatus[course.status as CourseType]}</span>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalContainer
        title="Thêm khóa học mới"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <form id="create-course" onSubmit={formik.handleSubmit}>
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}
          >
            <FormControl.InputUploadFile
              label="Thumbnail khóa học"
              onChange={(value) => postImage(value)}
            />
            <FormControl.Input
              required
              label="Tên khóa học"
              placeholder="Nhập tên khóa học"
              errorMessage={formik.touched.name ? formik.errors.name : ""}
              {...formik.getFieldProps("name")}
            />
           
            <div className="editor">
              <h2>
                Nội dung khóa học <span>*</span>
              </h2>
              <FormControl.FormEditor
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue("description", value)}
                placeholder="Thêm một mô tả. Bao gồm những gì học sinh sẽ có thể làm sau khi hoàn thành bài giảng."
              />
            </div>

            {formik.touched.description && (
              <div className="editor-error">{formik.errors.description}</div>
            )}
            <FormControl.InputSelect
              label="Loại khóa học"
              list={categories}
              onChange={(category_type) =>
                formik.setFieldValue("category", category_type)
              }
              defaultValue={formik.values.category}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            sx={{
              height: 45,
              width: "100%",
            }}
          >
            Thêm
          </Button>
        </form>
      </ModalContainer>
    </LayoutContainer>
  );
};

export default TeacherCourse;
