export function updateCart(index, quantity, productTitle) {
  const existingCartItem = document.querySelector(`#bill-component-${index}`);
  console.log(index, "updateCart", existingCartItem);

  if (quantity > 0) {
    if (!existingCartItem) {
      const cart = document.querySelector("#top");
      cart.innerHTML += `
          <div id="bill-component-${index}" class="bg-slate-600 h-12 rounded-xl flex items-center justify-between px-4 transition-transform duration-500 opacity-0 scale-95 invisible my-2">
            <span>${productTitle}</span>
            <span id="no-of-${index}">&times; ${quantity}</span>
          </div>
        `;
      const component = document.querySelector(`#bill-component-${index}`);
      component.classList.remove("opacity-0", "scale-95", "invisible");
      component.classList.add("opacity-100", "scale-100", "visible");
    } else {
      document.querySelector(`#no-of-${index}`).textContent = `× ${quantity}`;
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
