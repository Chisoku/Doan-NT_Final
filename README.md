# 🌸 Ứng Dụng Bán Hoa Trực Tuyến

Đây là ứng dụng bán hoa được phát triển trong khuôn khổ môn học **Lập trình đa nền tảng**. Ứng dụng cho phép người dùng duyệt, đặt mua hoa, quản lý đơn hàng và thông tin cá nhân một cách thuận tiện trên thiết bị di động.

## 🛍️ Tính năng chính

### 1. Hệ thống sản phẩm và danh mục
- **Xem danh sách hoa**: Hiển thị sản phẩm theo danh mục như hoa hồng, hoa cúc, hoa lan,...
- **Chi tiết sản phẩm**: Thông tin mô tả, giá tiền, đánh giá, ảnh minh họa.
- **Sắp xếp linh hoạt**: Theo giá tăng/giảm, đánh giá.
- **Tìm kiếm nâng cao**: Tìm sản phẩm bằng từ khóa tên hoa.

### 2. Giỏ hàng và đặt hàng
- **Thêm vào giỏ hàng**: Chọn số lượng sản phẩm và thêm vào giỏ.
- **Xem giỏ hàng**: Xem toàn bộ sản phẩm đã chọn, cập nhật số lượng hoặc xoá sản phẩm.
- **Đặt hàng**: Gửi yêu cầu mua hàng, hệ thống ghi nhận và xử lý đơn.

### 3. Theo dõi đơn hàng
- **Trạng thái đơn hàng**: Xem tiến trình: đang xử lý, đang giao, đã giao.
- **Thông báo đơn hàng**: Nhận thông báo tự động khi trạng thái đơn thay đổi.
### 4. Quản lý tài khoản người dùng
- **Đăng ký / Đăng nhập**: Sử dụng JWT để xác thực người dùng.
- **Cập nhật thông tin cá nhân**: Họ tên, email, số điện thoại,...
- **Quản lý địa chỉ giao hàng**: Thêm/sửa/xoá địa chỉ nhận hàng.
- **Ảnh đại diện**: Cho phép người dùng tải ảnh đại diện (upload bằng Multer, lưu URL).

### 5. Giao diện và trải nghiệm người dùng
- **Responsive UI**: Giao diện tương thích nhiều thiết bị khác nhau.
- **Điều hướng rõ ràng**: Sử dụng React Navigation để điều hướng giữa các màn hình.
- **Trạng thái tải & lỗi**: Hiển thị loading khi đang xử lý và thông báo lỗi thân thiện.
- **Tối ưu trải nghiệm**: Giao diện nhẹ, mượt, dễ sử dụng.

### 6. Hệ thống backend và bảo mật
- **REST API**: Thiết kế rõ ràng, dễ mở rộng.
- **Xác thực JWT**: Bảo vệ các endpoint quan trọng.
- **Upload ảnh**: Xử lý upload bằng Multer, lưu link ảnh trong database.
- **Mã hoá mật khẩu**: Bảo mật thông tin người dùng với Bcrypt.
- **Quản lý dữ liệu với MySQL**: Tổ chức bảng hoa, người dùng, đơn hàng, chi tiết đơn hàng.


- [Frontend](./endfront/README.md)
- [Backend](./backend/README.md)

## 🧑‍💻 Công nghệ sử dụng

| Layer         | Công nghệ                                 |
|---------------|--------------------------------------------|
| Frontend      | React Native (Expo), React Navigation      |
| Backend       | Node.js, Express.js                        |
| Cơ sở dữ liệu | MySQL                                      |
| Hình ảnh      | Multer upload & lưu trữ dạng URL           |
| Authentication| JWT (JSON Web Token)                       |
| Dev Tool      | Postman, VS Code                           |

## 🧱 Kiến trúc công nghệ
<img src="https://github.com/user-attachments/assets/4b0518f1-2715-4bed-a21e-4323e8cd80e4" width="400"/>


## 2.🗂️ Thiết kế cơ sở dữ liệu
Ứng dụng sử dụng cơ sở dữ liệu quan hệ MySQL để lưu trữ thông tin sản phẩm, người dùng, đơn hàng và các thành phần liên quan. Dữ liệu được tổ chức dưới dạng các bảng với các mối quan hệ rõ ràng, đảm bảo tính toàn vẹn và hiệu quả khi truy xuất.
### 🧩 Sơ đồ cơ sở dữ liệu (ERD)
Hình dưới đây thể hiện sơ đồ các bảng chính và mối quan hệ giữa chúng:
![image](https://github.com/user-attachments/assets/71d7fdb4-c425-48e0-8a07-f3c02fa9e762)

Giải thích các bảng:
- users: Lưu thông tin người dùng như email, tên, mật khẩu, địa chỉ,...
- products: Danh sách sản phẩm (hoa), gồm tên, hình ảnh, giá, mô tả, lượt mua, danh mục.
- categories: Danh mục các loại hoa, liên kết với sản phẩm qua category_id.
- orders: Đại diện cho một đơn hàng, liên kết với người dùng và chứa thông tin địa chỉ giao hàng, trạng thái, tổng giá trị.
- order_items: Chi tiết đơn hàng, mỗi dòng tương ứng một sản phẩm trong đơn hàng.
- cartitems: Lưu sản phẩm mà người dùng thêm vào giỏ hàng (chưa đặt mua)
- feedbacks: Đánh giá của người dùng cho sản phẩm, bao gồm số sao và nội dung.
- notifications: Thông báo gửi đến người dùng, ví dụ như thay đổi trạng thái đơn hàng.

## 📌 Kết luận

Ứng dụng Bán Hoa là một nền tảng thương mại điện tử đơn giản nhưng hiệu quả, hướng đến việc cung cấp trải nghiệm mua sắm hoa trực tuyến tiện lợi, nhanh chóng và thân thiện với người dùng. Với các tính năng như tìm kiếm, phân loại, giỏ hàng, đặt hàng và theo dõi đơn hàng, người dùng có thể dễ dàng lựa chọn và mua sản phẩm hoa yêu thích chỉ trong vài thao tác.

Giao diện người dùng được xây dựng rõ ràng, dễ sử dụng với các component tuỳ chỉnh riêng cho từng loại nội dung. Backend được thiết kế an toàn và hiệu quả với các công nghệ hiện đại như Node.js, Express, JWT và MySQL, đảm bảo bảo mật dữ liệu và hoạt động ổn định.

Dự án này là bước đầu để xây dựng một hệ thống bán hàng online có thể mở rộng và nâng cấp về sau, đồng thời giúp nhóm thành viên tiếp cận quy trình phát triển ứng dụng thực tế từ frontend đến backend.

## 👥 Thành viên

- Ninh Thị Duyên  
- Nguyễn Mạnh Hùng
- Nguyễn Khánh Chi 
- Nguyễn Văn Nam

