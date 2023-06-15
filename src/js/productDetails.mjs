import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";


let product = {};

export default async function productDetails(productId) {
    // get the details for the current product. findProductById will return a promise! use await or .then() to process it
    product = await findProductById(productId);
    // once we have the product details we can render out the HTML
    renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    document.querySelector(".addToCart").addEventListener("click", addProductToCart);

     // once the HTML is rendered we can add a listener to Add to Wish List button
     document.getElementById("addToWishList").addEventListener("click", addProductToWishList);
}

export function addProductToCart() {
    let cart = getLocalStorage("so-cart");
    let newProduct = product;
    let newItem = true;
    if (!cart) {
      cart = [];
    }
    // Check through cart to see if new product already exists
    for (product of cart) {
      // The code below turns the string into an int so it does not concatinate
      let quantity = (product.qty * 1) +1;
      if (newProduct.Id == product.Id) {
        product.qty = quantity;
        newItem = false;
      } 
    }
    product = newProduct;
    if (newItem) {
      newProduct.qty = 1;
      cart.push(newProduct);
    }

    setLocalStorage("so-cart", cart);
    console.log(cart);
    document.querySelector(".cart").style.animation = "shake 0.5s";   //animates cart/backpack
    setTimeout(reset, 600);   //used to reset animation
}

export function addProductToWishList() {
  console.log("in wish list");
  let wish = getLocalStorage("so-wish");
  let newWish = product;
  let newItem = true;
  if (!wish) {
    wish = [];
  }

   // Check through wish list to see if new wish already exists
   for (product of wish) {
    // The code below turns the string into an int so it does not concatinate
    let quantity = (product.qty * 1) +1;
    if (newWish.Id == product.Id) {
      product.qty = quantity;
      newItem = false;
    } 
  }
  product = newWish;
    if (newItem) {
      newWish.qty = 1;
      wish.push(newWish);
    }

  setLocalStorage("so-wish", wish);
  console.log(wish);
  document.querySelector(".wishCart").style.animation = "shake 0.5s";   //animates cart/backpack
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
  document.querySelector(".wishCart").style.animation = "none";  
}  

export function renderProductDetails() {
  if (product === undefined) {
    let message = '<p>Unfortunately, that product cannot be found.</p>' +
    '<a href=\'../index.html\'> Return to home page</a>';
    document.querySelector("#addToCart").insertAdjacentHTML("beforebegin", message);
    document.querySelector("#addToCart").style.display = 'none';
  } else {
    document.querySelector("#breadcrumb").innerText = product.Category;
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
    document.querySelector(".addToCart").dataset.id = product.Id;
    document.querySelector("#addToWishList").dataset.id = product.Id;
  }
}