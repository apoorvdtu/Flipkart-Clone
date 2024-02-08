import { CART_EMPTY_MESSAGE, PRODUCT_QUANTITY_LESS_MESSAGE, PRODUCT_QUANTITY_MORE_MESSAGE } from "../constants/constant.js";
import { fetchProductsFromLocalStorage, saveCartInLocalStorage, fetchCartFromLocalStorage } from "../utilities/helper.js";

const template = document.querySelector('template').content;
const cartItems = document.querySelector('.cart-items');
const cartTotalPrice = document.querySelector('.prices__value--total');
const cartTotalDiscount = document.querySelector('.prices__value--discount');
const cartFinalPrice = document.querySelector('.prices__value--final');
const cartTotalDiscountInPercantage = document.querySelector('.prices__value--saving');
const placeOrderButton = document.querySelector('.cart-prices__place-order');

function decreaseProductCount(event) {
    const parentElement = event.target.parentElement;
    const cartItemId = event.target.parentElement.parentElement.parentElement.id;
    const cartItemQty = parentElement.querySelector('.cart-item__product-qty');
    const cartItemQtyValue = Number(cartItemQty.textContent);
    if (cartItemQtyValue > 1) {
        updateCart(cartItemId, cartItemQtyValue - 1);
        cartItemQty.textContent = cartItemQtyValue - 1;
    }
    else
        alert(PRODUCT_QUANTITY_LESS_MESSAGE);
}

function increaseProductCount(event) {
    const parentElement = event.target.parentElement;
    const cartItemQty = parentElement.querySelector('.cart-item__product-qty');
    const cartItemId = event.target.parentElement.parentElement.parentElement.id;
    const cartItemQtyValue = Number(cartItemQty.textContent);
    if (cartItemQtyValue < 10) {
        updateCart(cartItemId, cartItemQtyValue + 1);
        cartItemQty.textContent = cartItemQtyValue + 1;
    }
    else
        alert(PRODUCT_QUANTITY_MORE_MESSAGE);
}

function removeProduct(event) {
    const cartItemId = event.target.parentElement.parentElement.id;
    updateCart(cartItemId, 0);
    event.target.parentElement.parentElement.remove();
}

function updateCart(cartItemId, qty) {
    const cartItemIndex = cart.findIndex((cartItem) => cartItem.id === cartItemId);
    if (qty === 0) {
        if (cartItemIndex !== -1) {
            cart.splice(cartItemIndex, 1);
        }
    }
    else {
        const cartItem = cart[cartItemIndex];
        cartItem.qty = qty;
    }
    saveCartInLocalStorage(cart);
    priceComponentsSetup();
    
}

function addToCart({ productId, productQty, productName, productImgSrc, productOriginalPrice, productDiscountPrice }) {

    const cartItemTemplate = template.querySelector('.cart-item');
    const cartItem = cartItemTemplate.cloneNode(true);
    const cartItemImg = cartItem.querySelector('.cart-item__product-img');
    const cartItemName = cartItem.querySelector('.cart-item__product-name');
    const cartItemDecreaseButton = cartItem.querySelector('.cart-item__product-button--dec');
    const cartItemIncreaseButton = cartItem.querySelector('.cart-item__product-button--inc');
    const cartItemOriginalPrice = cartItem.querySelector('.product-price__product-mrp-price');
    const cartItemDiscountedPrice = cartItem.querySelector('.product-price__current-price');
    const cartItemDeleteButton = cartItem.querySelector('.cart-item__product-remove');
    const cartItemQty = cartItem.querySelector('.cart-item__product-qty');

    cartItem.id = productId;
    cartItemImg.src = productImgSrc;
    cartItemName.textContent = productName;
    cartItemDiscountedPrice.textContent = 'Rs' + productDiscountPrice;
    cartItemOriginalPrice.innerHTML = `MRP: <del>${productOriginalPrice}</del>`;
    cartItemDecreaseButton.addEventListener('click', decreaseProductCount);
    cartItemIncreaseButton.addEventListener('click', increaseProductCount);
    cartItemDeleteButton.addEventListener('click', removeProduct);
    cartItemQty.textContent = Number(productQty);

    cartItems.append(cartItem);
    const hr = document.createElement('hr');
    cartItems.append(hr);
}

function setupCartElements() {
    cart.forEach((cartItem) => {
        const product = products.find((productItem) => productItem.id === cartItem.id);
        if (product) {
            const productDetailsObj = { productId: cartItem.id, productQty: cartItem.qty, productName: product.name, productImgSrc: product.imgSrc, productOriginalPrice: product.originalPrice, productDiscountPrice: product.discountPrice }
            addToCart(productDetailsObj);
        }
    });
}

function priceComponentsSetup() {
    let totalPrice = 0;
    let totalDiscount = 0;
    let finalPrice = 0;
    let totalDiscountInPercantage = 0;
    cart.forEach((cartItem) => {
        const product = products.find((productItem) => productItem.id === cartItem.id);
        if (product) {
            totalPrice = totalPrice + product.originalPrice * cartItem.qty;
            totalDiscount = totalDiscount + (product.originalPrice - product.discountPrice) * cartItem.qty;
            finalPrice = finalPrice + product.discountPrice * cartItem.qty;
        }
    });
    cartTotalPrice.textContent = 'Rs' + totalPrice;
    cartTotalDiscount.textContent = 'Rs' + totalDiscount;
    cartFinalPrice.textContent = 'Rs' + finalPrice;
    if (totalPrice)
        totalDiscountInPercantage = Math.trunc((totalDiscount / totalPrice) * 100);
    cartTotalDiscountInPercantage.textContent = totalDiscountInPercantage + '%';
}

function placeOrderButtonHandler(event) {
    if (cart.length === 0) {
        alert(CART_EMPTY_MESSAGE);
        return;
    }
    const userJSON = localStorage.getItem('user');
    let user = { "email": "sample@gmail.com", "password": "123456" };
    if (userJSON) {
        user = JSON.parse(userJSON);
    }

    if (!user.orders) user.orders = [];
    const items = structuredClone(cart);
    const order = {
        date: Date(),
        items: items,
        totalPrice: cartTotalPrice.textContent,
        finalPrice: cartFinalPrice.textContent,
        totalDiscountPrice: cartTotalDiscount.textContent,
    }

    user.orders.push(order);
    cart.splice(0, cart.length);

    saveCartInLocalStorage(cart);
    localStorage.setItem('user', JSON.stringify(user));
    alert("Order Placed");
    window.location.reload();
}

const products = fetchProductsFromLocalStorage();
const cart = fetchCartFromLocalStorage();

setupCartElements();
priceComponentsSetup();

placeOrderButton.addEventListener('click', placeOrderButtonHandler);