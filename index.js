const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Dữ liệu sản phẩm (Mình lấy từ file data.js của bạn)
const products = [
  {
    id: 1,
    name: "CLASSIC BLACK JACKET",
    price: 700000,
    img: "img/ảnh 1.png", 
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "GREY HOODIE JACKET",
    price: 750000,
    img: "img/ảnh 6.png",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 3,
    name: "FIRE GARMENT LOGO TEE", 
    price: 490000,
    img: "img/ảnh 3.png", 
    sizes: ["S", "M", "L"]
  },
  {
    id: 4,
    name: "BLACK RAYON JACKET", 
    price: 700000,
    img: "img/ảnh 4.png", 
    sizes: ["M", "L", "XL"]
  },
  {
    id: 5,
    name: "BLACK WINDBREAKER",
    price: 680000,
    img: "img/ảnh 9.png", 
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "BROWN SUEDE JACKET",
    price: 1100000,
    img: "img/ảnh 10.png", 
    sizes: ["M", "L", "XL"]
  },
  // Bạn có thể copy thêm các sản phẩm khác vào đây sau
];

// API 1: Lấy danh sách sản phẩm
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API 2: Lấy chi tiết 1 sản phẩm
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
});

// API 3: Đặt hàng
app.post('/api/order', (req, res) => {
    console.log("Đơn hàng nhận được:", req.body);
    res.json({ success: true, message: "Đặt hàng thành công!" });
});

// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});