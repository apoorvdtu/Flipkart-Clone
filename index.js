const bestMobileProductsContainer = document.querySelector('.best-mobile-product-container');
const bestTvProductsContainer = document.querySelector('.best-tvs-product-container');
const cartItemCount = document.querySelector('.cart-item-count');
const cart = fetchCartFromStorage();
const loginContainer = document.querySelector('.login-btn');

const products = fetchProductsFromLocalStorage();
function fetchUserAndUpdateLoginComponent(){
    const userJSON = localStorage.getItem('user')??'{}';
    const user = JSON.parse(userJSON);
    if(!user.email||!user.password){
        return;
    }
    loginContainer.textContent = user.email;
    const loginPropertiesContainer = document.querySelector('.login-properties');
    loginPropertiesContainer.remove();
}
// const user = {
//     email:'sample@gmail.com',
//     password:'123456'
// }
// localStorage.setItem('user',JSON.stringify(user));
fetchUserAndUpdateLoginComponent();
const addToCartButtonHandler =(event)=>{
    const productElement = event.target.parentElement;
    const productId = productElement.id;
    const arr = [];
    const cartItem = cart.find((cartItem)=>cartItem.id===productId);
    if(cartItem){
        if(cartItem.qty>=10){
            alert('Produt Quantity cannot be More than 10');
            return;
        }
        cartItem.qty++;
    }
    else{
        cart.push({
            id:productId,
            qty:1,
        })  
    }
    cartItemCount.textContent = cart.length;
    saveCartInStorage();
    console.dir(productElement);
}
function Product(id,name,imgSrc,originalPrice,discountPrice,stock,category){
    this.id = id;
    this.name = name;
    this.imgSrc = imgSrc;
    this.originalPrice = originalPrice;
    this.discountPrice = discountPrice;
    this.stock = stock;
    this.category = category;
}
function saveProductsInStorage(){
    const product1 = new Product('1','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const product2 = new Product('2','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const product3 = new Product('3','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const product4 = new Product('4','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const product5 = new Product('5','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const product6 = new Product('6','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const product7 = new Product('7','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const product8 = new Product('8','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const product9 = new Product('9','Redmi Note 11','/icons/phoneicon.png',9999,7999,10,'Mobiles');
    const mobileProducts = [product1,product2,product3,product4,product5,product6,product7,product8,product9];
    localStorage.setItem('products',JSON.stringify(mobileProducts));
}
function createProductElement(product){
    const template = document.querySelector('#best-mobile-product').content.cloneNode(true);
    const mobileProduct = template.querySelector('.best-mobile-product');
    const mobileProductName = template.querySelector('.best-mobile-product-name');
    const mobileProductImg = template.querySelector('.best-mobile-product-image');
    const mobileProductOriginalPrice = template.querySelector('.best-mobile-product-orginal-price');
    const mobileProductDiscountPrice = template.querySelector('.best-mobile-product-discount-price');
    const addToCartButton = template.querySelector('.add-to-cart');    
    // const mobileProductName = template.querySelector('.best-mobile-product-name');
    mobileProduct.setAttribute('id',product.id);
    mobileProductName.textContent = product.name;
    mobileProductImg.src = product.imgSrc;
    mobileProductOriginalPrice.textContent = product.originalPrice;
    mobileProductDiscountPrice.textContent = product.discountPrice;
    addToCartButton.addEventListener('click',addToCartButtonHandler);
    // console.log(mobileProduct);
    // console.log("---");
    bestMobileProductsContainer.append(mobileProduct);
}
function fetchProductsFromLocalStorage(){
    const products = JSON.parse(localStorage.getItem('products'));
    return products;
}
function fetchCartFromStorage(){
    const cartJSON = localStorage.getItem('cart')??'[]'
    const cart = JSON.parse(cartJSON);
    cartItemCount.textContent = cart.length;
    return cart;
}
function saveCartInStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
products.forEach((product)=>{
    console.log(product);
    if(product.category==='Mobiles')
        createProductElement(product);
    else 
        createTvProductElement(product);
});
function createTvProductElement(product){
    const template = document.querySelector('#best-tvs-product').content.cloneNode(true);
    const tvProduct = template.querySelector('.best-tvs-product');
    const tvProductName = template.querySelector('.best-tvs-product-name');
    const tvProductImg = template.querySelector('.best-tvs-product-image');
    const tvProductOriginalPrice = template.querySelector('.best-tvs-product-orginal-price');
    const tvProductDiscountPrice = template.querySelector('.best-tvs-product-discount-price');
    const addToCartButton = template.querySelector('.add-to-cart');    
    // const mobileProductName = template.querySelector('.best-mobile-product-name');
    tvProduct.setAttribute('id',product.id);
    tvProductName.textContent = product.name;
    tvProductImg.src = product.imgSrc;
    tvProductOriginalPrice.textContent = product.originalPrice;
    tvProductDiscountPrice.textContent = product.discountPrice;
    addToCartButton.addEventListener('click',addToCartButtonHandler);
    // console.log(mobileProduct);
    // console.log("---");
    bestTvProductsContainer.append(tvProduct);
}
