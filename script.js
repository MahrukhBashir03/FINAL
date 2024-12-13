// Product Data
const products = [
    { id: 1, name: "Stylish Shirt", price: 1500, img: "images/shirt.jpg", details: "A stylish cotton shirt perfect for casual wear." },
    { id: 2, name: "Elegant Dress", price: 2000, img: "images/dress.jpg", details: "A sleek dress for formal occasions." },
    { id: 3, name: "Simple T-shirt", price: 1500, img: "images/tshirt.jpg", details: "A classic t-shirt for everyday comfort and style." },
    { id: 4, name: "Classic Jeans", price: 1800, img: "images/jeans.jpg", details: "Durable and comfortable jeans with a timeless design." },
    { id: 5, name: "Casual Shoes", price: 4000, img: "images/shoes.jpg", details: "Lightweight and stylish shoes for casual outings." },
    { id: 6, name: "High Heels", price: 4000, img: "images/highheels.jpg", details: "Elegant high heels for formal and party wear." },
    { id: 7, name: "Long Boots", price: 4000, img: "images/boots.jpg", details: "Stylish and warm boots perfect for colder seasons." },
    { id: 8, name: "Smart Watch", price: 5000, img: "images/watch.jpg", details: "A stylish and functional smartwatch for everyday use." },
];

let cart = [];

// CART PAGE (index.html) - Cart Management
document.addEventListener("DOMContentLoaded", () => {
    const subtotalElement = document.getElementById("subtotal");
    const proceedToCheckoutButton = document.getElementById("proceed-to-checkout");

    // Update subtotal
    const updateSubtotal = () => {
        let subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        subtotalElement.innerText = `PKR ${subtotal}`;
    };

    // Update quantity display
    const updateQuantityDisplay = (productId) => {
        const quantityInput = document.querySelector(`.quantity[data-id='${productId}']`);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem && quantityInput) {
            quantityInput.value = cartItem.quantity;
        }
    };

    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            const input = e.target.previousElementSibling; // Quantity input
            input.value = parseInt(input.value) + 1; // Increase value
            updateQuantity(productId, "increase");
        });
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            const input = e.target.nextElementSibling; // Quantity input
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1; // Decrease value
                updateQuantity(productId, "decrease");
            }
        });
    });

    // Add product to cart
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateQuantityDisplay(productId);
        updateSubtotal();
    };

    // Update quantity in cart
    const updateQuantity = (productId, action) => {
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            if (action === "increase") {
                cartItem.quantity++;
            } else if (action === "decrease" && cartItem.quantity > 1) {
                cartItem.quantity--;
            } else if (action === "decrease" && cartItem.quantity === 1) {
                cart = cart.filter(item => item.id !== productId);
            }
        }
        updateQuantityDisplay(productId);
        updateSubtotal();
    };

    // Event Listeners for Buttons
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
        if (e.target.classList.contains("increase")) {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, "increase");
        }
        if (e.target.classList.contains("decrease")) {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, "decrease");
        }
        if (e.target.classList.contains("view-details")) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            alert(`Name: ${product.name}\nPrice: PKR ${product.price}\nDetails: ${product.details}`);
        }
    });

    // Proceed to Checkout
    proceedToCheckoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Add items before proceeding to checkout.");
            return;
        }

        // Save cart data and redirect
        localStorage.setItem("cartData", JSON.stringify(cart));
        window.location.href = "checkout.html";
    });

    updateSubtotal();
});

// CHECKOUT PAGE (checkout.html) - Order Summary
if (window.location.pathname.includes("checkout.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const checkoutItemsContainer = document.getElementById("checkout-items");
        const grandTotalElement = document.getElementById("grand-total");
        const placeOrderButton = document.getElementById("place-order");
        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

        let grandTotal = 0;

        // Populate Checkout Table
        cartData.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>PKR ${item.price}</td>
                <td>${item.quantity}</td>
                <td>PKR ${item.price * item.quantity}</td>
            `;
            grandTotal += item.price * item.quantity;
            checkoutItemsContainer.appendChild(row);
        });

        grandTotalElement.innerText = `PKR ${grandTotal}`;

        // Place Order
        placeOrderButton.addEventListener("click", () => {
            if (cartData.length === 0) {
                alert("Your cart is empty! Please add items before placing an order.");
            } else {
                alert("Your order has been placed successfully!");
                localStorage.removeItem("cartData"); // Clear cart
                window.location.href = "index.html"; // Redirect to cart page
            }
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        const subtotalElement = document.getElementById("subtotal");
    
        // Update subtotal
        const updateSubtotal = () => {
            let subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            subtotalElement.innerText = `PKR ${subtotal}`;
        };
    
        // Update quantity display
        const updateQuantityDisplay = (productId) => {
            const quantityInput = document.querySelector(`.quantity[data-id='${productId}']`);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem && quantityInput) {
                quantityInput.value = cartItem.quantity;
            }
        };
    
        // Add product to cart
        const addToCart = (productId) => {
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);
    
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            renderCart(); // Refresh the cart display
            updateSubtotal();
        };
    
        // Update quantity in cart
        const updateQuantity = (productId, action) => {
            const cartItem = cart.find(item => item.id === productId);
    
            if (cartItem) {
                if (action === "increase") {
                    cartItem.quantity++;
                } else if (action === "decrease" && cartItem.quantity > 1) {
                    cartItem.quantity--;
                } else if (action === "decrease" && cartItem.quantity === 1) {
                    cart = cart.filter(item => item.id !== productId);
                }
            }
            renderCart(); // Refresh the cart display
            updateSubtotal();
        };
    
        // Render cart dynamically
        const renderCart = () => {
            const cartContainer = document.getElementById("cart-items");
            cartContainer.innerHTML = ""; // Clear previous content
            cart.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>PKR ${item.price}</td>
                    <td>
                        <button class="decrease" data-id="${item.id}">-</button>
                        <input type="number" class="quantity" data-id="${item.id}" value="${item.quantity}" readonly>
                        <button class="increase" data-id="${item.id}">+</button>
                    </td>
                    <td>PKR ${item.price * item.quantity}</td>
                `;
                cartContainer.appendChild(row);
            });
            attachEventListeners(); // Attach event listeners to the new elements
        };
    
        // Attach event listeners for buttons
        const attachEventListeners = () => {
            document.querySelectorAll(".increase").forEach(button => {
                button.addEventListener("click", (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    updateQuantity(productId, "increase");
                });
            });
    
            document.querySelectorAll(".decrease").forEach(button => {
                button.addEventListener("click", (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    updateQuantity(productId, "decrease");
                });
            });
        };
    
        // Add to cart functionality for each product
        document.body.addEventListener("click", (e) => {
            if (e.target.classList.contains("add-to-cart")) {
                const productId = parseInt(e.target.dataset.id);
                addToCart(productId);
            }
        });
    
        updateSubtotal();
    });
    
}
