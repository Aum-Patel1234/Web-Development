

export function updateCart(index, quantity, productTitle, price) {
  const existingCartItem = document.querySelector(`#bill-component-${index}`);
  // console.log(index, "updateCart", existingCartItem);

  if (quantity > 0) {
    if (!existingCartItem) {
      const cart = document.querySelector("#top");
      const billComponent = document.createElement("div");
      billComponent.id = `bill-component-${index}`;
      billComponent.className = "parent light-light-dark w-full h-14 rounded-xl flex items-center justify-between px-2 transition-transform duration-500 opacity-0 scale-95 invisible my-2";

      // Inner HTML for the new element
      billComponent.innerHTML = `
        <div class="flex items-center">
          <span id="cartIndex-${index}" class="flex w-8 h-8 justify-center items-center bg-white rounded-full text-black mr-2 text-xl"></span>
          <span class="truncate max-w-44">${productTitle}&nbsp;</span>  
          <span id="no-of-${index}">&times; ${quantity}</span>
        </div>
        <div class="w-8 flex justify-end items-center">
          <span id="no-of-quantity-${index}">$${quantity*price}&nbsp;</span>
          <div id="deleteBillComponent-${index}" class="delete-btn h-6 min-w-6 rounded-full flex justify-center hover:cursor-pointer items-center bg-red-600">
            <span id="deleteBillComponent-${index}" class="group-hover:block text-xl">×</span>
          </div>
        </div>
      `;

      cart.appendChild(billComponent);
      updateCartIndex();                        // the order of the lines is    I M P O R T A N T

      const component = document.querySelector(`#bill-component-${index}`);
      component.classList.remove("opacity-0", "scale-95", "invisible");
      component.classList.add("opacity-100", "scale-100", "visible");
    } else {
      document.querySelector(`#no-of-${index}`).textContent = `× ${quantity}`;
      document.querySelector(`#no-of-quantity-${index}`).innerHTML = `$${(quantity*price).toFixed(2)}&nbsp;`;
    }
  } else if (existingCartItem) {
    existingCartItem.remove();
  }
}

// Calculate and display bill
export function calculateBill() {
  let subTotal = 0;
  let gst = 0;
  const cartItems = document.querySelectorAll("#top > div");

  cartItems.forEach((item) => {
    const index = item.id.split("-")[2];
    const price = parseFloat(
      document
        .querySelector(`#item-${index} #price-${index}`)
        .textContent.replace("$ ", ""),
    ); // so from "$ 12" we get 12
    // console.log(price)
    const quantity = parseInt(
      document.querySelector(`#count-${index}`).textContent,
      10,
    );

    subTotal += price * quantity;
    gst += (18 / 100) * price * quantity;
  });

  document.querySelector("#Subtotal").textContent = subTotal.toFixed(2);
  document.querySelector("#GST").textContent = gst.toFixed(2);
  document.querySelector("#Total").textContent = (subTotal + gst).toFixed(2);
}

export function updateCartIndex(){
  let cartItems = document.querySelector("#top").children;
  Array.from(cartItems).forEach((item,i)=>{
    item.firstElementChild.firstElementChild.innerHTML = `${i+1}`;
  });
}