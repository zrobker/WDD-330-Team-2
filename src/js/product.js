import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';

console.log("in product.js");
const productId = getParam('product');

productDetails(productId);
