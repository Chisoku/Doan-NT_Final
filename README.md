# 🌸 Ứng Dụng Bán Hoa Trực Tuyến

Đây là ứng dụng bán hoa được phát triển trong khuôn khổ môn học **Lập trình đa nền tảng**. Ứng dụng cho phép người dùng duyệt, đặt mua hoa, quản lý đơn hàng và thông tin cá nhân một cách thuận tiện trên thiết bị di động.

## 1.🚀 Tổng quan

### 🛍️ Tính năng chính (Dành cho người dùng)
- Xem danh sách hoa theo danh mục
- Sắp xếp hoa theo: liên quan, mới nhất, giá, đánh giá
- Tìm kiếm sản phẩm
- Thêm vào giỏ hàng, đặt hàng
- Nhận thông báo trạng thái đơn hàng
- Theo dõi đơn mua: đang giao, đã giao
- Quản lý địa chỉ giao hàng
- Cập nhật thông tin tài khoản

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


