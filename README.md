# Course Ecommerce- Thesis

## Demo Links:

[Link Apis](https://courses-ecommerce-apis.onrender.com/api-docs)

[Banking card demo](https://sandbox.vnpayment.vn/apis/vnpay-demo/)

[Link Demo Website](https://www.course-ecommerce.tk/)

# WEBSITE LOGIC SYSTEM DESCRIPTION

## 1. Tổng quan chức năng hệ thống:

| Đối tượng          | Chức năng                                    | Chi tiết                                                                                                                                                       |
| ------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chung              | Xếp loại khoá học                            | Tự động gắn thẻ khoá học hot, bestseller vào mỗi tháng                                                                                                         |
|                    | Xác thực và uỷ quyền                         | Đăng nhập cục bộ, đăng nhập bằng google.                                                                                                                       |
|                    | Xem, cập nhật thông tin tài khoản người dùng | Xem và chỉnh sửa thông tin của người dùng                                                                                                                      |
|                    | Tìm kiếm khoá học                            | Tìm kiếm khoá học theo tên, giá, loại danh mục…                                                                                                                |
|                    | Xem mô tả khoá học                           | Xem thông tin mô tả của khoá học như tên, giá, tác giả, yêu cầu, mục tiêu, chương trình học…                                                                   |
|                    | Đề xuất khoá học liên quan                   | Gợi ý khoá học liên quan về tên, giá, tác giả, danh mục.                                                                                                       |
|                    | Nhắn tin                                     | Nhắn tin realtime giữa học sinh, giảng viên và admin                                                                                                           |
| Học viên           | Gợi ý khoá học                               | Gợi ý khoá học dựa vào lịch sử tìm kiếm, lịch sử xem khoá học của người dùng                                                                                   |
|                    | Giỏ hàng và thanh toán                       | Quản lý giỏ hàng, thêm mã giảm giá, thanh toán bằng cổng thành toán VNPay                                                                                      |
|                    | Đánh giá khoá học đã mua                     | Đánh giá khoá học đã mua                                                                                                                                       |
|                    | Xem lịch sử thanh toán                       | Xem lịch sử thanh toán                                                                                                                                         |
|                    | Xem nội dung khoá học                        | Sử dụng HLS Video streaming để giảm dung lượng tải video, hạn chế người dùng tải video về, lưu thông tin tiến trình học của người dùng                         |
| Giảng viên         | Quản lý khoá học đã tạo                      | Thêm xoá sửa nội dung bài giảng, chương, mô tả khoá học…                                                                                                       |
|                    | Thống kê doanh thu                           | Thống kê doanh thu theo khoản thời gian                                                                                                                        |
|                    | Quản lý mã giảm giá của giảng viên           | Quản lý mã giảm giá, mã giảm giá chỉ áp dụng được cho các khoá học của giảng viên đó, mã giảm giá được lưu bằng google sheet                                   |
|                    | Quản lý hồ sơ giảng viên                     | Sửa nội dung giới thiệu bản thân, thông tin tài khoản thanh toán                                                                                               |
| Quản trị viên      | Quản lý tài người dùng                       | Xem, thêm sửa thông tin tài khoản người dùng, thêm danh sách bằng file excel, sao lưu dữ liệu bằng excel                                                       |
|                    | Quản lý khoá học                             | Xem sửa thông tin khoá học (kiểm duyệt khoá học)                                                                                                               |
|                    | Quản lý mã giảm giá                          | Xem, thêm xoá sửa mã giảm giá, xuất excel mã giảm giá                                                                                                          |
|                    | Thống kê                                     | Thống kê doanh thu theo khoản thời gian, thống kê người dùng mới, thống kê số lượng khoá học, top khoá học, thống kê doanh thu giảng viên theo khoản thời gian |
|                    | Quản lý danh mục khoá học                    | Xem thêm xoá sửa doanh mục khoá học                                                                                                                            |
|                    | Quản lý cấu hình trang web                   | Chỉnh sửa điều kiện, số lượng khoá học hot, bán chạy, banner…                                                                                                  |
| Giám đốc điều hành | Xem biểu đồ thống kê                         | Doanh thu hệ thống, bảng lương giảng viên, khoá học bán chạy, thống kê người dùng…                                                                             |

## 2. Tài khoản testing cho hệ thống:

```jsx
// User
user@gmail.com
// Admin
admin@gmail.com
// Teacher
teacher@gmail.com
// Director
giamdoc@gmail.com
//password(using for all)
123456789

```

## 3. Sơ lược thông tin các pages:

### 3.1 Trang chính (non-auth pages):

- Trang chủ khoá học
- Trang chi tiết khoá học
- Trang login (đăng nhập, đăng ký, quên mật khẩu)
- Trang xem hoá đơn công khai (bằng cách quét QR)
- Trang 401, 403,404

### 3.2 Trang học viên (user pages):

- Trang profile (cập nhật profile, đổi mật khẩu)
- Trang giỏ hàng (thanh toán, mua sau)
- Trang quản lý khoá học đã mua (đánh giá, xem khoá học)
- Trang quản lý hoá đơn đã mua
- Trang trò chuyện trực tuyến

### 3.3 Trang giảng viên (teacher pages):

- Trang profile (cập nhật profile, cập nhật porfolio, cập nhật thẻ ngân hàng, đổi mật khẩu)
- Trang quản lý khoá học (tạo, cập nhật khoá học)
- Trang xem doanh thu cá nhân
- Trang quản lý mã khuyến mãi (tạo mã khuyến mãi)
- Trang trò chuyện trực tuyến

### 3.4 Trang quản trị viên (admin pages):

- Trang profile (cập nhật profile, đổi mật khẩu)
- Quản lý người dùng (thêm, xoá, sửa, nhập-xuất bằng file excel)
- Quản lý danh mục khoá học
- Quản lý khoá học (duyệt khoá học)
- Quản lý hoá đơn
- Quản lý mã khuyến mãi
- Biểu đồ thống kê
  - Thống kê người dùng
  - Thống kê doanh thu
  - Doanh thu giảng viên
  - Thống kê khoá học
- Trang trò chuyện trực tuyến

### 3.5 Trang giám đốc điều hành (director pages):

- Biểu đồ thống kê
  - Thống kê người dùng
  - Thống kê doanh thu
  - Doanh thu giảng viên
  - Thống kê khoá học
