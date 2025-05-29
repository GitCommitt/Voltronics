const products = [
  {
    name: "Foxel - Wit",
    image: "images/pc1.png",
    price: 1089,
    specs: ["AMD Ryzen 5 5600", "Nvidia Geforce RTX 4060 8G", "1TB NVME SSD"],
    link: "products/product1.html?product=foxel-wit"
  },
  {
    name: "Foxel - Zwart",
    image: "images/pc2.png",
    price: 959,
    specs: ["AMD Ryzen 5 5600", "Nvidia Geforce RTX 4060 8G", "1TB NVME SSD"],
    link: "products/product2.html?product=foxel-zwart"
  },
  {
    name: "Kracel - Wit",
    image: "images/pc3.png",
    price: 1249,
    specs: ["Intel Core i5-12400F", "Nvidia Geforce RTX 4060 Ti", "1TB M.2 NVME SSD"],
    link: "products/product3.html?product=kracel-wit"
  },
  {
    name: "Flore - Zwart",
    image: "images/pc4.png",
    price: 2395,
    specs: ["AMD Ryzen 7 9800X3D", "Nvidia Geforce RTX 5070 12GB", "1TB M.2 NVME SSD"],
    link: "products/product4.html?product=flore-zwart"
  },
  {
    name: "Obranium - Wit",
    image: "images/pc5.png",
    price: 1939,
    specs: ["Intel Core i9-12700k", "Nvidia Geforce RTX 4070 12G", "1TB M.2 NVME SSD"],
    link: "products/product5.html?product=obranium-wit"
  },
  {
    name: "Klav - Zwart",
    image: "images/pc6.png",
    price: 1609,
    specs: ["Intel Core i7-12700k", "Nvidia Geforce RTX 4060 8G", "1TB M.2 NVME SSD"],
    link: "products/product6.html?product=klav-zwart"
  },
];

const productList = document.getElementById("product-list");

products.forEach(product => {
  const specList = product.specs.map(spec => `<li class="item__list">${spec}</li>`).join("");

  const html = `
    <article class="product-container__item item">
      <p class="item__status">available</p>
      <img class="item__img" src="${product.image}" alt="${product.name}" />
      <h2 class="item__price">$${product.price}</h2>
      <h2 class="item__name">${product.name}</h2>
      <p class="item__beschrijving">
        <ul>${specList}</ul>
      </p>
      <div class="item__cart">
        <a href="${product.link}" class="item__button">
          <span>Order</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height="34" width="34">
            <circle stroke-width="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
            <path fill="black" d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"></path>
          </svg>
        </a>
        <button class="item__button__addcart">
          <svg height="24" width="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
          </svg>
        </button>
        <button class="item__button__removecart">
          <svg height="25" width="25" viewBox="0 0 25 20">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 11h14v2H5z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
    </article>
  `;

  productList.insertAdjacentHTML("beforeend", html);
});