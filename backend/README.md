
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
