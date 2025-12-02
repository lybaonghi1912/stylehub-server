const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Sử dụng process.env.PORT để Render có thể chọn cổng thích hợp
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());

// ************************************************************
// FIX 1: PHỤC VỤ FILE TĨNH VÀ KHẮC PHỤC LỖI "Cannot GET /"
// Dòng này phục vụ tất cả file tĩnh từ thư mục gốc (__dirname).
// ************************************************************
// Lưu ý: path.resolve(__dirname) cũng hoạt động tốt và là cách chuẩn.
app.use(express.static(path.join(__dirname)));


// Dữ liệu sản phẩm (Mock data)
const products = [
  { id: 1, name: "CLASSIC BLACK JACKET", price: 700000, img: "img/ảnh 1.png", sizes: ["S", "M", "L", "XL"] },
  { id: 2, name: "GREY HOODIE JACKET", price: 750000, img: "img/ảnh 6.png", sizes: ["M", "L", "XL"] },
  { id: 3, name: "FIRE GARMENT LOGO TEE", price: 490000, img: "img/ảnh 3.png", sizes: ["S", "M", "L"] },
  { id: 4, name: "BLACK RAYON JACKET", price: 700000, img: "img/ảnh 4.png", sizes: ["M", "L", "XL"] },
  { id: 5, name: "BLACK WINDBREAKER", price: 680000, img: "img/ảnh 9.png", sizes: ["S", "M", "L", "XL"] },
  { id: 6, name: "BROWN SUEDE JACKET", price: 1100000, img: "img/ảnh 10.png", sizes: ["M", "L", "XL"] },
  { id: 7, name: "GREY SPORT JACKET", price: 720000, img: "img/ảnh 11.png", sizes: ["S", "M", "L"] },
  { id: 8, name: "NAVY CASUAL JACKET", price: 690000, img: "img/ảnh 12.png", sizes: ["M", "L", "XL"] },
  { id: 9, name: "OLIVE MILITARY JACKET", price: 850000, img: "img/ảnh 13.png", sizes: ["M", "L", "XL"] },
  { id: 10, name: "GARMENT POLO", price: 270000, img: "img/ảnh 14.png", sizes: ["M", "L", "XL"] },
  { id: 11, name: "GARMENT LONG SLEEVE", price: 470000, img: "img/ảnh 16.png", sizes: ["M", "L", "XL"] },
  { id: 12, name: "DOUBLE COLLAR", price: 570000, img: "img/ảnh 15.png", sizes: ["M", "L", "XL"] }
];


// API: Lấy toàn bộ danh sách sản phẩm
app.get('/api/products', (req, res) => {
  res.json(products);
});

// API: Lấy chi tiết 1 sản phẩm
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Sản phẩm không tồn tại" });
});

// API: Đặt hàng
app.post('/api/order', (req, res) => {
  console.log("Đơn hàng nhận được:", req.body);
  res.json({ success: true, message: "Đặt hàng thành công!" });
});

// ************************************************************
// FIX 1 (tiếp): Định nghĩa Route cho trang chủ
// Nếu Express không tìm thấy file tĩnh (index.html) ở route /, 
// dòng này sẽ đảm bảo nó được trả về.
// ************************************************************
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại PORT ${PORT}`);
});