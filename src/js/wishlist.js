import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

let product = {};

loadHeaderFooter();

async function renderWishlistContents() {
  const cartItems = getLocalStorage("so-wish");
  const htmlItems = cartItems?.map((item) => wishlistItemTemplate(item));

  if (!htmlItems || htmlItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "";
    document.querySelector(".cart-footer").innerHTML = "";
    document.querySelector(".empty-cart").innerHTML =
      "<p>Wishlist is currently empty.</p>" +
      "<a href='../index.html'> Continue shopping here</a>";
  } else {
    document.querySelector(".product-list").innerHTML = htmlItems?.join("");

    // once the HTML is rendered we can add a listener to Add to Cart button
    const items = document.querySelectorAll(".addToCart2");
    items.forEach((wishItem) => {
      wishItem.addEventListener("click", function () {
        addToCart(htmlItems);
      });
    });
  }
}

function wishlistItemTemplate(item) {
  console.log("this is the item:" + item.Id);
  product = item.Id;
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

function addToCart(itemId) {
  console.log("in add to cart" + itemId);
}
renderWishlistContents();
