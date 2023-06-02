import { loadHeaderFooter, addToMailingList } from './utils.mjs';
import { searchProducts } from './externalServices.mjs';
import alert from './alert.mjs';

loadHeaderFooter();

document
  .getElementById('newsletter')
  .addEventListener('click', addToMailingList);

document
  .getElementById('newsletter')
  .addEventListener('click', addToMailingList);

//let input = document.querySelector('#inputBox').value;
document.querySelector('#searchBtn').addEventListener('click', searchProducts);

//look for any messages in json and alert on index.html
const newMessage = new alert();
newMessage.displayMessages();
