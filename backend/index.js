/*
npx sequelize-cli init : tạo cấu trúc thư mục ban đầu 
npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string,role:integer,avatar:string,phone:integer,address:string,created_at:date,updated_at:date

Run Migrationns: 
npx sequelize-cli db:migrate 

Revert the most recent migration:
npx sequelize-cli db:migrate:undo

npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string,role:integer,avatar:string,phone:integer,address:string,created_at:date,updated_at:date
npx sequelize-cli model:generate --name Category --attributes name:string,image:text
npx sequelize-cli model:generate --name Product --attributes name:string,image:text,price:integer,description:text,buyturn:integer,category_id:integer
npx sequelize-cli model:generate --name Feedback --attributes product_id:integer,user_id:integer,star:integer,content:text,created_at:date,updated_at:date
npx sequelize-cli model:generate --name Order --attributes user_id:integer,status:string,content:text,payment_type:string,total_price:integer,created_at:date,updated_at:date,shipping_address:string
npx sequelize-cli model:generate --name CartItem --attributes user_id:integer,product_id:integer,quantity:integer
npx sequelize-cli model:generate --name OrderItem --attributes user_id:integer,product_id:integer,quantity:integer,price:integer,note:string
npx sequelize-cli model:generate --name Notification --attributes user_id:integer,msg:string,is_read:integer,created_at:date,type:string


SELECT * 
FROM information_schema.table_constraints
WHERE table_schema = 'shopapp_online' 
AND table_name = 'products';


*/ 
import express from 'express'
import dotenv from 'dotenv'
dotenv.config() 
import cors from 'cors'


import { AppRoute } from './AppRoute'


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use('/upload', express.static('upload'));

app.get('/', (req, res) => {
  res.send('Hello World!')
});
AppRoute(app); 
const port = process?.env?.PORT ?? 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


