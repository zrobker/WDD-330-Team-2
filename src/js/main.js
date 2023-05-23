import { getLocalStorage, loadHeaderFooter, setLocalStorage } from './utils.mjs';
import productList from './productList.mjs';

productList('.product-list', category);
loadHeaderFooter();

document.getElementById('newsletter').addEventListener('click', addToMailingList);

function addToMailingList(){
    
    const container = document.querySelector('.mailing-list'); /*select the element that will contain the new element*/
    const email_form = document.createElement('form'); /*create the new element to be added*/
    
    email_form.style.padding = '2em';
    email_form.style.display = 'flex';
    email_form.style.justifyContent = 'space-around';


    const email_fieldset = document.createElement('fieldset'); /*create the new element to be added*/
    email_fieldset.style.color = 'blue';
    email_fieldset.style.justifyContent = 'center';
    email_fieldset.style.textAlign = 'center';
    email_fieldset.style.maxWidth = '40rem';

    const email_legend = document.createElement('legend'); /*create the new element to be added*/
    email_legend.innerText = 'Enter email';


    const email_input = document.createElement('input');/*create the new element to be added*/
    email_input.setAttribute('id', 'custEmail');
    email_input.setAttribute('type', 'email');
    email_input.setAttribute('placeholder', 'someone@gmail.com');

    const email_submit = document.createElement('input');
    email_submit.setAttribute('type', 'submit');
    email_submit.setAttribute('value', 'Submit');
    

    email_fieldset.appendChild(email_legend); /*add the new legend to the fieldset*/
    email_fieldset.appendChild(email_input); /*add the new input to the fieldset*/
    email_fieldset.appendChild(email_submit);

    email_form.appendChild(email_fieldset); /*add the new fieldset to the form*/
    
    container.appendChild(email_form); /*add the new form to the document*/

    
    let email = email_input.value;
    let mailList = getLocalStorage('mailing-list');
    if (!mailList) {
        mailList = [];
    }
    mailList.push(email);
    // console.log(mailList);
    setLocalStorage('mailing-list', mailList);
}
