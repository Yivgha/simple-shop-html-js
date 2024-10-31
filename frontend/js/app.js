let allCategories = [];

async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:3001/categories');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    allCategories = await response.json();
    displayCategories(allCategories);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3001/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function displayProducts(products) {
  return products
    .map(
      (product) => `
            <div class="product" >
              <img src="${product.image}" alt="${product.name}" onclick="navigateToProduct('${product._id}')">
              <strong>${product.name}</strong><br>
              Price: $${product.price}<br>
              <button class="add-to-cart" onclick="addToCart('${product._id}', '${product.name}')">Add to Cart</button>
            </div>
        `
    )
    .join('');
}

function displayCategories(categories) {
  productListContainer.innerHTML = '';

  categories.forEach((category) => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h2');
    categoryTitle.classList.add('category-title');
    categoryTitle.textContent = category.name;

    const productsHTML = displayProducts(category.products);
    const productsContainer = document.createElement('div');
    productsContainer.classList.add('product-grid');
    productsContainer.innerHTML = productsHTML;

    categoryContainer.appendChild(categoryTitle);
    categoryContainer.appendChild(productsContainer);
    productListContainer.appendChild(categoryContainer);
  });
}

function addToCart(productId, productName) {
  let cart = JSON.parse(localStorage.getItem('shopCart')) || [];
  const existingProduct = cart.find((item) => item.product === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ product: productId, quantity: 1 });
  }

  localStorage.setItem('shopCart', JSON.stringify(cart));
  alert(`${productName} added to cart successfully!`);
}

document.addEventListener('DOMContentLoaded', () => {
  createHeader();
  createFooter();
  fetchCategories();
});

searchInput?.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCategories = allCategories
    .map((category) => {
      const filteredProducts = category.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );

      if (filteredProducts.length > 0) {
        return {
          ...category,
          products: filteredProducts,
        };
      }
      return null;
    })
    .filter(Boolean);

  displayCategories(filteredCategories);
});

