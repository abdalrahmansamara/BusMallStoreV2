/* global Cart */
'use strict';

const trHeadElement = document.querySelector('thead tr');
const th4Element = document.createElement('th');
trHeadElement.appendChild(th4Element);
th4Element.textContent = 'Images';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  const elements = document.querySelector('tbody');
  while(elements.firstChild){
    elements.removeChild(elements.firstChild);
  }

}
// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  const bodyElement = document.querySelector('tbody');
  // TODO: Iterate over the items in the cart
  for (let i in cart.items ){
    // TODO: Create a TR
    const trElement = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    const td1Element = document.createElement('td');
    td1Element.textContent = ' X ';
    td1Element.setAttribute('id', i );
    const td2Element = document.createElement('td');
    td2Element.textContent = cart.items[i].quantity;
    const td3Element = document.createElement('td');
    td3Element.textContent = cart.items[i].product.name;
    let td4Element = document.createElement('td');
    const imgItem = document.createElement('img');
    imgItem.src = cart.items[i].product.filePath;
    td4Element.appendChild(imgItem);
    trElement.appendChild(td1Element);
    trElement.appendChild(td2Element);
    trElement.appendChild(td3Element);
    trElement.appendChild(td4Element);
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    bodyElement.appendChild(trElement);
  }



}

function removeItemFromCart(event) {
  const check = event.target;
  console.log(event);
  if ( check.nodeName === 'TD' && check.id){
    // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
    cart.removeItem(check.id);
    // TODO: Save the cart back to local storage
    cart.saveToLocalStorage();
    // TODO: Re-draw the cart table
    renderCart();
  }



}

// This will initialize the page and draw the cart on screen
renderCart();
