const productCache = {};

function createHeader() {
  header.innerHTML = `
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="cart.html">Cart</a></li>
            </ul>
        </nav>
    `;
}

function createFooter() {
  footer.innerHTML = `
        <p>&copy; 2024 My Store. All rights reserved.</p>
    `;
}

function navigateToProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}

async function fetchProductInfo(productId) {
  if (productCache[productId]) {
    return productCache[productId];
  }

  try {
    const response = await fetch('http://localhost:3001/products/' + productId);
    if (!response.ok) {
      throw new Error('Product not found');
    }

    const productData = await response.json();
    productCache[productId] = productData;
    return productData;
  } catch (error) {
    console.error('Error fetching product info:', error);
    return null;
  }
}

async function calculateTotalCost(cart, totalCostContainer) {
  let totalCost = 0;

  for (const item of cart) {
    const productInfo = await fetchProductInfo(item.product);
    if (productInfo) {
      totalCost += productInfo.price * item.quantity;
    }
  }

  totalCostContainer.textContent = `Total Cost: $${totalCost}`;
}

function decreaseQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem('shopCart')) || [];
  const updatedCart = cart.map((item) => {
    if (item.product === productId && item.quantity > 1) {
      item.quantity -= 1;
    }
    return item;
  });

  localStorage.setItem('shopCart', JSON.stringify(updatedCart));
  displayCartItems();
  calculateTotalCost();
}

function increaseQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem('shopCart')) || [];
  const updatedCart = cart.map((item) => {
    if (item.product === productId) {
      item.quantity += 1;
    }
    return item;
  });

  localStorage.setItem('shopCart', JSON.stringify(updatedCart));
  displayCartItems();
  calculateTotalCost();
}

