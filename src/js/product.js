import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';

import { loadHeaderFooter } from './utils.mjs';

console.log('in productjs');
loadHeaderFooter();


const productId = getParam('product');


productDetails(productId);
 