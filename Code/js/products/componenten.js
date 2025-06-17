const componenten = [
  {
    name: "ASUS GeForce RTX 5060 Ti",
    available: "Not Available",
    image: "images/gc-1.webp",
    price: 549,
    specs: ["Asus", "GeForce RTX 5060 Ti", "16 GB", "2647  MHz"],
    link: "products/componenten/component1.html?component=ASUS GeForce RTX 5060 Ti"
  },
  {
    available: "Available",
    name: "ASUS GeForce RTX 5090 ROG",
    image: "images/gc-2.webp",
    price: 2999,
    specs: ["Asus", "GeForce RTX 5090", "32 GB", "2610 MHz"],
    link: "products/componenten/component2.html?component=ASUS GeForce RTX 5090 ROG"
  },
  {
    available: "Available",
    name: "ASUS Geforce RTX 3050 DUAL",
    image: "images/gc-3.webp",
    price: 219,
    specs: ["Asus", "GeForce RTX 3050", "8 GB", "1852 MHz"],
    link: "products/componenten/component3.html?component=ASUS Geforce RTX 3050 DUAL-RTX"
  },
  {
    available: "Available",
    name: "ASUS GeForce RTX 5090 TUF",
    image: "images/gc-4.webp",
    price: 2849,
    specs: ["Asus", "GeForce RTX 5090", "32 GB", "2437 MHz"],
    link: "products/componenten/component4.html?component=ASUS GeForce RTX 5090 TUF"
  },
  {
    available: "Available",
    name: "ASUS GeForce RTX 5070 TI ROG",
    image: "images/gc-5.webp",
    price: 1019,
    specs: ["Asus", "GeForce RTX 5070 Ti", "16 GB", "2625 MHz"],
    link: "products/componenten/component5.html?component=ASUS GeForce RTX 5070 Ti ROG"
  },
  {
    available: "Available",
    name: "Asus GeForce RTX 5060 Ti",
    image: "images/gc-6.webp",
    price: 529,
    specs: ["Asus", "GeForce RTX 5060 Ti", "8 GB", "2692  MHz"],
    link: "products/componenten/component6.html?component=Asus GeForce RTX 5060 Ti"
  }
];

let filteredComponenten = componenten;

const componentenList = document.getElementById("componenten-list");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function renderComponenten(list) {
  componentenList.innerHTML = "";

  if (list.length === 0) {
    componentenList.innerHTML = "<p>Geen resultaten gevonden.</p>";
    return;
  }

  list.forEach(component => {
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
            <span>Bekijk product</span>
          </a>
          <div class="new-button-class">
            <div class="new-button-wrapper">
              <button class="item__button__addcart">
                <div class="new-text">Add to cart</div>
                <span class="new-icon">
                  <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
    componentenList.insertAdjacentHTML("beforeend", html);
  });

  document.querySelectorAll(".item__button__addcart").forEach((button, index) => {
    button.addEventListener("click", function () {
      const component = list[index];
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cartItems.find(item => item.name === component.name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({ name: component.name, price: component.price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));

      const cartButton = document.querySelector(".button-winkel-nav");
      const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
      cartButton.setAttribute("data-items", totalItems);
    });
  });
}

function sortComponenten(criteria) {
  let sorted = [...filteredComponenten];

  switch (criteria) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "availability":
      sorted.sort((a, b) => a.available.localeCompare(b.available));
      break;
    default:
      break;
  }

  renderComponenten(sorted);
  localStorage.setItem('sortOption', criteria);
}

if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();

    filteredComponenten = componenten.filter(component =>
      component.name.toLowerCase().includes(searchTerm) ||
      component.specs.some(spec => spec.toLowerCase().includes(searchTerm))
    );

    sortComponenten(sortSelect.value);
  });

  searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() === "") {
      filteredComponenten = componenten;
      sortComponenten(sortSelect.value);
    }
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", function () {
    sortComponenten(sortSelect.value);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const savedSortOption = localStorage.getItem('sortOption') || "price-asc";
  sortSelect.value = savedSortOption;
  sortComponenten(savedSortOption);
});
