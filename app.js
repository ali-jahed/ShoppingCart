const showCart = document.querySelector(".fa-basket-shopping")
const cart = document.querySelector(".cart")
const backdrop = document.querySelector(".backdrop")
const closeCart = document.querySelector(".close-cart")

showCart.addEventListener('click',()=>{
    cart.style.opacity= '1';
    cart.style.transform='translateY(10vh)'
    backdrop.style.display='block';
})
closeCart.addEventListener('click', ()=>{
    cart.style.opacity= '0';
    cart.style.transform='translateY(-100vh)'
    backdrop.style.display='none';

})