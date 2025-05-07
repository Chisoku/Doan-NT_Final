import express from 'express';
import multer from 'multer';
import * as ProductController from './controllers/ProductController.js';
import * as CategoryController from './controllers/CategoryController.js';
import * as OrderController from './controllers/OrderController.js'; 
import * as CartItemController from './controllers/CartItemController.js';
import * as OrderItemController from './controllers/OrderItemController.js';
import * as UserController from './controllers/UserController.js';
import * as FeedbackController from './controllers/FeedbackController.js';
import * as NotificationController from './controllers/NotificationController.js';

import asyncHandler from './middlewares/asyncHandler.js';
import validate from './middlewares/validate.js';
import authMiddleware from './middlewares/authMiddleware.js';


import InsertProductRequest from './dtos/requests/product/InsertProductRequest.js';
import UpdateProductRequest from './dtos/requests/product/UpdateProductRequest.js';

import InsertUserRequest from './dtos/requests/user/InsertUserRequest.js';
import UpdateUserRequest from './dtos/requests/user/UpdateUserRequest.js';


// Cấu hình multer để lưu file ảnh vào thư mục 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]; // Lấy phần mở rộng của file
    const filename = Date.now() + '.' + ext;
    cb(null, filename);
    },
});

const upload = multer({ storage: storage });


export function AppRoute(app) {
    const router = express.Router();

    // Middleware kiểm tra token, bỏ qua nếu là login hoặc register
    router.use((req, res, next) => {
        const publicPaths = [
            { method: 'POST', path: '/users' },       // Đăng ký
            { method: 'POST', path: '/users/login' }  // Đăng nhập
        ];

        const isPublic = publicPaths.some(route =>
            route.method === req.method && route.path === req.path
        );

        if (isPublic) {
            return next();
        }

        return authMiddleware(req, res, next);
    });


    // Product Routes
    router.get('/products/:id', asyncHandler(ProductController.getProductById));
    router.get('/products', asyncHandler(ProductController.getProducts));
    
    // Route POST để thêm sản phẩm
    router.post('/products', upload.single('image'),validate(InsertProductRequest) ,asyncHandler(ProductController.insertProduct));


    router.put('/products/:id', 
        validate(UpdateProductRequest),
        asyncHandler(ProductController.updateProduct));

    router.delete('/products/:id', asyncHandler(ProductController.deleteProduct));

    // Category Routes
    router.get('/categories', asyncHandler(CategoryController.getCategories));
    router.get('/categories/:id', asyncHandler(CategoryController.getCategoryById));
    router.post('/categories', asyncHandler(CategoryController.insertCategory));
    router.put('/categories/:id', asyncHandler(CategoryController.updateCategory));
    router.delete('/categories/:id', asyncHandler(CategoryController.deleteCategory));

    // Order Routes
    router.get('/orders', asyncHandler(OrderController.getOrders));
    router.get('/orders/:id', asyncHandler(OrderController.getOrderById));
    router.post('/orders', asyncHandler(OrderController.insertOrder));
    router.put('/orders/:id', asyncHandler(OrderController.updateOrder));
    router.delete('/orders/:id', asyncHandler(OrderController.deleteOrder));
    router.get('/orders/user/:userId', asyncHandler(OrderController.getOrdersByUserId));




    // CartItem Routes
    router.get('/cartitems', asyncHandler(CartItemController.getCartItems));
    router.get('/cartitems/:id', asyncHandler(CartItemController.getCartItemById));
    router.post('/cartitems', asyncHandler(CartItemController.insertCartItem));
    router.put('/cartitems/:id', asyncHandler(CartItemController.updateCartItem));
    router.delete('/cartitems/:id', asyncHandler(CartItemController.deleteCartItem));

    // OrderItem Routes
    router.get('/orderitems', asyncHandler(OrderItemController.getOrderItems));
    router.get('/orderitems/:id', asyncHandler(OrderItemController.getOrderItemById));
    router.post('/orderitems', asyncHandler(OrderItemController.insertOrderItem));
    router.put('/orderitems/:id', asyncHandler(OrderItemController.updateOrderItem));
    router.delete('/orderitems/:id', asyncHandler(OrderItemController.deleteOrderItem));
    router.put('/orderitems/:id/chikun', asyncHandler(OrderItemController.updateOrderItemQuantity));


    // User Routes
    router.get('/users/:id', asyncHandler(UserController.getUserById));
    router.get('/users', asyncHandler(UserController.getUsers));
    router.post('/users', validate(InsertUserRequest), asyncHandler(UserController.insertUser));
    router.put('/users/:id', validate(UpdateUserRequest), asyncHandler(UserController.updateUser));
    router.delete('/users/:id', asyncHandler(UserController.deleteUser));
    router.post('/users/login', asyncHandler(UserController.loginUser));

    
    // Feedback Routes
    router.get('/feedbacks/:product_id', asyncHandler(FeedbackController.getFeedbacksByProductId));
    router.post('/feedbacks', asyncHandler(FeedbackController.createFeedback));
    
    // Notification Routes
    router.get("/notifications/:user_id", asyncHandler(NotificationController.getNotifications)); // Lấy danh sách thông báo của người dùng
    router.put("/notifications/:id", asyncHandler(NotificationController.markNotificationAsRead)); // Đánh dấu thông báo là đã đọc
    router.delete("/notifications/:id", asyncHandler(NotificationController.deleteNotification)); // Xóa thông báo
    router.post("/notifications", asyncHandler(NotificationController.createNotification)); // Tạo thông báo mới



    app.use('/api/', router);
}
