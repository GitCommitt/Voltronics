const computers = [
  {
    available: "Available",
    name: "Foxel - Wit",
    image: "images/pc1.webp",
    price: 1089,
    specs: ["AMD Ryzen 5 5600", "Nvidia Geforce RTX 4060 8G", "1TB NVME SSD"],
    link: "products/computers/computer1.html?computer=foxel-wit"
  },
  {
    available: "Available",
    name: "Foxel - Zwart",
    image: "images/pc2.webp",
    price: 959,
    specs: ["AMD Ryzen 5 5600", "Nvidia Geforce RTX 4060 8G", "1TB NVME SSD"],
    link: "products/computers/computer2.html?computer=foxel-zwart"
  },
  {
    available: "Not Available",
    name: "Kracel - Wit",
    image: "images/pc3.webp",
    price: 1249,
    specs: ["Intel Core i5-12400F", "Nvidia Geforce RTX 4060 Ti", "1TB M.2 NVME SSD"],
    link: "products/computers/computer3.html?computer=kracel-wit"
  },
  {
    available: "Available",
    name: "Flore - Zwart",
    image: "images/pc4.webp",
    price: 2395,
    specs: ["AMD Ryzen 7 9800X3D", "Nvidia Geforce RTX 5070 12GB", "1TB M.2 NVME SSD"],
    link: "products/computers/computer4.html?computer=flore-zwart"
  },
  {
    available: "Available",
    name: "Obranium - Wit",
    image: "images/pc5.webp",
    price: 1939,
    specs: ["Intel Core i9-12700k", "Nvidia Geforce RTX 4070 12G", "1TB M.2 NVME SSD"],
    link: "products/computers/computer5.html?computer=obranium-wit"
  },
  {
    available: "Available",
    name: "Klav - Zwart",
    image: "images/pc6.webp",
    price: 1609,
    specs: ["Intel Core i7-12700k", "Nvidia Geforce RTX 4060 8G", "1TB M.2 NVME SSD"],
    link: "products/computers/computer6.html?computer=klav-zwart"
  }
];

const computerList = document.getElementById("computer-list");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function renderComputers(list) {
  computerList.innerHTML = "";

  if (list.length === 0) {
    computerList.innerHTML = "<p>Geen resultaten gevonden.</p>";
    return;
  }

  list.forEach((computer, index) => {
    const specsHTML = computer.specs.map(spec => `<li class="item__list">${spec}</li>`).join("");

    const html = `
      <article class="product-container__item item" data-index="${index}">
        <p class="item__status">${computer.available}</p>
        <img class="item__img" src="${computer.image}" alt="${computer.name}">
        <h2 class="item__price">€ ${computer.price},-</h2>
        <h2 class="item__name">${computer.name}</h2>
        <div class="item__beschrijving">
          <ul>
            ${specsHTML}
          </ul>
        </div>
        <div class="item__cart">
          <a href="${computer.link}" class="item__button">Bekijk product</a>
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
    computerList.insertAdjacentHTML("beforeend", html);
  });

  document.querySelectorAll(".item__button__addcart").forEach((button, i) => {
    button.addEventListener("click", () => {
      const selected = list[i];
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const found = cart.find(item => item.name === selected.name);

      if (found) {
        found.quantity++;
      } else {
        cart.push({ name: selected.name, price: selected.price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const cartIcon = document.querySelector(".button-winkel-nav");
      if (cartIcon) cartIcon.setAttribute("data-items", totalItems);
    });
  });
}

function sortComputers(criterium) {
  let sorted = [...computers];
  switch (criterium) {
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
  }
  renderComputers(sorted);
}

if (searchForm) {
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();

    const filtered = computers.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.specs.some(spec => spec.toLowerCase().includes(query))
    );

    renderComputers(filtered);
  });

  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      sortComputers(sortSelect.value);
    }
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    sortComputers(sortSelect.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  sortComputers("price-asc");
});
