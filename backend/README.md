# 🌸 Backend - Ứng dụng bán hoa
Phần backend của ứng dụng bán hoa được xây dựng với mục tiêu cung cấp các API chuẩn RESTful để phục vụ cho việc quản lý và vận hành hệ thống bán hàng. Backend chịu trách nhiệm xử lý các nghiệp vụ như quản lý sản phẩm, danh mục, đơn hàng, giỏ hàng, người dùng, đánh giá và thông báo. Đồng thời, backend cũng đảm bảo bảo mật và tối ưu hiệu suất truy xuất dữ liệu.
## 📁 Cấu trúc thư mục Backend
```
backend/
├── controllers/ 🧑‍💻 # Xử lý logic của các API, nhận request và trả response
├── dtos/ 📝 # Định nghĩa các Data Transfer Objects để validate và chuyển đổi dữ liệu
├── middlewares/ 🛡️ # Các middleware trung gian (xác thực, xử lý lỗi, logging,...)
├── migrations/ 🛠️ # Các file migration quản lý thay đổi schema cơ sở dữ liệu
├── models/ 🗄️ # Định nghĩa các model, mapping với bảng trong database
├── upload/ 📤 # Lưu trữ file upload (ảnh, tài liệu,...)
├── approute/ 🚦 # Định nghĩa các route API và nhóm route theo module
└── index.js 🚀 # Điểm khởi động server (entry point của backend)
```
## 🗂️ Thiết kế cơ sở dữ liệu
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

### 📚 Chi tiết các bảng cơ sở dữ liệu

#### 1. 👥 Bảng `users` - Thông tin người dùng

| Tên cột      | Kiểu dữ liệu | Mô tả                                    |
|--------------|--------------|-----------------------------------------|
| `id`         | int          | Khóa chính, định danh duy nhất người dùng |
| `email`      | varchar      | Email đăng nhập của người dùng           |
| `password`   | varchar      | Mật khẩu đã được mã hóa                   |
| `name`       | varchar      | Họ và tên người dùng                      |
| `role`       | int          | Quyền hạn (ví dụ: 0 = khách, 1 = admin) |
| `avatar`     | varchar      | Đường dẫn ảnh đại diện                    |
| `phone`      | int          | Số điện thoại                            |
| `address`    | varchar      | Địa chỉ người dùng                       |
| `created_at` | datetime     | Thời gian tạo tài khoản                   |
| `updated_at` | datetime     | Thời gian cập nhật thông tin cuối cùng   |

---

#### 2. 🗂️ Bảng `categories` - Danh mục sản phẩm

| Tên cột | Kiểu dữ liệu | Mô tả                 |
|---------|--------------|----------------------|
| `id`    | int          | Khóa chính danh mục    |
| `name`  | varchar      | Tên danh mục sản phẩm  |
| `image` | text         | Hình ảnh đại diện danh mục |

---

#### 3. 🌸 Bảng `products` - Sản phẩm

| Tên cột      | Kiểu dữ liệu | Mô tả                                             |
|--------------|--------------|--------------------------------------------------|
| `id`         | int          | Khóa chính sản phẩm                               |
| `name`       | varchar      | Tên sản phẩm                                     |
| `image`      | text         | Hình ảnh sản phẩm                                |
| `price`      | int          | Giá bán sản phẩm                                 |
| `description`| text         | Mô tả chi tiết về sản phẩm                        |
| `buyturn`    | int          | Số lần sản phẩm đã được mua (lượt mua)           |
| `category_id`| int          | Khóa ngoại liên kết tới bảng `categories`        |

**Quan hệ:**  
`products.category_id` liên kết với `categories.id` (Một sản phẩm thuộc một danh mục)

---

#### 4. 📝 Bảng `feedbacks` - Đánh giá sản phẩm

| Tên cột      | Kiểu dữ liệu | Mô tả                                            |
|--------------|--------------|-------------------------------------------------|
| `id`         | int          | Khóa chính đánh giá                              |
| `product_id` | int          | Khóa ngoại, sản phẩm được đánh giá               |
| `user_id`    | int          | Khóa ngoại, người dùng đánh giá                   |
| `star`       | int          | Số sao đánh giá (ví dụ: từ 1 đến 5)              |
| `content`    | text         | Nội dung nhận xét                                 |
| `created_at` | datetime     | Thời gian tạo đánh giá                            |
| `updated_at` | datetime     | Thời gian cập nhật đánh giá cuối cùng             |

**Quan hệ:**  
- `feedbacks.product_id` liên kết với `products.id`  
- `feedbacks.user_id` liên kết với `users.id`

---

#### 5. 🛒 Bảng `orders` - Đơn hàng

| Tên cột          | Kiểu dữ liệu | Mô tả                                            |
|------------------|--------------|-------------------------------------------------|
| `id`             | int          | Khóa chính đơn hàng                              |
| `user_id`        | int          | Khóa ngoại, người dùng đặt đơn                    |
| `status`         | varchar      | Trạng thái đơn hàng (ví dụ: pending, shipped)    |
| `content`        | text         | Nội dung chi tiết đơn hàng (có thể là ghi chú)   |
| `payment_type`   | varchar      | Hình thức thanh toán                              |
| `total_price`    | int          | Tổng giá trị đơn hàng                             |
| `created_at`     | datetime     | Thời gian tạo đơn hàng                            |
| `updated_at`     | datetime     | Thời gian cập nhật đơn hàng                       |
| `shipping_address`| varchar     | Địa chỉ giao hàng                                 |

**Quan hệ:**  
`orders.user_id` liên kết với `users.id`

---

#### 6. 🛍️ Bảng `cart_items` - Mục giỏ hàng

| Tên cột     | Kiểu dữ liệu | Mô tả                                       |
|-------------|--------------|--------------------------------------------|
| `id`        | int          | Khóa chính mục giỏ hàng                     |
| `user_id`   | int          | Khóa ngoại người dùng                        |
| `product_id`| int          | Khóa ngoại sản phẩm                          |
| `quantity`  | int          | Số lượng sản phẩm trong giỏ                  |

**Quan hệ:**  
- `cart_items.user_id` liên kết với `users.id`  
- `cart_items.product_id` liên kết với `products.id`

---

#### 7. 🧾 Bảng `order_items` - Chi tiết đơn hàng

| Tên cột     | Kiểu dữ liệu | Mô tả                                            |
|-------------|--------------|-------------------------------------------------|
| `id`        | int          | Khóa chính chi tiết đơn hàng                      |
| `order_id`  | int          | Khóa ngoại đơn hàng                               |
| `product_id`| int          | Khóa ngoại sản phẩm                               |
| `quantity`  | int          | Số lượng sản phẩm trong đơn                       |
| `price`     | int          | Giá sản phẩm tại thời điểm đặt                    |
| `note`      | varchar      | Ghi chú thêm cho sản phẩm trong đơn               |

**Quan hệ:**  
- `order_items.order_id` liên kết với `orders.id`  
- `order_items.product_id` liên kết với `products.id`

---

#### 8. 🔔 Bảng `notifications` - Thông báo

| Tên cột     | Kiểu dữ liệu | Mô tả                                 |
|-------------|--------------|--------------------------------------|
| `id`        | int          | Khóa chính thông báo                  |
| `user_id`   | int          | Khóa ngoại người dùng nhận thông báo |
| `msg`       | varchar      | Nội dung thông báo                    |
| `is_read`   | int          | Trạng thái đã đọc (0 = chưa, 1 = đã)|
| `created_at`| datetime     | Thời gian tạo thông báo               |
| `type`      | varchar      | Loại thông báo (ví dụ: đơn hàng, khuyến mãi) |

---

### 📊 Sơ đồ quan hệ bảng (ER Diagram) - Tóm tắt

- 👤 `users` 1 — N `orders`  
- 👤 `users` 1 — N `cart_items`  
- 👤 `users` 1 — N `feedbacks`  
- 👤 `users` 1 — N `notifications`  
- 🗂️ `categories` 1 — N `products`  
- 🌸 `products` 1 — N `feedbacks`  
- 🌸 `products` 1 — N `cart_items`  
- 🛒 `orders` 1 — N `order_items`  
- 🌸 `products` 1 — N `order_items`  

## 🚀 API Backend - Ứng dụng Bán Hoa

Ứng dụng được xây dựng theo kiến trúc RESTful API với các nhóm API chính phục vụ chức năng người dùng, sản phẩm, giỏ hàng, đơn hàng, đánh giá và thông báo.

---

### 1. 👥 Users (Người dùng & Xác thực)

#### Xác thực người dùng

| Phương thức | Endpoint                  | Mô tả                               |
|-------------|---------------------------|------------------------------------|
| POST        | `/api/users/register`     | Đăng ký tài khoản mới             |
| POST        | `/api/users/login`        | Đăng nhập                       |
| POST        | `/api/users/logout`       | Đăng xuất                      |
| POST        | `/api/users/refresh-token`| Cấp lại token mới                |

#### Quản lý người dùng

| Phương thức | Endpoint              | Mô tả                               |
|-------------|-----------------------|------------------------------------|
| GET         | `/api/users`          | Lấy danh sách tất cả người dùng  |
| GET         | `/api/users/:id`      | Lấy thông tin chi tiết người dùng |
| PUT         | `/api/users/:id`      | Cập nhật thông tin người dùng     |
| PUT         | `/api/users/:id/password` | Đổi mật khẩu người dùng        |
| DELETE      | `/api/users/:id`      | Xóa người dùng                   |

---

### 2. 🗂️ Categories (Danh mục sản phẩm)

| Phương thức | Endpoint              | Mô tả                        |
|-------------|-----------------------|-----------------------------|
| GET         | `/api/categories`     | Lấy danh sách danh mục    |
| POST        | `/api/categories`     | Thêm danh mục mới          |
| PUT         | `/api/categories/:id` | Cập nhật danh mục         |
| DELETE      | `/api/categories/:id` | Xóa danh mục             |

---

### 3. 🌸 Products (Sản phẩm)

| Phương thức | Endpoint              | Mô tả                         |
|-------------|-----------------------|------------------------------|
| GET         | `/api/products`       | Lấy danh sách sản phẩm      |
| GET         | `/api/products/:id`   | Xem chi tiết sản phẩm      |
| POST        | `/api/products`       | Thêm sản phẩm mới           |
| PUT         | `/api/products/:id`   | Cập nhật sản phẩm           |
| DELETE      | `/api/products/:id`   | Xóa sản phẩm              |

---

### 4. 🛍️ Cart (Giỏ hàng)

| Phương thức | Endpoint           | Mô tả                               |
|-------------|--------------------|------------------------------------|
| POST        | `/api/cart`        | Thêm sản phẩm vào giỏ            |
| GET         | `/api/cart`        | Lấy giỏ hàng của người dùng       |
| PUT         | `/api/cart/:id`    | Cập nhật số lượng sản phẩm trong giỏ |
| DELETE      | `/api/cart/:id`    | Xóa sản phẩm khỏi giỏ             |

---

### 5. 🛒 Orders (Đơn hàng)

| Phương thức | Endpoint           | Mô tả                            |
|-------------|--------------------|---------------------------------|
| POST        | `/api/orders`      |  Tạo đơn hàng mới               |
| GET         | `/api/orders`      |  Lấy danh sách đơn hàng        |
| GET         | `/api/orders/:id`  |  Xem chi tiết đơn hàng        |
| PUT         | `/api/orders/:id`  |  Cập nhật trạng thái đơn hàng  |
| DELETE      | `/api/orders/:id`  |  Hủy đơn hàng                 |

---

### 6. 📦 Order Items (Chi tiết đơn hàng)

| Phương thức | Endpoint                 | Mô tả                            |
|-------------|--------------------------|---------------------------------|
| GET         | `/api/order-items/:orderId` | Lấy danh sách sản phẩm trong đơn hàng |

---

### 7. 📝 Feedbacks (Đánh giá sản phẩm)

| Phương thức | Endpoint              | Mô tả                          |
|-------------|-----------------------|-------------------------------|
| POST        | `/api/feedbacks`      | Người dùng đánh giá sản phẩm |
| GET         | `/api/feedbacks/:product_id` | Lấy đánh giá của sản phẩm |

---

### 8. 🔔 Notifications (Thông báo)

| Phương thức | Endpoint                | Mô tả                                |
|-------------|-------------------------|-------------------------------------|
| GET         | `/api/notifications`    | Lấy danh sách thông báo của người dùng |
| PUT         | `/api/notifications/:id`| Đánh dấu thông báo đã đọc         |
| DELETE      | `/api/notifications/:id`| Xóa thông báo                    |

---

# ⚙️ Tổng kết

Hệ thống API cung cấp đầy đủ các chức năng cơ bản cho ứng dụng bán hoa, đảm bảo việc quản lý người dùng, danh mục, sản phẩm, giỏ hàng, đơn hàng, đánh giá và thông báo được thực hiện hiệu quả và an toàn. Các endpoint được thiết kế chuẩn RESTful, dễ sử dụng và mở rộng trong tương lai.

