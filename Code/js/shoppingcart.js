document.addEventListener('DOMContentLoaded', function () {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const componenten = [
    { name: "ASUS GeForce RTX 5060 Ti", image: "images/gc-1.webp", price: 549 },
    { name: "ASUS GeForce RTX 5090 ROG", image: "images/gc-2.webp", price: 2999 },
    { name: "ASUS Geforce RTX 3050 DUAL", image: "images/gc-3.webp", price: 219 },
    { name: "ASUS GeForce RTX 5090 TUF", image: "images/gc-4.webp", price: 2849 },
    { name: "ASUS GeForce RTX 5070 TI ROG", image: "images/gc-5.webp", price: 1019 },
    { name: "Asus GeForce RTX 5060 Ti", image: "images/gc-6.webp", price: 529 }
  ];

  const computers = [
    { name: "Foxel - Wit", image: "images/pc1.webp", price: 1089 },
    { name: "Foxel - Zwart", image: "images/pc2.webp", price: 959 },
    { name: "Kracel - Wit", image: "images/pc3.webp", price: 1249 },
    { name: "Flore - Zwart", image: "images/pc4.webp", price: 2395 },
    { name: "Obranium - Wit", image: "images/pc5.webp", price: 1939 },
    { name: "Klav - Zwart", image: "images/pc6.webp", price: 1609 }
  ];

  const cartItemsContainer = document.getElementById('cart-items');
  const totalQuantityEl = document.getElementById('total-quantity');
  const totalPriceEl = document.getElementById('total-price');
  const finalTotalDisplay = document.getElementById('final-total');
  const shippingSelect = document.getElementById('shipping-options');

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
  }

  function updateFinalTotal(totalPrice) {
    const shipping = parseFloat(shippingSelect.value) || 0;
    finalTotalDisplay.textContent = `€ ${(totalPrice + shipping).toFixed(2)}`;
  }

  function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartButton = document.querySelector(".button-winkel-nav");
    if (cartButton) {
      cartButton.setAttribute("data-items", totalItems);
    }
  }

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cartItems.length === 0) {
      cartItemsContainer.textContent = 'Geen artikelen in je winkelwagen';
      totalQuantityEl.textContent = 'Aantal: 0';
      totalPriceEl.textContent = 'Prijs: € 0.00';
      updateFinalTotal(0);
      return;
    }

    cartItems.forEach((item, index) => {
      let product = componenten.find(p => p.name === item.name);
      if (!product) {
        product = computers.find(pc => pc.name === item.name);
      }
      if (!product) return;

      const subtotal = (parseFloat(product.price) * item.quantity) || 0;
      totalQuantity += item.quantity;
      totalPrice += subtotal;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';

      itemDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <h3>${product.name}</h3>
          <p>Prijs per stuk: € ${parseFloat(product.price).toFixed(2)}</p>
          <p>Aantal: ${item.quantity}</p>
          <p>Subtotaal: € ${subtotal.toFixed(2)}</p>
          <div class="item-controls">
            <button class="decrease-btn" data-index="${index}">−</button>
            <button class="increase-btn" data-index="${index}">+</button>
            <button class="remove-btn" data-index="${index}">Verwijder</button>
          </div>
        </div>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });

    totalQuantityEl.textContent = `Aantal: ${totalQuantity}`;
    totalPriceEl.textContent = `Prijs: € ${totalPrice.toFixed(2)}`;
    updateFinalTotal(totalPrice);
  }

cartItemsContainer.addEventListener('click', function (e) {
  const index = e.target.dataset.index;
  if (!index) return;

  if (e.target.classList.contains('remove-btn')) {
    cartItems.splice(index, 1);
  }

  if (e.target.classList.contains('increase-btn')) {
    cartItems[index].quantity++;
  }

  if (e.target.classList.contains('decrease-btn')) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
    } else {
      cartItems.splice(index, 1);
    }
  }

  saveCart();
  renderCart();
});


  shippingSelect.addEventListener('change', () => {
    const subtotal = parseFloat(totalPriceEl.textContent.replace(/[^\d.]/g, '')) || 0;
    updateFinalTotal(subtotal);
  });

  renderCart();
});
