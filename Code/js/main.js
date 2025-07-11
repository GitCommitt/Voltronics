const toggleButton = document.querySelector('.menu-toggle');
const navButtons = document.querySelector('.navbar-buttons');

toggleButton.addEventListener('click', () => {
  navButtons.classList.toggle('show');
});

function clearSearchInput() {
  const input = document.getElementsByTagName("input")[0];
  input.value = "";
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartButton = document.querySelector(".button-winkel-nav");
  cartButton.setAttribute("data-items", totalItems);
}

window.addEventListener('load', updateCartCount);

document.querySelectorAll(".product-container__item").forEach(product => {
  const addButton = product.querySelector(".item__button__addcart");
  const removeButton = product.querySelector(".item__button__removecart");

  let productCount = 0;
  const cartButton = document.querySelector(".button-winkel-nav");
  let totalCount = parseInt(cartButton.getAttribute("data-items")) || 0;

  removeButton.style.display = "none";

  addButton.addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const computer = computers[product.dataset.index];
    const existingItem = cartItems.find(item => item.name === computer.name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ name: computer.name, price: computer.price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    updateCartCount();
  });

  removeButton.addEventListener("click", () => {
    if (productCount > 0) {
      productCount--;
      totalCount--;
      cartButton.setAttribute("data-items", totalCount);
      if (productCount === 0) {
        removeButton.style.display = "none";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.querySelector(".button-winkel-nav");
  const addToCartButton = document.querySelector(".add-cart");
  const removeFromCartButton = document.querySelector(".remove-cart");

  let totalCount = parseInt(cartButton.getAttribute("data-items")) || 0;
  let productCount = 0;

  if (addToCartButton && removeFromCartButton) {
    addToCartButton.addEventListener("click", () => {
      productCount++;
      totalCount++;
      cartButton.setAttribute("data-items", totalCount);
      removeFromCartButton.style.display = "inline-block";
    });

    removeFromCartButton.addEventListener("click", () => {
      if (productCount > 0) {
        productCount--;
        totalCount--;
        cartButton.setAttribute("data-items", totalCount);

        if (productCount === 0) {
          removeFromCartButton.style.display = "none";
        }
      }
    });
  }
});

function verzendEmail() {
  const email = document.getElementById('email').value;
  const bevestiging = document.getElementById('bevestigingstekst');

  if (email.includes('@')) {
    bevestiging.style.display = 'block';
  } else {
    bevestiging.style.display = 'none';
    alert("Vul een geldig e-mailadres in.");
  }
}

function darkmodeFunction() {
  const checkbox = document.querySelector('.checkbox');

  if (checkbox.checked) {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const checkbox = document.querySelector('.checkbox');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    checkbox && (checkbox.checked = true);
  } else {
    document.body.classList.add('dark-mode');
    checkbox && (checkbox.checked = false);
  }
});

function openModal() {
  document.getElementById('productModal').style.display = "block";
}

function closeModal() {
  document.getElementById('productModal').style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById('productModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
