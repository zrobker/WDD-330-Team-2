import { loadHeaderFooter, addToMailingList, is_first_time } from "./utils.mjs";

import alert from "./alert.mjs";

loadHeaderFooter();
is_first_time();

document
  .getElementById("newsletter")
  .addEventListener("click", addToMailingList);

//look for any messages in json and alert on index.html
const newMessage = new alert();
newMessage.displayMessages();
