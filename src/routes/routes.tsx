import {
  ADMIN_PAGE,
  AUTH_PAGE,
  DASHBOARD_PAGE,
  MAIN_PAGE,
  TEACHER_PAGE,
} from './LazySuspenseComponent'

// main route
const MAIN_ROUTE = [
  {
    role: 'page',
    path: '/',
    element: MAIN_PAGE.MainPage,
  },
  {
    role: 'page',
    path: '/courses/:id',
    element: MAIN_PAGE.CourseDetail,
  },
  {
    role: 'page',
    path: 'user/:id',
    element: MAIN_PAGE.PortfolioPage,
  },
  { role: 'page', path: '/unauthorized', element: MAIN_PAGE.UnauthorizedPage },
  { role: 'page', path: '/*', element: MAIN_PAGE.NotFound },
]

//auth route
const AUTH_ROUTE = [
  { role: 'auth', path: '/login', element: AUTH_PAGE.Login },
  { role: 'auth', path: '/register', element: AUTH_PAGE.Register },
  { role: 'auth', path: '/forgot_password', element: AUTH_PAGE.ForgotPassword },
]

// admin route
const ADMIN_ROUTE = [
  { role: 'admin', path: '/admin', element: ADMIN_PAGE.AdminPage },
  {
    role: 'admin',
    path: '/admin/dashboard/statistic/revenue-teachers/:id',
    element: ADMIN_PAGE.RevenueTeacherDetail,
  },
  {
    role: 'admin',
    path: 'admin/dashboard/courses/:id',
    element: ADMIN_PAGE.CourseLearningDetail,
  },
]

// Teacher route
const TEACHER_ROUTE = [
  // {
  //   role: "teacher",
  //   path: "/teacher/info",
  //   element: <TeacherInfo />,
  // },
  {
    role: 'teacher',
    path: '/teacher/course',
    element: TEACHER_PAGE.TeacherCourse,
  },
  {
    role: 'teacher',
    path: '/teacher/course/:id',
    element: TEACHER_PAGE.TeacherCourseDetail,
  },
  {
    role: 'teacher',
    path: '/teacher/course/:id/:lessonId/quiz',
    element: TEACHER_PAGE.QuizPage,
  },
  {
    role: 'teacher',
    path: '/teacher/course/:lessonId/quiz-detail',
    element: TEACHER_PAGE.QuizDetail,
  },
  {
    role: 'teacher',
    path: 'teacher/course/preview-course/:id',
    element: TEACHER_PAGE.CourseLearningDetail,
  },
]

//Dash board routes
const DASHBOARD_ROUTE = [
  // admin routes
  {
    role: 'admin',
    path: '/admin',
    element: DASHBOARD_PAGE.DashboardLayout,
    children: [
      {
        path: 'info',
        href: '/admin/info',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.ProfilePage,
        title: 'Thông tin cá nhân',
        icon: 'info-circle',
      },
      // {
      //   path: "over-view",
      //   href: "/admin/over-view",
      //   element: <OverviewSystem />,
      //   title: "Tổng quan hệ thống",
      //   icon: "gears",
      // },
      {
        path: 'dashboard/user',
        href: '/admin/dashboard/user',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.UserList,
        title: 'Quản lý người dùng',
        icon: 'user',
      },
      {
        path: 'dashboard/student',
        href: '/admin/dashboard/student',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.StudentList,
        title: 'Quản lý học sinh',
        icon: 'user',
      },
      {
        path: 'dashboard/categories',
        href: '/admin/dashboard/categories',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.CategoryList,
        title: 'Quản lý danh mục',
        icon: 'newspaper-o',
      },
      {
        path: 'dashboard/courses',
        title: 'Quản lý khoá học',
        href: '/admin/dashboard/courses',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.CourseList,
        icon: 'book',
      },
      {
        path: 'dashboard/statistic/',
        href: '/admin/dashboard/statistic',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.StatisticManage,
        title: 'Biểu đồ thống kê',
        icon: 'bar-chart',
        children: [
          // {
          //   path: "users",
          //   href: "/admin/dashboard/statistic/users",
          //   title: "Thống kê người dùng",
          //   element: DASHBOARD_PAGE.ADMIN_DASHBOARD.UserStatistic,
          //   // icon: "info",
          // },
          {
            path: 'revenues',
            href: '/admin/dashboard/statistic/revenues',
            title: 'Thống kê doanh thu',
            element: DASHBOARD_PAGE.ADMIN_DASHBOARD.RevenueStatistic,
            // icon: "money",
          },
          // {
          //   path: "revenue-teachers",
          //   href: "/admin/dashboard/statistic/revenue-teachers",
          //   title: "Doanh thu giảng viên",
          //   element: DASHBOARD_PAGE.ADMIN_DASHBOARD.RevenueTeacherStatistic,
          //   // icon: "money",
          // },
          // {
          //   path: "courses",
          //   href: "/admin/dashboard/statistic/courses",
          //   title: "Thống kê khoá học",
          //   element: DASHBOARD_PAGE.ADMIN_DASHBOARD.StatisticCourses,
          //   // icon: "money",
          // },
        ],
      },
      // {
      //   path: "message",
      //   href: "/admin/message",
      //   element: DASHBOARD_PAGE.Message,
      //   title: "Trò chuyện trực tuyến",
      //   icon: "wechat",
      // },
    ],
  },
  // student routes
  {
    role: 'student',
    path: '/student',
    element: DASHBOARD_PAGE.DashboardLayout,
    children: [
      {
        path: 'info',
        href: '/student/info',
        element: DASHBOARD_PAGE.STUDENT_DASHBOARD.ProfilePage,
        title: 'Thông tin cá nhân',
        icon: 'info-circle',
      },
    ],
  },
  // teacher routes
  {
    role: 'teacher',
    path: '/teacher',
    element: DASHBOARD_PAGE.DashboardLayout,
    children: [
      {
        path: 'info',
        href: '/teacher/info',
        element: DASHBOARD_PAGE.TEACHER_DASHBOARD.ProfilePage,
        title: 'Thông tin cá nhân',
        icon: 'info-circle',
      },
      {
        path: 'revenue',
        href: '/teacher/course',
        element: DASHBOARD_PAGE.TEACHER_DASHBOARD.ManagerCourse,
        title: 'Quản lý khoá học',
        icon: 'book',
      },
      {
        path: 'dashboard/user',
        href: '/teacher/dashboard/user',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.UserList,
        title: 'Quản lý người dùng',
        icon: 'user',
      },
      {
        path: 'dashboard/student',
        href: '/teacher/dashboard/student',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.StudentList,
        title: 'Quản lý học sinh',
        icon: 'user',
      },
      {
        path: 'dashboard/categories',
        href: '/teacher/dashboard/categories',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.CategoryList,
        title: 'Quản lý danh mục',
        icon: 'newspaper-o',
      },
      {
        path: 'dashboard/courses',
        title: 'Quản lý khoá học',
        href: '/teacher/dashboard/courses',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.CourseList,
        icon: 'book',
      },
      {
        path: 'dashboard/statistic',
        href: '/teacher/dashboard/statistic',
        element: DASHBOARD_PAGE.ADMIN_DASHBOARD.StatisticManage,
        title: 'Biểu đồ thống kê',
        icon: 'bar-chart',
        children: [
          {
            path: 'revenues',
            href: '/teacher/dashboard/statistic/revenues',
            title: 'Thống kê doanh thu',
            element: DASHBOARD_PAGE.ADMIN_DASHBOARD.RevenueStatistic,
            icon: 'money',
          },
        ],
      },
    ],
  },
]

export { MAIN_ROUTE, AUTH_ROUTE, ADMIN_ROUTE, TEACHER_ROUTE, DASHBOARD_ROUTE }
