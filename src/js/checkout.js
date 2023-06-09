import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  var myForm = document.querySelector("#order-form");
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) checkoutProcess.checkout(myForm);
});
