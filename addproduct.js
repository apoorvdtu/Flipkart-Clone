const addProductForm = document.querySelector('#addProductForm');
const products = fetchProductsFromLocalStorage();
function fetchProductsFromLocalStorage(){
    const products = JSON.parse(localStorage.getItem('products'));
    return products;
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
addProductForm.addEventListener('submit',function(event){
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
   if(isAddProductFormDetailsValid(addProductFormDetailsObj)===false){
        alert('Please Fill All The Details Correctly');
   }
   let maxId = 0;
   products.forEach((product)=>{
    maxId = Math.max(maxId,+product.id);
   })
   const product = new Product(String(maxId+1),productName,'/icons/phoneicon.png',productOriginalPrice,productDiscountPrice,productStockUnits,productCategory);
   products.push(product);
   saveProductsInLocalStorage();
})
function isAddProductFormDetailsValid({productName,productStockUnits,productDiscountPrice,productOriginalPrice}){
    return !productName||Number.isNaN(productStockUnits)||Number.isNaN(productDiscountPrice)||Number.isNaN(productOriginalPrice);
}
function saveProductsInLocalStorage(){
    localStorage.setItem('products',JSON.stringify(products));
}

