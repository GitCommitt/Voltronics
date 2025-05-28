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