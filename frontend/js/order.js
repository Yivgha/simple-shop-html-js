document.addEventListener('DOMContentLoaded', async () => {
  await calculateTotalCost(cart, orderTotalElement);
});

checkoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const orderData = {
    customer: {
      name,
      address,
      email: email || null,
      phone: phone || null,
    },
    products: cart,
  };

  console.log('order data', orderData);

  try {
    const response = await fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Order placed successfully!');
      localStorage.removeItem('shopCart');
      window.location.href = 'index.html';
    } else {
      alert('Error placing order: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while placing the order.');
  }
});

