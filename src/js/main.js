import { loadHeaderFooter, addToMailingList } from './utils.mjs';

import { searchProducts} from './productData.mjs';



//productList('.product-list', category);
loadHeaderFooter();

document.getElementById('newsletter').addEventListener('click', addToMailingList);

let input = document.querySelector('#inputBox').value;
document.querySelector('#searchBtn').addEventListener('click', searchProducts);


