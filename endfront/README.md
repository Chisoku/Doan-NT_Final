# 🌸 Frontend - Ứng dụng bán hoa

## 📖 Giới thiệu
Đây là ứng dụng frontend cho cửa hàng bán hoa trực tuyến, giúp người dùng duyệt sản phẩm, xem chi tiết, thêm vào giỏ hàng và đặt mua nhanh chóng.

## ⚙️ Cách cài đặt và chạy
1. Clone dự án:
```bash
git clone https://github.com/username/flower-shop-frontend.git
cd flower-shop-frontend
```
2. Cài đặt dependencies: 
```bash
npm install
```

3. Chạy ứng dụng
```bash
npx expo start
```
## 📂 Cấu trúc thư mục
```
├── assets/ 🎨
│ └── # Thư mục chứa hình ảnh, icon, font chữ
│
├── contexts/ 🔄
│ └── # Quản lý trạng thái toàn cục (Context API)
│
├── node_modules/ 📦
│ └── # Thư viện dependencies được cài đặt tự động
│
├── src/
│ ├── components/ 🧩
│ │ └── # Các component UI tái sử dụng
│ ├── context/ 🔄
│ │ └── # Contexts để quản lý trạng thái (có thể khác với /contexts bên ngoài)
│ ├── data/ 🗃️
│ │ └── # Dữ liệu mẫu hoặc tĩnh trong app
│ ├── hooks/ 🪝
│ │ └── # Các custom React hooks tái sử dụng
│ ├── navigation/ 🧭
│ │ └── # Quản lý điều hướng màn hình
│ ├── screens/ 🖥️
│ │ └── # Các màn hình chính của ứng dụng
│ ├── services/ 🔌
│ │ └── # Các hàm gọi API hoặc xử lý nghiệp vụ
│ └── utils/ 🛠️
│ └── # Các hàm tiện ích hỗ trợ chung
│
├── config.js ⚙️
│ └── # File cấu hình (API endpoints, biến môi trường,...)
│
├── App.js 📱
│ └── # Điểm vào chính của ứng dụng React Native
│
├── app.json 📄
│ └── # Cấu hình ứng dụng Expo
│
├── index.js 🚀
│ └── # File khởi động app (entry point)
│
├── package-lock.json 🔒
│ └── # Khóa phiên bản các package
│
└── package.json 📦
└── # File mô tả dự án và khai báo dependencies
```
