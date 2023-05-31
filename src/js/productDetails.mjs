import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import  productList  from "./productList.mjs";

let product = {};

export default async function productDetails(productId) {
    // get the details for the current product. findProductById will return a promise! use await or .then() to process it
    product = await findProductById(productId);
    console.log('in product details');
    console.log(product);
    // once we have the product details we can render out the HTML
    renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", addProductToCart);
}

export function addProductToCart() {
    let cart = getLocalStorage("so-cart");
    if (!cart) {
      cart = [];
    }
    product.qty = 1
    cart.push(product);
    setLocalStorage("so-cart", cart);

    document.querySelector(".cart").style.animation = "shake 0.5s";   //animates cart/backpack
    setTimeout(reset, 600);   //used to reset animation
  }

export function removeProductFromCart(item) {
  let cart = getLocalStorage("so-cart");
  
  const searchIndex = cart.findIndex((product)=> product.Id==item);
  
  cart.splice(searchIndex, 1);
  setLocalStorage("so-cart", cart);
}

function reset() {
  document.querySelector(".cart").style.animation = "none";   
}  

export function renderProductDetails() {
  if (product === undefined) {
    let message = '<p>Unfortunately, that product cannot be found.</p>' +
    '<a href=\'../index.html\'> Return to home page</a>';
    document.querySelector("#addToCart").insertAdjacentHTML("beforebegin", message);
    document.querySelector("#addToCart").style.display = 'none';
  } else {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
      product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    if (product.SuggestedRetailPrice > product.FinalPrice) {
    document.querySelector("#productSuggestedRetailPrice").innerText = "$" + product.SuggestedRetailPrice.toFixed(2);
    }
    document.querySelector("#productFinalPrice").innerText = "$" + product.FinalPrice.toFixed(2);
    document.querySelector("#productColorName").innerText =
      product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
      product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
  }
}