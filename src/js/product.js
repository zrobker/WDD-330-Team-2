import { getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { addProductToCart, productDetails } from "./productDetails.mjs";



// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const productId = getParam('product');

productDetails(productId);
