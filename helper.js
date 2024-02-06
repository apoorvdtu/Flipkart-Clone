function fetchProductsFromLocalStorage(){
    const productsJSON = localStorage.getItem('products')??'[]';
    const products = JSON.parse(productsJSON);
    return products;
}
function saveCartInStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
function fetchCartFromStorage(){
    const cartJSON = localStorage.getItem('cart')??'[]'
    const cart = JSON.parse(cartJSON);
    cartItemCount.textContent = cart.length;
    return cart;
}

export {fetchProductsFromLocalStorage,saveCartInStorage,fetchCartFromStorage}