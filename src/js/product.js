import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';

import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

console.log("in product.js");
const productId = getParam('product');

productDetails(productId);
