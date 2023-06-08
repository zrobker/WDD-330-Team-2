import { loadHeaderFooter, addToMailingList} from './utils.mjs';

import alert from './alert.mjs';

loadHeaderFooter();


document
  .getElementById('newsletter')
  .addEventListener('click', addToMailingList);


//look for any messages in json and alert on index.html
const newMessage = new alert();
newMessage.displayMessages();
