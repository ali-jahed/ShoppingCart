const showCart = document.querySelector(".fa-basket-shopping")
const cart = document.querySelector(".cart")
const backdrop = document.querySelector(".backdrop")
const closeCart = document.querySelector(".close-cart")
const items = document.querySelector(".items")
const cartContent = document.querySelector('.cartContent')
const cartTotal = document.querySelector('.total-price')
const cartItem = document.querySelector('.cart-quantity')
const clearCart = document.querySelector(".clear-cart");
let carts = [];


import { productsData } from "./products.js"

showCart.addEventListener('click', () => {
    cart.style.opacity = '1';
    cart.style.transform = 'translateY(10vh)'
    backdrop.style.display = 'block';
})
function closeCartHandler() {
    cart.style.opacity = '0';
    cart.style.transform = 'translateY(-100vh)';
    backdrop.style.display = 'none';
}

closeCart.addEventListener('click', closeCartHandler);


class Products {
    getProducts() {
        return productsData;
    }
}
let btnsDom = [];
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach((item) => {
            result += `
                <div class="item">
                    <img src=${item.imageUrl} alt="">
                    <div class="details">
                        <p class="price">${item.price} $</p>
                        <p class="name">${item.title}</p>
                    </div>
                    <button class="btn add-to-cart" data-id=${item.id}>Add to cart</button>
                </div>`;
        });
        items.innerHTML = result;
    }

    getAddToCartBtns() {
        const addToCartBtns = document.querySelectorAll(".add-to-cart")
        const buttons = [...addToCartBtns]
        btnsDom = [...addToCartBtns];;
        buttons.forEach((btn) => {
            const id = btn.dataset.id;
            const isInCart = carts.find((p) => parseInt(p.id) === parseInt(id));

            if (isInCart) {
                btn.innerText = "In cart"
                btn.disabled = true;

            }
            btn.addEventListener('click', (event) => {
                event.target.innerText = 'In cart'
                event.target.disabled = true;
                let addProduct = { ...Storage.getProduct(id), quantity: 1 };
                carts = [...carts, addProduct];
                Storage.saveCart(carts);
                this.setCartValue(carts);
                this.addCartItem(addProduct);
            })
        })
    }
    setCartValue(cart) {
        let tempCartItem = 0;
        let totalPrice = cart.reduce((acc, curr) => {
            tempCartItem += curr.quantity;
            return acc + curr.quantity * curr.price;
        }, 0);
        cartTotal.innerText = totalPrice
        cartItem.innerText = tempCartItem
    }
    addCartItem(cartItem) {
        const div = document.createElement('div');
        div.classList.add('cart-item')
        div.innerHTML = `
                    <img src=${cartItem.imageUrl} alt="">
                    <div class="cart-item-details">
                        <p class="price">${cartItem.price} $</p>
                        <p class="name">${cartItem.title} </p>
                    </div>
                    <div class="cart-item-controler">
                        <div class="quantity">
                            <i class="fa-solid fa-chevron-up" data-id=${cartItem.id} ></i>
                            <span>${cartItem.quantity} </span>
                            <i class="fa-solid fa-chevron-down" data-id=${cartItem.id} ></i>
                        </div>
                        <div class="remove">
                            <i class="fa-regular fa-trash-can" data-id=${cartItem.id} ></i>
                        </div>
                    </div>`
        cartContent.appendChild(div);
    }
    setUpApp() {
        carts = Storage.getCart() || [];
        carts.forEach((cartItem) => this.addCartItem(cartItem));
        this.setCartValue(carts)
    }
    cartLogic() {
        clearCart.addEventListener('click', () => this.clearCart());
    }
    clearCart() {
        carts.forEach((cItem) => this.removeItem(cItem.id));

        while (cartContent.children.length) {
            cartContent.removeChild(cartContent.children[0]);
        }

        carts = [];
        Storage.saveCart(carts);
        this.setCartValue(carts);
        closeCartHandler();
    }
    removeItem(id) {
        carts = carts.filter((cItem) => parseInt(cItem.id) !== parseInt(id));
        this.setCartValue(carts);
        Storage.saveCart(carts);
        const btn = btnsDom.find((btn) => parseInt(btn.dataset.id) === parseInt(id));
        if (btn) {
            btn.innerText = 'Add to cart';
            btn.disabled = false;
        }
    }
}

class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProduct(id) {
        const _products = JSON.parse(localStorage.getItem('products'));
        return _products.find((p) => parseInt(p.id) === parseInt(id))
    }
    static saveCart(carts) {
        localStorage.setItem('carts', JSON.stringify(carts))
    }
    static getCart() {
        return JSON.parse(localStorage.getItem('carts'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const products = new Products();
    const productsData = products.getProducts();
    const ui = new UI();
    ui.setUpApp();
    ui.displayProducts(productsData);
    ui.getAddToCartBtns();
    ui.cartLogic();
    Storage.saveProducts(productsData);
});