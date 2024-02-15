const translateVi = (name?: string) => {
  switch (name) {
    //role
    case "student":
      return "Học viên";
    case "teacher":
      return "Giảng viên";
    case "admin":
      return "Quản trị viên";
    case "director":
      return "Giám đốc điều hành";

    //user
    case "fullName":
      return "Họ và tên";
    case "birthday":
      return "Ngày sinh nhật";
    case "gender":
      return "Giới tính";
    case "phone":
      return "Số điện thoại";
    case "avatar":
      return "Ảnh đại diện";
    //level
    case "all":
      return "Tất cả";
    case "beginer":
      return "Người bắt đầu";
    case "intermediate":
      return "Người có kiến thức";
    case "expert":
      return "Chuyên gia";
    //payment
    case "Paid":
      return "Đã thanh toán";
    //status course
    case "draft":
      return "Đang nháp";
    case "pending":
      return "Đang chờ";
    case "approved":
      return "Đã duyệt";
    // category
    case "name":
      return "Tên";
    case "publish":
      return "Xuất bản";
    //statistic, chart
    case "publishCourse":
      return "Được công bố";
    case "pendingCourse":
      return "Đang chờ duyệt";
    case "updating":
      return "Đang update";

    default:
      return name;
  }
};

export default translateVi;
