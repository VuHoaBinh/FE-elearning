import { Box, Divider } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import blogApi from "src/apis/blogApi";
import ModalContainer from "src/components/ModalContainer";
import { IBlog } from "src/types";
import * as Yup from "yup";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { selectAuthorization } from "src/reducers/authSlice";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Blog.scss";

const Blog: React.FC = () => {
  const { isRole } = useSelector(selectAuthorization);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [blogToDeleteId, setBlogToDeleteId] = React.useState<string | null>(
    null
  );
  const [blogs, setBlogs] = React.useState<IBlog[]>([]);
  const [open, setOpen] = React.useState(false);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const initialValues = {
    title: "",
    purpose: "",
    content: "",
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleClickOpenDelete = (_id: string) => {
    setOpenDelete(true);
    setBlogToDeleteId(_id);
  };

  const handleClickCloseDelete = () => {
    setOpenDelete(false);
  };

  const fetchBlogs = () => {
    blogApi
      .getBlog()
      .then((response: any) => {
        console.error("Failed to fetch blogs:", response.result);

        setBlogs(response.result);
      })
      .catch((error: any) => {
        console.error("Failed to fetch blogs:", error);
      });
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Nhập nội dung tiêu đề"),
    purpose: Yup.string().required("Nhập nội dung mục tiêu"),
    content: Yup.string().required("Nhập nội dung bài viết"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      blogApi
        .CreateNewBlog(values)
        .then(() => {
          toast.success("Bài viết đã được tạo thành công!", {
            position: "bottom-right",
          });
          fetchBlogs();
        })
        .catch((error) => {
          console.error("Failed to create blog:", error);
          toast.error("Tạo bài viết không thành công.", {
            position: "bottom-right",
          });
        });
      handleClose();
    },
  });

  const handleClickOpen = (blog: IBlog | null = null) => {
    formik.setValues(blog || initialValues);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleDelete = async (id: string | null) => {
    try {
      if (id !== null) {
        await blogApi.DeleteBlog(id);
        toast.success("Bài viết đã được xóa thành công!", {
          position: "bottom-right",
        });
        window.location.href = "https://anhngusparkle.edu.vn/blog";
        // window.location.reload();
      } else {
        console.log("Không tìm thấy bài viết hoặc id không hợp lệ.");
      }
    } catch (error) {
      toast.error("Không thể xóa bài viết", {
        position: "bottom-right",
      });
      console.error("Không thể xóa bài viết error:", error);
    }
  };

  let filteredBlogs = [...blogs];

  if (searchKeyword) {
    filteredBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }
  const formatCreatedAt = (createdAt: any) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const settingsRight = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const settingsLeft = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <React.Fragment>
      <div
        className="btn-return"
        onClick={() => {
          window.location.href = "https://anhngusparkle.edu.vn/";
        }}
      >
        <i className="fa-solid fa-arrow-left"></i> Quay lại
      </div>
      <div
        className="search-bar"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FormControl
          fullWidth
          sx={{ m: 1 }}
          variant="standard"
          style={{ flex: "1" }}
        >
          <Input
            id="standard-adornment-amount"
            type="text"
            placeholder=" Tìm kiếm bài viết ...."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <i className="fa-solid fa-magnifying-glass btn-search"></i>
        </FormControl>
      </div>
      <div>
        {isRole === "teacher" || isRole === "admin" ? (
          <Button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2
          pt-2.5 text-xs font-medium uppercase leading-normal
          text-white shadow-primary-3 transition duration-150
          ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2
          focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none
          focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30
          dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong btn-addBlog"
            variant="contained"
            onClick={() => handleClickOpen()}
          >
            <i className="fa-solid fa-plus pr-1 text-btn-addBlog"></i> Thêm bài
            viết
          </Button>
        ) : (
          <></>
        )}
      </div>

      <div className="menu-blog-left">
        <Slider {...settingsRight}>
          <div>
            <img
              alt="myphoto"
              src="https://file.hstatic.net/200000665395/article/mau-content-cho-trung-tam-tieng-anh-5_d4609222f68e4806ad584848fa109165.jpg"
            ></img>
          </div>
          <div>
            <img
              alt="myphoto"
              src="https://file.hstatic.net/200000665395/article/mau-content-cho-trung-tam-tieng-anh-5_d4609222f68e4806ad584848fa109165.jpg"
            ></img>
          </div>
          <div>
            <img
              alt="myphoto"
              src="https://file.hstatic.net/200000665395/article/mau-content-cho-trung-tam-tieng-anh-5_d4609222f68e4806ad584848fa109165.jpg"
            ></img>
          </div>
        </Slider>
      </div>
      <div className="menu-blog-right">
        <Slider {...settingsLeft}>
          <div>
            <img
              alt="myphoto"
              src="https://problogger.com/jobs/wp-content/uploads/2020/09/problogger-ultimate-guide-to-freelance-writing.png"
            ></img>
          </div>
          <div>
            <img
              alt="myphoto"
              src="https://problogger.com/jobs/wp-content/uploads/2020/09/problogger-ultimate-guide-to-freelance-writing.png"
            ></img>
          </div>
          <div>
            <img
              alt="myphoto"
              src="https://problogger.com/jobs/wp-content/uploads/2020/09/problogger-ultimate-guide-to-freelance-writing.png"
            ></img>
          </div>
        </Slider>
      </div>
      <div className="container-showBlog">
        {searchKeyword
          ? filteredBlogs.map((blog: IBlog) => (
              <div key={blog._id}>
                <div className="text-center pt-16 md:pt-32">
                  {isRole === "teacher" || isRole === "admin" ? (
                    <i
                      className="fa-solid fa-xmark icon-bin-blog"
                      onClick={() => handleDelete(blog._id)}
                    ></i>
                  ) : (
                    <></>
                  )}
                  <p className="text-sm md:text-base text-green-500 font-bold mt-8 mb-2">
                    {formatCreatedAt(blog.createdAt)}
                    <span className="text-gray-500"> | </span> {blog.purpose}
                  </p>
                  <h1 className="font-bold break-normal text-xl md:text-3xl">
                    {blog.title}
                  </h1>
                </div>
                <div className="container max-w-5xl mx-auto -mt-24">
                  <div className="mx-0 sm:mx-6">
                    <div
                      className="bg-white w-full mb:p-16 md:text-xl text-gray-800 leading-normal"
                      style={{
                        fontFamily: "Georgia, serif",
                        marginTop: "100px",
                      }}
                    >
                      <p
                        className="py-6"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      ></p>
                    </div>
                  </div>
                </div>
                <Divider
                  style={{ paddingTop: "60px", paddingBottom: "-60px" }}
                />
              </div>
            ))
          : blogs.reverse().map((blog: IBlog) => (
              <div key={blog._id}>
                <div className="text-center pt-16 md:pt-32">
                  {isRole === "teacher" || isRole === "admin" ? (
                    <i
                      className="fa-solid fa-xmark icon-bin-blog"
                      onClick={() => handleDelete(blog._id)}
                    ></i>
                  ) : (
                    <></>
                  )}
                  <p className="text-sm md:text-base text-green-500 font-bold mt-8 mb-2">
                    {formatCreatedAt(blog.createdAt)}
                    <span className="text-gray-900"> | </span> {blog.purpose}
                  </p>
                  <h1 className="font-bold break-normal text-xl md:text-3xl">
                    {blog.title}
                  </h1>
                </div>
                <div className="container max-w-5xl mx-auto -mt-24">
                  <div className="mx-0 sm:mx-6">
                    {/* md:text-xl text-gray-800 leading-normal*/}
                    {/* fontFamily: "Serif", */}
                    <div
                      className="bg-white w-full mb:p-16 "
                      style={{
                        marginTop: "100px",
                      }}
                    >
                      <p
                        className="py-6"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      ></p>
                    </div>
                  </div>
                </div>
                <Divider
                  style={{ paddingTop: "60px", paddingBottom: "-60px" }}
                />
              </div>
            ))}
      </div>

      {/* Modal add Blog //////////////////////////////*/}
      <ModalContainer
        title="Thông tin chi tiết bài viết"
        open={open}
        onClose={handleClose}
      >
        <form
          id="create-blog"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 20,
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            required
            name="title"
            label="Tiêu đề bài viết"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            required
            name="purpose"
            label="Mục tiêu chính"
            value={formik.values.purpose}
            onChange={formik.handleChange}
            error={formik.touched.purpose && Boolean(formik.errors.purpose)}
            helperText={formik.touched.purpose && formik.errors.purpose}
          />
          <ReactQuill
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
            theme="snow"
            placeholder="Nội dung của bài viết"
            style={{ fontSize: "inherit", color: "inherit" }}
          />
          <p
            className="py-6"
            dangerouslySetInnerHTML={{ __html: formik.values.content }}
          ></p>
        </form>
        <Box sx={{ marginTop: 4 }}>
          <Button
            form="create-blog"
            variant="contained"
            color="primary"
            type="submit"
          >
            Tạo bài viết
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            sx={{ marginLeft: 1 }}
          >
            Huỷ bỏ
          </Button>
        </Box>
      </ModalContainer>
    </React.Fragment>
  );
};

export default Blog;
