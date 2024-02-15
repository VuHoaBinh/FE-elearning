import { CourseStatus } from "src/types";

const ONE_HUNDRED_THOUSAND = 100000;

export const genderTypes = [
  { value: false, name: "Nữ" },
  { value: true, name: "Nam" },
];
export const accountTypes = [
  { value: "student", name: "Học viên" },
  { value: "teacher", name: "Nhân viên" },
  { value: "admin", name: "Quản trị viên" },
];
export const statusTypes = [
  { value: false, name: "Đang khoá" },
  { value: true, name: "Hoạt động" },
  // { value: , name: "Tất cả" },
];

export const discountTypes = [
  { value: "percent", name: "Phần trăm" },
  { value: "money", name: "VNĐ" },
];
//api my course
export const myCourseTypes = [
  { value: "createdAt-asc", name: "Khoá học mới nhất" },
  { value: "progress-desc", name: "Xem nhiều nhất" },
];

export const discountApplyTypes = [
  { value: "all", name: "Tất cả" },
  { value: "author", name: "Tác giả" },
  // { value: "category", name: "Mã danh mục" },
  // { value: "new user", name: "Người dùng mới" },
];
export const categoryTypes = [
  { value: "false", name: "Đã duyệt" },
  { value: "true", name: "Đang chờ duyệt" },
];
export const categoryStatusTypes = [
  { value: "true", name: "Đang sử dụng" },
  { value: "false", name: "Đang trống" },
];
// search normal courses
export const sortTypes = [
  { value: "default", name: "Mặc định" },
  { value: "rating-asc", name: "Đánh giá tăng dần" },
  { value: "rating-desc", name: "Đánh giá giảm dần" },
  { value: "sellNumber-asc", name: "Bán thấp nhất" },
  { value: "sellNumber-desc", name: "Bán chạy nhất" },
  { value: "currentPrice-asc", name: "Giá tăng dần" },
  { value: "currentPrice-desc", name: "Giá giảm dần" },
  { value: "score", name: "Độ chính xác cao" },
];
export const priceRangeTypes = [
  { value: "0", name: "Mặc định" },
  { value: { max: 0 }, name: "Miễn phí" },
  { value: { max: 5 * ONE_HUNDRED_THOUSAND - 1 }, name: "< 500.000đ" },
  {
    value: {
      min: 5 * ONE_HUNDRED_THOUSAND,
      max: 10 * ONE_HUNDRED_THOUSAND,
    },
    name: "500.000đ - 1.000.000đ",
  },
  {
    value: { min: 10 * ONE_HUNDRED_THOUSAND, max: 15 * ONE_HUNDRED_THOUSAND },
    name: "1.000.000đ - 1.500.000đ",
  },
  {
    value: { min: 15 * ONE_HUNDRED_THOUSAND, max: 20 * ONE_HUNDRED_THOUSAND },
    name: "1.500.000đ - 2.000.000đ",
  },
  {
    value: { min: 20 * ONE_HUNDRED_THOUSAND, max: 30 * ONE_HUNDRED_THOUSAND },
    name: "2.000.000đ - 3.000.000đ",
  },
  { value: { min: 30 * ONE_HUNDRED_THOUSAND + 1 }, name: "> 3.000.000đ" },
];

//course
export const statusCourseTypes = [
  { value: "", name: "Tất cả" },
  { value: "draft", name: CourseStatus.draft },
  { value: "pending", name: CourseStatus.pending },
  { value: "approved", name: CourseStatus.approved },
  { value: "updating", name: CourseStatus.updating },
  { value: "denied", name: CourseStatus.denied },
  { value: "update denied", name: CourseStatus["update denied"] },
];
export const dateCourseTypes = [
  { value: "", name: "Mặc định" },
  { value: "createdAt-desc", name: "Khóa học mới nhất" },
  { value: "createdAt-asc", name: "Khóa học cũ nhất" },
];

// statistic
export const topAmountTypes = [
  { value: 5, name: "5 khoá hot nhất" },
  { value: 10, name: "10 khoá hot nhất" },
  { value: 15, name: "15 khoá hot nhất" },
];
export const dateTypes = [
  { value: "day", name: "Theo ngày" },
  { value: "month", name: "Theo tháng" },
  // { value: "year", name: "Theo năm" },
];

export const revenueSortTypes = [
  { value: "revenue-desc", name: "Lương giảm dần" },
  { value: "revenue-asc", name: "Lương tăng dần" },
];

export const numberRangeTypes = [
  { value: 3, name: "Hiển thị 3" },
  { value: 5, name: "Hiển thị 5" },
  { value: 10, name: "Hiển thị 10" },
  { value: 20, name: "Hiển thị 20" },
];
export const yearNumberCompare = [
  { value: 1, name: "1 năm" },
  { value: 2, name: "2 năm" },
  { value: 3, name: "3 năm" },
  { value: 4, name: "4 năm" },
  // { value: 4, name: "5 năm" },
];
