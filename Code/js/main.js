const toggleButton = document.querySelector('.menu-toggle');
const navButtons = document.querySelector('.navbar-buttons');

toggleButton.addEventListener('click', () => {
  navButtons.classList.toggle('show');
});

function clearSearchInput() {
  const input = document.getElementsByTagName("input")[0];
  input.value = "";
}

document.querySelectorAll(".product-container__item").forEach(product => {
  const addButton = product.querySelector(".item__button__addcart");
  const removeButton = product.querySelector(".item__button__removecart");

  let productCount = 0;
  const cartButton = document.querySelector(".button-winkel-nav");
  let totalCount = parseInt(cartButton.getAttribute("data-items")) || 0;

  removeButton.style.display = "none";

  addButton.addEventListener("click", () => {
    productCount++;
    totalCount++;
    cartButton.setAttribute("data-items", totalCount);
    if (productCount > 0) {
      removeButton.style.display = "inline-block";
    }
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

function searchProducts(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;

  fetch(`search.php?query=${encodeURIComponent(query)}`)
    .then(response => response.text()) // Gebruik .text() om te zien wat de daadwerkelijke respons is
    .then(data => {
      console.log(data); // Log de raw response om te zien wat je ontvangt
      try {
        const jsonData = JSON.parse(data); // Parse de JSON handmatig om te controleren
        const container = document.getElementById('product-list');
        container.innerHTML = '';
        jsonData.forEach(product => {
          const div = document.createElement('div');
          div.className = 'product';
          div.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          `;
          container.appendChild(div);
        });
      } catch (e) {
        console.error('Fout bij het parsen van JSON:', e);
      }
    })
    .catch(error => {
      console.error('Er is een fout opgetreden bij het ophalen van de gegevens:', error);
    });
}
