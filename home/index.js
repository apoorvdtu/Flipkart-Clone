import { fetchCartFromLocalStorage,fetchProductsFromLocalStorage,saveCartInLocalStorage } from "../utilities/helper.js";
const bestMobileProductsContainer = document.querySelector('.best-mobile-product-container');
const bestTvProductsContainer = document.querySelector('.best-tvs-product-container');
const cartItemCount = document.querySelector('.cart-item-count');
const loginContainer = document.querySelector('.login-btn');

const cart = fetchCartFromLocalStorage();
updateCartComponent();

const products = fetchProductsFromLocalStorage();
function fetchUserAndUpdateLoginComponent() {
  const userJSON = localStorage.getItem('user') ?? '{}';
  const user = JSON.parse(userJSON);
  if (!user.email || !user.password) {
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
const addToCartButtonHandler = (event) => {
  const productElement = event.target.parentElement;
  const productId = productElement.id;
  const cartItem = cart.find((cartItem) => cartItem.id === productId);
  if (cartItem) {
    if (cartItem.qty >= 10) {
      alert('Produt Quantity cannot be More than 10');
      return;
    }
    cartItem.qty++;
  }
  else {
    cart.push({
      id: productId,
      qty: 1,
    })
  }
  updateCartComponent();
  saveCartInLocalStorage(cart);
}
function createProductElement(product) {
  const template = document.querySelector('#best-mobile-product').content.cloneNode(true);
  const mobileProduct = template.querySelector('.best-mobile-product');
  const mobileProductName = template.querySelector('.best-mobile-product-name');
  const mobileProductImg = template.querySelector('.best-mobile-product-image');
  const mobileProductOriginalPrice = template.querySelector('.best-mobile-product-orginal-price');
  const mobileProductDiscountPrice = template.querySelector('.best-mobile-product-discount-price');
  const addToCartButton = template.querySelector('.add-to-cart');
  mobileProduct.setAttribute('id', product.id);
  mobileProductName.textContent = product.name;
  mobileProductImg.src = product.imgSrc;
  mobileProductOriginalPrice.textContent = product.originalPrice;
  mobileProductDiscountPrice.textContent = product.discountPrice;
  addToCartButton.addEventListener('click', addToCartButtonHandler);
  bestMobileProductsContainer.append(mobileProduct);
}
function updateCartComponent(){
  cartItemCount.textContent = cart.length;
}
products.forEach((product) => {
  if (product.category === 'Mobiles')
    createProductElement(product);
  else
    createTvProductElement(product);
});
function createTvProductElement(product) {
  const template = document.querySelector('#best-tvs-product').content.cloneNode(true);
  const tvProduct = template.querySelector('.best-tvs-product');
  const tvProductName = template.querySelector('.best-tvs-product-name');
  const tvProductImg = template.querySelector('.best-tvs-product-image');
  const tvProductOriginalPrice = template.querySelector('.best-tvs-product-orginal-price');
  const tvProductDiscountPrice = template.querySelector('.best-tvs-product-discount-price');
  const addToCartButton = template.querySelector('.add-to-cart');
  // const mobileProductName = template.querySelector('.best-mobile-product-name');
  tvProduct.setAttribute('id', product.id);
  tvProductName.textContent = product.name;
  tvProductImg.src = product.imgSrc;
  tvProductOriginalPrice.textContent = product.originalPrice;
  tvProductDiscountPrice.textContent = product.discountPrice;
  addToCartButton.addEventListener('click', addToCartButtonHandler);
  // console.log(mobileProduct);
  // console.log("---");
  bestTvProductsContainer.append(tvProduct);
}
