
const products = [
    {
        id: 1,
        name: "Premium Casual Shirt",
        category: "Clothing",
        price: 1299,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"
    },
    {
        id: 2,
        name: "Classic Sneakers",
        category: "Shoes",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 3,
        name: "Luxury Watch",
        category: "Accessories",
        price: 3999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },
    {
        id: 4,
        name: "Modern Sunglasses",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 5,
        name: "Women's Fashion",
        category: "Clothing",
        price: 1899,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"
    },
    {
        id: 6,
        name: "Sport Sneakers",
        category: "Shoes",
        price: 2999,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"
    },
    {
        id: 7,
        name: "Leather Handbag",
        category: "Accessories",
        price: 2199,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
    },
    {
        id: 8,
        name: "Casual Jacket",
        category: "Clothing",
        price: 2799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
    }
];

let cart = [];

const productGrid = document.getElementById("productGrid");

function displayProducts(items) {
    productGrid.innerHTML = "";

    items.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}"
                     onerror="this.src='https://placehold.co/600x400?text=Product'">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        Add to Cart +
                    </button>
                </div>
            </div>
        `;
    });
}

function filterProducts(category) {
    const filtered = category === "All"
        ? products
        : products.filter(p => p.category === category);

    displayProducts(filtered);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    document.getElementById("cartCount").innerText =
        cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cartItems").innerHTML =
        cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price.toLocaleString("en-IN")} × ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cartTotal").innerText =
        total.toLocaleString("en-IN");
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function toggleCart() {
    document.getElementById("cartPanel").classList.toggle("active");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Demo checkout! Total: ₹" +
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toLocaleString("en-IN"));
}

document.getElementById("searchInput").addEventListener("input", function() {
    const query = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    displayProducts(filtered);
});

displayProducts(products);