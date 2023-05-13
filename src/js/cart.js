import { getLocalStorage } from './utils.mjs';
import { removeProductFromCart } from './productDetails.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems?.map((item) => cartItemTemplate(item));
  if (htmlItems === undefined) {
    document.querySelector('.empty-cart').innerHTML =
      '<p>Cart is currently empty.</p>' +
      '<a href=\'../index.html\'> Continue shopping here</a>';
  } else {
    document.querySelector('.product-list').innerHTML = htmlItems?.join('');
  }

  //querySelectorAll() method returns a NodeList object which does not have a click() function. Use querySelectorAll() to select a group of elements and then loop through them to add a click event listener to each one.
  
  const nodeList = document.querySelectorAll('.remove');
  for (let i=0; i<nodeList.length; i++) {
    let item = nodeList[i];
    let idTest = item.getAttribute('data-id');
    console.log("adding a listener to each item");
    console.log(idTest);
    console.log(item);
    //Cannot directly pass argument to a function using addEventListener. Use an anonymous function that calls the destination function.
    nodeList[i].addEventListener('click', function() { removeProductFromCart(idTest);
      renderCartContents();
    });
    
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <div class='qty'>
    <img class='remove' data-id=${item.Id} src='/public/images/removeitemfromcart.png' alt='remove item'>
    <p class='cart-card__quantity'>qty: 1</p>
  </div>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}



renderCartContents();






