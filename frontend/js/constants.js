const header = document.getElementById('header');
const footer = document.getElementById('footer');

const productListContainer = document.getElementById('product-list');

const checkoutForm = document.getElementById('checkout-form');
const checkoutBtn = document.querySelector('#checkout');

const cart = JSON.parse(localStorage.getItem('shopCart')) || [];

const searchInput = document.getElementById('search-input');

const orderTotalElement = document.getElementById('order-total');

