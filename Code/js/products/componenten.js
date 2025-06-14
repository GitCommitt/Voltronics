const componenten = [

  {
    name: "ASUS GeForce RTX 5060 Ti",
    available: "Not Available",
    image: "images/gc-1.webp",
    price: "549",
    specs: ["Asus", "GeForce RTX 5060 Ti", "16 GB", "2647  MHz"],
    link: "products/componenten/component1.html?component=ASUS GeForce RTX 5060 Ti"
  },
  {
    available: "Available",
    name: "ASUS GeForce RTX 5090 ROG",
    image: "images/gc-2.webp",
    price: "2999",
    specs: ["Asus", "GeForce RTX 5090", "32 GB", "2610 MHz"],
    link: "products/componenten/component2.html?component=ASUS GeForce RTX 5090 ROG"
  },
  {
    available: "Available",
    name: "ASUS Geforce RTX 3050 DUAL",
    image: "images/gc-3.webp",
    price: "219",
    specs: ["Asus", "GeForce RTX 3050", "8 GB", "1852 MHz"],
    link: "products/componenten/component3.html?component=ASUS Geforce RTX 3050 DUAL-RTX"
  },
  {
    available: "Available",
    name: "ASUS GeForce RTX 5090 TUF",
    image: "images/gc-4.webp",
    price: "2849",
    specs: ["Asus", "GeForce RTX 5090", "32 GB", "2437 MHz"],
    link: "products/componenten/component4.html?component=ASUS GeForce RTX 5090 TUF"
  },
  {
    available: "Available",
    name: "ASUS GeForce RTX 5070 TI ROG",
    image: "images/gc-5.webp",
    price: "1019",
    specs: ["Asus", "GeForce RTX 5070 Ti", "16 GB", "2625 MHz"],
    link: "products/componenten/component5.html?component=ASUS GeForce RTX 5070 Ti ROG"
  },
  {
    available: "Available",
    name: "Asus GeForce RTX 5060 Ti",
    image: "images/gc-6.webp",
    price: "529",
    specs: ["Asus", "GeForce RTX 5060 Ti", "8 GB", "2692  MHz"],
    link: "products/componenten/component6.html?component=Asus GeForce RTX 5060 Ti"
  }
];

const componentenList = document.getElementById("componenten-list");

componenten.forEach (component =>{
  const specList = component.specs.map(spec => `<li class="item__list">${spec}</li>`).join("");

  const html = `
    <article class="product-container__item item">
      <p class="item__status">${component.available}</p>
      <img class="item__img" src="${component.image}" alt="${component.name}" />
      <h2 class="item__price">${component.price},-</h2>
      <h2 class="item__name">${component.name}</h2>
      <p class="item__beschrijving">
        <ul>${specList}</ul>
      </p>
      <div class="item__cart">
        <a href="${component.link}" class="item__button">
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

    componentenList.insertAdjacentHTML("beforeend", html);
  });