function fetchProductsFromLocalStorage(){
    const productsJSON = localStorage.getItem('products')??'[]';
    const products = JSON.parse(productsJSON);
    return products;
}
function saveCartInLocalStorage(cart=[]){
    localStorage.setItem('cart',JSON.stringify(cart));
}
function fetchCartFromLocalStorage(){
    const cartJSON = localStorage.getItem('cart')??'[]'
    const cart = JSON.parse(cartJSON);
    return cart;
}

function Product({ id, name, imgSrc, originalPrice, discountPrice, stock, category }) {
    this.id = id;
    this.name = name;
    this.imgSrc = imgSrc;
    this.originalPrice = originalPrice;
    this.discountPrice = discountPrice;
    this.stock = stock;
    this.category = category;
}
function saveProductsInStorage() {
    const product1 = new Product('1', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const product2 = new Product('2', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const product3 = new Product('3', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const product4 = new Product('4', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const product5 = new Product('5', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const product6 = new Product('6', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const product7 = new Product('7', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const product8 = new Product('8', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const product9 = new Product('9', 'Redmi Note 11', '/icons/phoneicon.png', 9999, 7999, 10, 'Mobiles');
    const mobileProducts = [product1, product2, product3, product4, product5, product6, product7, product8, product9];
    localStorage.setItem('products', JSON.stringify(mobileProducts));
}  

export {fetchProductsFromLocalStorage,saveCartInLocalStorage,fetchCartFromLocalStorage,Product}