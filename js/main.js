// js/main.js

// ĐỊA CHỈ SERVER (Đây là cái server bạn đang chạy đó)
const API_URL = "/api";

// 1. Hàm định dạng tiền tệ (700000 -> 700.000₫)
function formatVND(n) {
    return n.toLocaleString('vi-VN') + '₫';
}

// 2. Hàm gọi Server để lấy danh sách sản phẩm
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
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
        </div>
    `).join('');
}

// 4. HÀM CHẠY CHÍNH
async function initApp() {
    // Gọi server lấy dữ liệu
    const products = await fetchProducts();

    // Nếu ở trang chủ -> Hiện 4 sản phẩm
    if (document.getElementById('featured-grid')) {
        renderGrid('featured-grid', products.slice(0, 4));
    }

    // Nếu ở trang Products -> Hiện hết
    if (document.getElementById('product-list-container')) {
        renderGrid('product-list-container', products);
    }

    updateCartCount();
}

// 5. Hàm đếm giỏ hàng
function updateCartCount() {
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('cart') || '[]'); } catch (e) {}
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = total;
}

// Kích hoạt khi web load xong
document.addEventListener("DOMContentLoaded", initApp);