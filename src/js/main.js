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


document.querySelector('#searchBtn').addEventListener('click', searchProducts);

setTimeout(search, 600);   //used to wait for the header to load

function search() {
  document.querySelector('#searchBtn2').addEventListener('click', searchProducts);
}

let navSearchBtn = document.querySelector('#searchBtn2');



//look for any messages in json and alert on index.html
const newMessage = new alert();
newMessage.displayMessages();
