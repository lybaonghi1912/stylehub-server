// js/main.js

// ĐỊA CHỈ SERVER (API bạn đang chạy)
const API_URL = "/api";

// 1. Hàm định dạng tiền tệ (700000 -> 700.000₫)
function formatVND(n) {
    return n.toLocaleString('vi-VN') + '₫';
}

// 2. Hàm gọi Server để lấy danh sách sản phẩm
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Server trả về lỗi");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi kết nối Server:", error);
        return [];
    }
}

// 3. Hàm hiển thị sản phẩm ra màn hình
function renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return; 

    if (items.length === 0) {
        container.innerHTML = "<p>Đang tải hoặc lỗi kết nối Server...</p>";
        return;
    }

    container.innerHTML = items.map(p => `
        <div class="product-card fade-up">
            <a href="product-detail.html?id=${p.id}">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='img/placeholder.png'">
                <h3>${p.name}</h3>
                <p class="price">${formatVND(p.price)}</p>
                <p class="sizes">Sizes: ${p.sizes.join(', ')}</p>
            </a>
            <button class="btn-add-cart" data-id="${p.id}">Add to Cart</button>
        </div>
    `).join('');

    // Thêm sự kiện add to cart
    container.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = items.find(x => x.id == btn.dataset.id);
            addToCart(product);
        });
    });
}

// 4. Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    if (!product) return;
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('cart') || '[]'); } catch(e){}

    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === (product.size || 'M'));
    if (existingIndex >= 0) {
        cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
    } else {
        cart.push({...product, qty: 1, size: product.sizes[0]});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Đã thêm "${product.name}" vào giỏ hàng.`);
}

// 5. Hàm đếm giỏ hàng và cập nhật số lượng
function updateCartCount() {
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('cart') || '[]'); } catch (e) {}
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = total;
}

// 6. Hàm khởi tạo app
async function initApp() {
    const products = await fetchProducts();

    // Trang chủ: Hiện 4 sản phẩm nổi bật
    if (document.getElementById('featured-grid')) {
        renderGrid('featured-grid', products.slice(0, 4));
    }

    // Trang products: Hiện tất cả
    if (document.getElementById('product-list-container')) {
        renderGrid('product-list-container', products);
    }

    // Cập nhật số lượng giỏ hàng
    updateCartCount();
}

// 7. Kích hoạt khi web load xong
document.addEventListener("DOMContentLoaded", initApp);
