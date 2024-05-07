import {
  ADMIN_PAGE,
  AUTH_PAGE,
  DASHBOARD_PAGE,
  MAIN_PAGE,
  TEACHER_PAGE,
} from "./LazySuspenseComponent";

// main route
const MAIN_ROUTE = [
  {
    role: "page",
    path: "/",
    element: MAIN_PAGE.MainPage,
  },
  {
    role: "page",
    path: "/courses/:id",
    element: MAIN_PAGE.CourseDetail,
  },
  { role: "page", path: "/unauthorized", element: MAIN_PAGE.UnauthorizedPage },
  { role: "page", path: "/*", element: MAIN_PAGE.NotFound },
  { role: "page", path: "/blog", element: MAIN_PAGE.Blog },
];

//auth route
const AUTH_ROUTE = [
  { role: "auth", path: "/login", element: AUTH_PAGE.Login },
  { role: "auth", path: "/register", element: AUTH_PAGE.Register },
  { role: "auth", path: "/forgot_password", element: AUTH_PAGE.ForgotPassword },
];

// admin route
const ADMIN_ROUTE = [
  { role: "admin", path: "/admin", element: ADMIN_PAGE.AdminPage },
  {
    role: "admin",
    path: "admin/dashboard/courses/:id",
    element: ADMIN_PAGE.CourseLearningDetail,
  },
];

// Teacher route
const TEACHER_ROUTE = [
  {
    role: "teacher",
    path: "/teacher/course",
    element: TEACHER_PAGE.TeacherCourse,
  },
  {
    role: "teacher",
    path: "/teacher/course/:id",
    element: TEACHER_PAGE.TeacherCourseDetail,
  },
  {
    role: "teacher",
    path: "teacher/course/preview-course/:id",
    element: TEACHER_PAGE.CourseLearningDetail,
  },
];

//Dash board routes
const DASHBOARD_ROUTE = [
  // admin routes
  {
    role: "admin",
    path: "/admin",
    element: DASHBOARD_PAGE.DashboardLayout,
    children: [
      {
        path: "info",
        href: "/admin/info",
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.ProfilePage,
        title: "Thông tin cá nhân",
        icon: "info-circle",
      },
      {
        path: "dashboard/user",
        href: "/admin/dashboard/user",
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.UserList,
        title: "Quản lý người dùng",
        icon: "user",
      },
      {
        path: "dashboard/student",
        href: "/admin/dashboard/student",
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.StudentList,
        title: "Quản lý học sinh",
        icon: "user",
      },
      {
        path: "dashboard/categories",
        href: "/admin/dashboard/categories",
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.CategoryList,
        title: "Quản lý danh mục",
        icon: "newspaper-o",
      },
      {
        path: "dashboard/courses",
        title: "Quản lý khoá học",
        href: "/admin/dashboard/courses",
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.CourseList,
        icon: "book",
      },
    ],
  },
  // student routes
  {
    role: "student",
    path: "/student",
    element: DASHBOARD_PAGE.DashboardLayout,
    children: [
      {
        path: "info",
        href: "/student/info",
        element: DASHBOARD_PAGE.STUDENT_DASHBOARD.ProfilePage,
        title: "Thông tin cá nhân",
        icon: "info-circle",
      },
    ],
  },
  // teacher routes
  {
    role: "teacher",
    path: "/teacher",
    element: DASHBOARD_PAGE.DashboardLayout,
    children: [
      {
        path: "info",
        href: "/teacher/info",
        element: DASHBOARD_PAGE.TEACHER_DASHBOARD.ProfilePage,
        title: "Thông tin cá nhân",
        icon: "info-circle",
      },
      {
        path: "revenue",
        href: "/teacher/course",
        element: DASHBOARD_PAGE.TEACHER_DASHBOARD.ManagerCourse,
        title: "Quản lý khoá học",
        icon: "book",
      },
      {
        path: "dashboard/student",
        href: "/teacher/dashboard/student",
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.StudentList,
        title: "Quản lý học sinh",
        icon: "user",
      },
      {
        path: "dashboard/categories",
        href: "/teacher/dashboard/categories",
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.CategoryList,
        title: "Quản lý danh mục",
        icon: "newspaper-o",
      },
    ],
  },
];

export { MAIN_ROUTE, AUTH_ROUTE, ADMIN_ROUTE, TEACHER_ROUTE, DASHBOARD_ROUTE };
