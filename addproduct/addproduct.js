import { fetchProductsFromLocalStorage,Product } from "../utilities/helper.js";
const addProductForm = document.querySelector('#addProductForm');
const products = fetchProductsFromLocalStorage();

function saveProductsInLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

function isAddProductFormDetailsInvalid({ productName, productStockUnits, productDiscountPrice, productOriginalPrice }) {
  return !productName || Number.isNaN(productStockUnits) || Number.isNaN(productDiscountPrice) || Number.isNaN(productOriginalPrice);
}

addProductForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const productName = addProductForm.elements.productName.value?.trim();
  const productCategory = addProductForm.elements.productCategory[addProductForm.elements.productCategory.selectedIndex].value;
  const productOriginalPrice = +addProductForm.elements.productOriginalPrice.value;
  const productDiscountPrice = +addProductForm.elements.productDiscountPrice.value;
  const productStockUnits = +addProductForm.elements.productStockUnits.value;
  const addProductFormDetailsObj = {
    productOriginalPrice,
    productDiscountPrice,
    productName,
    productStockUnits
  }
  if (isAddProductFormDetailsInvalid(addProductFormDetailsObj) === true) {
    alert('Please Fill All The Details Correctly');
    return;
  }
  let maxId = 0;
  products.forEach((product) => {
    maxId = Math.max(maxId, +product.id);
  })
  const productDetailsObj = { id: String(maxId + 1), name: productName, imgSrc: '/icons/phoneicon.png', originalPrice: productOriginalPrice, discountPrice: productDiscountPrice, stock: productStockUnits, category: productCategory };
  const product = new Product(productDetailsObj);
  products.push(product);
  saveProductsInLocalStorage();
  alert('Product Added Succesfully');
  addProductForm.reset();
})



