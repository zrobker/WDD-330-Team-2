import { getLocalStorage, loadHeaderFooter, setLocalStorage} from './utils.mjs';
import  { findProductById} from './externalServices.mjs';

let product = {};
let wishId = "";

loadHeaderFooter();

async function renderWishlistContents() {
    
    const cartItems = getLocalStorage('so-wish');
    const htmlItems = cartItems?.map((item) => wishlistItemTemplate(item));
    
    if (!htmlItems || htmlItems.length === 0) {
      document.querySelector('.product-list').innerHTML = '';
      document.querySelector('.cart-footer').innerHTML = '';
      document.querySelector('.empty-cart').innerHTML =
        '<p>Wishlist is currently empty.</p>' +
        '<a href=\'../index.html\'> Continue shopping here</a>';
    } else {
      
      document.querySelector('.product-list').innerHTML = htmlItems?.join('');

    // once the HTML is rendered we can add a listener to Add to Cart button
    const items = document.querySelectorAll(".addToCart2");
    items.forEach((wishItem) => {
      wishItem.addEventListener('click', function() {
    
        addToCart(htmlItems);
      });
    });

      
    }
    

}

function wishlistItemTemplate(item) {
    product = item.Id;
    wishId = item.Id;
    const newItem = `<li class='cart-card divider'>
    <img
      src='${item.Images.PrimarySmall}'
        alt='${item.Name}'
    />
    
    <h2 class='card__name'>${item.Name}</h2>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    
    <p class='cart-card__price'>$${item.FinalPrice}</p>
    
    <button class="addToCart2">Add to Cart ${item.Id}</button>
    <p class='cart-card_id'>${item.Id}</p>
    </li>`;
   
    
    return newItem;
}

async function addToCart (itemId) {
console.log("the item:" + itemId);
  let cart = getLocalStorage("so-cart");
  
  let wish = getLocalStorage("so-wish");
  
  let newProduct = wish[0];
  console.log(newProduct);
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
      console.log("in not new product, product qty");
      console.log(product.qty);
    } 
    if (newItem) {
      newProduct.qty = 1;
      cart.push(newProduct);
    };
    console.log(cart);
  }
  setLocalStorage("so-cart", cart);
  // remove item from wishlist
  console.log(wish);
  wish.splice(0, 1);
  console.log("the new wish list is:");
  console.log(wish);
  setLocalStorage("so-wish", wish);
}
renderWishlistContents();