import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product__retail-price">$${product.SuggestedRetailPrice}</p>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

function sortByName(a,b) { //sort products alphabetically 
  const x = a.NameWithoutBrand;
  const y = b.NameWithoutBrand;
  if (x === y) {
    return 0;
  } else if (x > y) {
    return 1;
  } else {
    return -1;
  }
}

export default async function productList(selector, category) {
  const prodList = document.querySelector(selector);
  const products = await getProductsByCategory(category);

  products.sort(sortByName);
  renderListWithTemplate(productCardTemplate, prodList, products);

  let checkbox = document.getElementById("sortBy");
    checkbox.addEventListener( "change", () => {
      if ( checkbox.checked ) {
        products.sort((a,b) => { return a.FinalPrice - b.FinalPrice}); //sort products by price
      } else {
        products.sort(sortByName);
      }
      renderListWithTemplate(productCardTemplate, prodList, products);
    });

  let count = Object.keys(products).length;
  document.querySelector("#breadcrumb").innerHTML = category + " -> " + count;
}