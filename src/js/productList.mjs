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

export default async function productList(selector, category) {
  const prodList = document.querySelector(selector);
  const products = await getProductsByCategory(category);

  renderListWithTemplate(productCardTemplate, prodList, products);

  let count = Object.keys(products).length;
  console.log("this is the product count inside productlist:" + count);

  document.querySelector("#breadcrumb").innerHTML = category + " -> " + count;
}