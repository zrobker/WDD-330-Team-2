import { getLocalStorage } from './utils.mjs';
let totalPrice = 0;

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems?.map((item) => cartItemTemplate(item));
  if (htmlItems === undefined) {
    document.querySelector('.empty-cart').innerHTML =
      '<p>Cart is currently empty.</p>' +
      '<a href=\'../index.html\'> Continue shopping here</a>';
  } else {
    document.querySelector('.product-list').innerHTML = htmlItems?.join('');
    let part1 = '<p class="cart-total">Total: $'
    let part2 = '</p>'
    let totalHTML = part1.concat(totalPrice, part2);
    document.querySelector('.cart-footer').innerHTML = totalHTML;
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
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;
  totalPrice += item.FinalPrice;
  return newItem;
}

renderCartContents();
