import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
    console.log("in productDetails");
    // get the details for the current product. findProductById will return a promise! use await or .then() to process it
    product = await findProductById(productId);
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
    cart.push(product);
    setLocalStorage("so-cart", cart);

    document.querySelector(".cart").style.animation = "shake 0.5s";   //animates cart/backpack
    setTimeout(reset, 600);   //used to reset animation
  }

function reset() {
  document.querySelector(".cart").style.animation = "none";   
}
  

function renderProductDetails() {
    console.log("in render");
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
      product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText =
      product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
      product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}