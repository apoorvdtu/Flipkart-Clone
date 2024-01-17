const template = document.querySelector('template').content;
const cartItems = document.querySelector('.cart-shopping-items');
const cartTotalPrice = document.querySelector('.cart-shopping-price-details-total-price-value');
const cartTotalDiscount = document.querySelector('.cart-shopping-price-details-total-price-value.discount');
const cartFinalPrice = document.querySelector('.cart-shopping-price-details-final-price-value');
const cartTotalDiscountInPercantage = document.querySelector('.cart-shopping-price-details-savings-value');
const placeOrderButton = document.querySelector('.place-order-button');

const PRODUCT_QUANTITY_LESS_MESSAGE  = 'Product Quantity cannot be less than 1';
const PRODUCT_QUANTITY_MORE_MESSAGE  = 'Product Quantity cannot be more than 10';
const products = fetchProductsFromStorage();
const cart = fetchCartFromStorage();
priceComponentsSetup();
function decreaseProductCount(event){
    const parentElement = event.target.parentElement;
    const cartItemId =  event.target.parentElement.parentElement.parentElement.id;
    const cartItemQty = parentElement.querySelector('.cart-shopping-items-product-info-product-count-qty-1');
    if(Number(cartItemQty.textContent)>1){ 
        updateCart(cartItemId,Number(cartItemQty.textContent)-1);
        cartItemQty.textContent = Number(cartItemQty.textContent)-1;
    }
    else 
        alert(PRODUCT_QUANTITY_LESS_MESSAGE);
}

function increaseProductCount(event){
    const parentElement = event.target.parentElement;
    const cartItemQty = parentElement.querySelector('.cart-shopping-items-product-info-product-count-qty-1');
    const cartItemId =  event.target.parentElement.parentElement.parentElement.id;
    if(Number(cartItemQty.textContent)<10){
        updateCart(cartItemId,Number(cartItemQty.textContent)+1);
        cartItemQty.textContent = Number(cartItemQty.textContent)+1;
    }
    else 
        alert(PRODUCT_QUANTITY_MORE_MESSAGE);
}

function removeProduct(event){
    const cartItemId =  event.target.parentElement.parentElement.id;
    updateCart(cartItemId,0);
    event.target.parentElement.parentElement.remove();
}

function updateCart(cartItemId,qty){
    const cartItemIndex = cart.findIndex((cartItem)=>cartItem.id === cartItemId);
    if(qty===0){
        if(cartItemIndex!==-1){
            cart.splice(cartItemIndex,1);
        }
    }   
    else{
        const cartItem = cart[cartItemIndex];
        cartItem.qty = qty;
    }
    saveCartInStorage();
    priceComponentsSetup();

}

function addToCart(productId,productQty, productName,productImgSrc,productOriginalPrice,productDiscountPrice){

    const cartItemTemplate = template.querySelector('div.cart-shopping-items-product');
    const cartItem = cartItemTemplate.cloneNode(true);
    const cartItemImg = cartItem.querySelector('.cart-shopping-items-product-img');
    const cartItemName = cartItem.querySelector('.cart-shopping-items-product-info-name');
    const cartItemDecreaseButton = cartItem.querySelector('.cart-shopping-items-product-info-product-count-dec');
    const cartItemIncreaseButton = cartItem.querySelector('.cart-shopping-items-product-info-product-count-inc');
    const cartItemOriginalPrice = cartItem.querySelector('.cart-shopping-items-product-price-old');
    const cartItemDiscountedPrice = cartItem.querySelector('.cart-shopping-items-product-price-current');
    const cartItemDeleteButton = cartItem.querySelector('.cart-shopping-items-product-info-remove');
    const cartItemQty = cartItem.querySelector('.cart-shopping-items-product-info-product-count-qty-1');

    cartItem.id = productId;
    cartItemImg.src = productImgSrc;
    cartItemName.textContent = productName;
    cartItemDiscountedPrice.textContent = 'Rs'+productDiscountPrice;
    cartItemOriginalPrice.innerHTML = `MRP: <del>${productOriginalPrice}</del>`;
    cartItemDecreaseButton.addEventListener('click',decreaseProductCount);
    cartItemIncreaseButton.addEventListener('click',increaseProductCount);
    cartItemDeleteButton.addEventListener('click',removeProduct);
    cartItemQty.textContent = Number(productQty);

    cartItems.append(cartItem);
    const hr = document.createElement('hr');
    cartItems.append(hr);
}

function fetchProductsFromStorage(){
    const productsJSON = localStorage.getItem('products')??'[]';
    const products = JSON.parse(productsJSON);
    return products;
}

function fetchCartFromStorage(){
    const cartJSON = localStorage.getItem('cart')??'[]';
    const cart = JSON.parse(cartJSON);
    cart.forEach((cartItem)=>{
        const product = products.find((productItem)=>productItem.id===cartItem.id);
        if(product){
            addToCart(cartItem.id,cartItem.qty,product.name,product.imgSrc,product.originalPrice,product.discountPrice);
        }
    });
   
    return cart;
}

function saveCartInStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

function updatePriceComponent(){

}

function priceComponentsSetup(){
    let totalPrice = 0;
    let totalDiscount = 0;
    let finalPrice = 0;
    let totalDiscountInPercantage = 0;
    cart.forEach((cartItem)=>{
        const product = products.find((productItem)=>productItem.id===cartItem.id);
        if(product){
            totalPrice =totalPrice+product.originalPrice * cartItem.qty;
            totalDiscount = totalDiscount + ( product.originalPrice - product.discountPrice)*cartItem.qty;
            finalPrice = finalPrice+product.discountPrice* cartItem.qty;
        }
    });
    cartTotalPrice.textContent = 'Rs'+totalPrice;
    cartTotalDiscount.textContent = 'Rs'+totalDiscount;
    cartFinalPrice.textContent = 'Rs'+finalPrice;
    if(totalPrice)
    totalDiscountInPercantage = Math.trunc((totalDiscount/totalPrice)*100);
    cartTotalDiscountInPercantage.textContent = totalDiscountInPercantage+'%';
}
function placeOrderButtonHandler(event){
    if(cart.length===0){
        alert("Cart is Empty");
        return;
    }
    const userJSON = localStorage.getItem('user');
    let user = {"email":"sample@gmail.com","password":"123456"};
    if(userJSON){
         user = JSON.parse(userJSON);
    }
    
    if(!user.orders)user.orders=[];
    const items = structuredClone(cart);
    const order = {
        date:Date(),
        items:items,
        totalPrice:cartTotalPrice.textContent,
        finalPrice:cartFinalPrice.textContent,
        totalDiscountPrice:cartTotalDiscount.textContent,
    }

    user.orders.push(order);
    cart.splice(0,cart.length);

    saveCartInStorage();
    localStorage.setItem('user',JSON.stringify(user));
    alert("Order Placed");
    window.location.reload();
}
placeOrderButton.addEventListener('click',placeOrderButtonHandler);