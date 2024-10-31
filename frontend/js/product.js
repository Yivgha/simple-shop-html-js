const productMainContent = document.getElementById('product-main-content');

document.addEventListener('DOMContentLoaded', async () => {
  createHeader();
  createFooter();

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    await fetchAndDisplayProduct(productId);
  }
});

async function fetchAndDisplayProduct(productId) {
  try {
    const response = await fetch(`http://localhost:3001/products/${productId}`);

    if (!response.ok) {
      throw new Error('Product not found');
    }

    const product = await response.json();

    document.title = product.name;

    const productHTML = `
      <div class="product-container">
          <h1 class="product-name" id="product-name">${product.name}</h1>
          
          <img src="${product.image}" alt="${product.name}" class="product-image">
       
          <p class="product-price" id="product-price">Price: $${product.price}</p>
          
          <input type="number" id="quantity" value="1" min="1" class="quantity-input">
          <button class="add-to-cart" id="add-to-cart">Add to Cart</button>
      </div>
    `;
    productMainContent.innerHTML = productHTML;

    const addToCartButton = document.getElementById('add-to-cart');
    addToCartButton.addEventListener('click', () =>
      addToCart(
        product._id,
        product.name,
        document.getElementById('quantity').value
      )
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    productMainContent.innerHTML = '<p>Product not found</p>';
  }
}

function addToCart(productId, productName, quantity) {
  let cart = JSON.parse(localStorage.getItem('shopCart')) || [];
  const existingProduct = cart.find((item) => item.product === productId);

  if (existingProduct) {
    existingProduct.quantity += parseInt(quantity);
  } else {
    cart.push({ product: productId, quantity: parseInt(quantity) });
  }

  localStorage.setItem('shopCart', JSON.stringify(cart));
  alert(`${productName} added to cart successfully!`);
}

