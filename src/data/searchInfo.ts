import { CourseStatus } from "src/types";

const ONE_HUNDRED_THOUSAND = 100000;

export const genderTypes = [
  { value: false, name: "Nữ" },
  { value: true, name: "Nam" },
];
export const accountTypes = [
  { value: "student", name: "Học sinh" },
  { value: "teacher", name: "Giảng viên" },
];
export const studentTypes = [{ value: "student", name: "Học sinh" }];
export const statusTypes = [
  { value: false, name: "Đang khoá" },
  { value: true, name: "Hoạt động" },
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
];
export const categoryTypes = [
  { value: "false", name: "Đã duyệt" },
  { value: "true", name: "Đang chờ duyệt" },
];
export const categoryStatusTypes = [
  { value: "true", name: "Đang sử dụng" },
  { value: "false", name: "Đang trống" },
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
