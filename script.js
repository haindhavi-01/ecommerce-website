// Product Data

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 4,
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },

    {
        id: 5,
        name: "Coffee Maker",
        category: "Home",
        price: 2999,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6"
    },

    {
        id: 6,
        name: "Table Lamp",
        category: "Home",
        price: 999,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
    },

    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1299,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    },

    {
        id: 8,
        name: "Backpack",
        category: "Fashion",
        price: 1199,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    }

];


// Cart Array

let cart = [];


// Display Products

function displayProducts(productList) {

    const container =
        document.getElementById("product-container");

    container.innerHTML = "";


    if (productList.length === 0) {

        container.innerHTML =
            "<h3>No products found.</h3>";

        return;
    }


    productList.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.classList.add("product-card");


        productCard.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <p class="price">
                ₹${product.price}
            </p>

            <button
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

        `;


        container.appendChild(productCard);

    });

}


// Load Products When Page Opens

displayProducts(products);


// Filter Products

function filterProducts(category) {

    if (category === "All") {

        displayProducts(products);

        return;
    }


    const filteredProducts =
        products.filter(
            product => product.category === category
        );


    displayProducts(filteredProducts);
}


// Search Products

function searchProducts() {

    const searchValue =
        document
            .getElementById("search-input")
            .value
            .toLowerCase();


    const filteredProducts =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(searchValue)

            ||

            product.category
                .toLowerCase()
                .includes(searchValue)

        );


    displayProducts(filteredProducts);
}


// Add Product To Cart

function addToCart(productId) {

    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        const product =
            products.find(item => item.id === productId);


        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();


    alert("Product added to cart!");
}


// Update Cart

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent = totalItems;


    displayCart();
}


// Display Cart

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        document.getElementById(
            "cart-total"
        ).textContent = "0";

        return;
    }


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    ₹${item.price}
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    calculateTotal();
}


// Change Quantity

function changeQuantity(productId, change) {

    const product =
        cart.find(item => item.id === productId);


    if (!product) {
        return;
    }


    product.quantity += change;


    if (product.quantity <= 0) {

        removeFromCart(productId);

        return;
    }


    updateCart();
}


// Remove From Cart

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    updateCart();
}


// Calculate Total

function calculateTotal() {

    const total =
        cart.reduce(

            (sum, item) =>

                sum +
                item.price *
                item.quantity,

            0

        );


    document.getElementById(
        "cart-total"
    ).textContent = total;
}


// Open Cart

function openCart() {

    document.getElementById(
        "cart-modal"
    ).style.display = "block";

}


// Close Cart

function closeCart() {

    document.getElementById(
        "cart-modal"
    ).style.display = "none";

}


// Open Checkout

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add products first."
        );

        return;
    }


    closeCart();


    document.getElementById(
        "checkout-modal"
    ).style.display = "block";

}


// Close Checkout

function closeCheckout() {

    document.getElementById(
        "checkout-modal"
    ).style.display = "none";

}


// Place Order

function placeOrder(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();


    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        address === ""
    ) {

        alert(
            "Please fill in all fields."
        );

        return;
    }


    if (phone.length !== 10) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }


    alert(
        `Thank you ${name}! Your order has been placed successfully.`
    );


    cart = [];

    updateCart();

    document.getElementById(
        "checkout-form"
    ).reset();


    closeCheckout();
}