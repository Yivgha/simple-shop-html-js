document.addEventListener('DOMContentLoaded', async () => {
  createHeader();
  createFooter();
  const cart = JSON.parse(localStorage.getItem('shopCart')) || [];
  await displayCartItems();

  const totalCostContainer = document.getElementById('total-cost');
  await calculateTotalCost(cart, totalCostContainer);
});

async function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem('shopCart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.textContent = 'Your cart is empty.';
  } else {
    const cartItemsGrid = document.createElement('div');
    cartItemsGrid.classList.add('product-grid');

    for (const item of cart) {
      const productInfo = await fetchProductInfo(item.product);

      if (productInfo) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('product');
        cartItem.innerHTML = `
  <img src="${productInfo.image}" alt="${productInfo.name}" onclick="navigateToProduct('${productInfo._id}')">
  <strong>${productInfo.name}</strong><br>
  Price: $${productInfo.price}<br>
  <div class="quantity-controls">
      <button onclick="decreaseQuantity('${item.product}')">-</button>
      <span id="quantity-${item.product}">${item.quantity}</span>
      <button onclick="increaseQuantity('${item.product}')">+</button>
  </div>
`;

        cartItemsGrid.appendChild(cartItem);
      } else {
        const errorItem = document.createElement('div');
        errorItem.textContent = `Product with ID ${item.product} not found.`;
        cartItemsContainer.appendChild(errorItem);
      }
    }

    cartItemsContainer.appendChild(cartItemsGrid);
  }
}

async function dispatchCartItems(cart) {
  try {
    const response = await fetch('http://localhost:3001/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit cart');
    }

    const data = await response.json();
    console.log('Cart submitted:', data);
    alert('Cart submitted successfully!');

    window.location.href = 'checkout.html';
  } catch (error) {
    console.error('Error submitting cart:', error);
  }
}

checkoutBtn.addEventListener('click', async () => {
  const cart = JSON.parse(localStorage.getItem('shopCart')) || [];
  console.log('cart on submit', cart);

  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  await dispatchCartItems(cart);
});

