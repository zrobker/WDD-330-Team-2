// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));

  
}
// save data to local storage
export function setLocalStorage(key, data) {
  let cart = getLocalStorage(key);   //retrieve what is currently in localStorage
  if (cart === null) {
    //The cart is empty
    cart = [];  //Create an array to hold each item that is added to the cart.
  };

  cart.push(data);   //Add the new item to the cart array.

  localStorage.setItem(key, JSON.stringify(cart));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
