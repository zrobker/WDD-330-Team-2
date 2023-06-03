

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
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get a parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}


export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
        const res = await fetch(path);
        if (res.ok) {
          const html = await res.text();
          return html;
        }
    };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = await loadTemplate("/partials/header.html");
  const footerTemplateFn = await loadTemplate("/partials/footer.html");

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  await renderWithTemplate(headerTemplateFn, headerEl);
  await renderWithTemplate(footerTemplateFn, footerEl);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

// ------------This is the Mailing List -------------
export function addToMailingList(){
    
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