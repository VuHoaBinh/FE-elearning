import { Router } from "src/types";

export const linkHeader: Router[] = [
  { name: "Trang chủ", path: "/", href: "" },
  { name: "Khoá học", path: "/course", href: "course" },
];

export const linkUserProfile: Router[] = [
  //for user
  { name: "Trang chủ", path: "/", role: "user" },
  //for admin
  { name: "Quản lý admin", path: "/admin/info", role: "admin" },
  { name: "Thông tin cá nhân", path: "/admin/info", role: "admin" },
  //for teacher
  { name: "Thông tin cá nhân", path: "/teacher/info", role: "teacher" },
  { name: "Quản lý khóa học", path: "/teacher/course", role: "teacher" },
  //for student
  { name: "Thông tin cá nhân", path: "/student/info", role: "student" },
];
