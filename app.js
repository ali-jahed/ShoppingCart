const showCart = document.querySelector(".fa-basket-shopping")
const cart = document.querySelector(".cart")
const backdrop = document.querySelector(".backdrop")
const closeCart = document.querySelector(".close-cart")
const items = document.querySelector(".items")

import {productsData} from "./products.js"

showCart.addEventListener('click', () => {
    cart.style.opacity = '1';
    cart.style.transform = 'translateY(10vh)'
    backdrop.style.display = 'block';
})
closeCart.addEventListener('click', () => {
    cart.style.opacity = '0';
    cart.style.transform = 'translateY(-100vh)'
    backdrop.style.display = 'none';

})

class Products {
    getProducts() {
        return productsData;
    }
}

class UI {
displayProducts(products){
    let result = '';
    products.forEach((item)=>{
        result+=
        `
                <div class="item">
                <img src=${item.imageUrl} alt="">
                <div class="details">
                    <p class="price">${item.price} $</p>
                    <p class="name">${item.title}</p>
                </div>
                <button class="btn" data-id=${item.id}>Add to cart</button>
            </div>
        `
        items.innerHTML = result;
    })

}
}

class Storage {
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products));
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const products = new Products();
    const productsData = products.getProducts();
    const ui = new UI();
    ui.displayProducts(productsData);
    Storage.saveProducts(productsData);
});