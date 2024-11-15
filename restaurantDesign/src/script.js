const restaurantMenu = [
  {
    "id": 1,
    "name": "Margherita Pizza",
    "price": 750, // Rounded to nearest multiple of 10
    "description": "Classic pizza with mozzarella and tomato sauce",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 2,
    "name": "Spaghetti Bolognese",
    "price": 1070, // Rounded to nearest multiple of 10
    "description": "Spaghetti with a rich meat sauce",
    "image": "https://plus.unsplash.com/premium_photo-1677000666741-17c3c57139a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhZ2hldHRpJTIwQm9sb2duZXNlfGVufDB8fDB8fHww"
  },
  {
    "id": 3,
    "name": "Caesar Salad",
    "price": 660, // Rounded to nearest multiple of 10
    "description": "Crisp romaine lettuce with Caesar dressing and croutons",
    "image": "https://plus.unsplash.com/premium_photo-1664478283448-94d7b72a23ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2Flc2FyJTIwU2FsYWR8ZW58MHx8MHx8fDA%3D"
  },
  {
    "id": 4,
    "name": "Burger",
    "price": 910, // Rounded to nearest multiple of 10
    "description": "Juicy beef burger with lettuce, tomato, and cheese",
    "image": "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww"
  },
  {
    "id": 5,
    "name": "Coffee",
    "price": 300, // Rounded to nearest multiple of 10
    "description": "Freshly brewed coffee with a rich aroma",
    "image": "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmV8ZW58MHx8MHx8fDA%3D"
  },
  {
    "id": 6,
    "name": "Frankie",
    "price": 540, // Rounded to nearest multiple of 10
    "description": "Spiced potatoes, crunchy veggies, and tangy sauces wrapped in a warm flatbread, offering a perfect blend of flavors",
    "image": "https://media.istockphoto.com/id/1473859349/photo/peri-peri-wrap-paratha-roll-served-in-wooden-board-side-view-of-indian-fastfood.webp?a=1&b=1&s=612x612&w=0&k=20&c=e4mF_TquC32ilIvd37-0Av_5Mtr1hJ_7TBy2yf9Qg9w="
  }
];

// UI part js
function buildItem(restaurantMenuItem, itemPrices, index) {
  return `
        <div class="item-${index} h-[300px] m-4 bg-cyan-800 rounded-3xl border-transparent hover:border-white hover:border-2 hover:scale-95 transform trasition duration-300 ease-in-out">
          <div class="img h-3/5 rounded-3xl">
              <img src="${restaurantMenuItem.image}" alt="item" class="object-cover w-full h-full rounded-t-3xl">
          </div>

          <div class="content p-4 h-2/5 flex flex-col justify-between">
              <h2 class="text-lg font-semibold">${restaurantMenuItem.name}</h2>
              
              <p class="text-sm truncate">
                  ${restaurantMenuItem.description}
              </p>
              
              <div class="flex justify-between items-center mt-2">
                  <span class="text-lg font-bold">Rs ${restaurantMenuItem.price}</span>
                  <div class="no_of_items flex justify-between items-center w-2/5">
                      <button id="sub${index}" class="h-6 w-6 border-2 border-white rounded-md text-center font-bold flex items-center justify-center">
                          -
                      </button>
                      <span id="count${index}" class="text-xl font-bold">${itemPrices[index]}</span>
                      <button id="add${index}" class="h-6 w-6 border-2 border-white rounded-md text-center font-bold flex items-center justify-center">
                          +
                      </button>
                  </div>
                  
              </div>
          </div>
        </div>
    `;
}

let itemsContainer = document.querySelector(".items");
// let itemPrices = [];
// itemPrices.length = 6;
let itemPrices = Array(6).fill(0);

for (let index = 0; index < restaurantMenu.length; index++) {
  itemsContainer.innerHTML += buildItem(restaurantMenu[index], itemPrices, index);
}

// ------------------------------------------------------- -Event handling  ------------------------------------------------------------------------
// eventHandler is an array which contains the array of different buttons

for (let index = 0; index < restaurantMenu.length; index++) {
  const countDisplay = document.querySelector(`#count${index}`);

  // Add button
  document.querySelector(`#add${index}`).addEventListener("click", () => {
    itemPrices[index]++;
    countDisplay.textContent = itemPrices[index];

    const topRight = document.querySelector("#top");

    if (!document.querySelector(`#bill-component-${index}`)) {
      topRight.innerHTML += returnNewItemToCart(index);

      const component = document.querySelector(`#bill-component-${index}`);
      component.offsetHeight; // Trigger reflow

      component.classList.remove("opacity-0", "scale-95", "invisible");
      component.classList.add("opacity-100", "scale-100", "visible");
    } else {
      // Update existing item quantity
      updateCart(index);
    }

    calCulateBill();
    
    document.querySelector("#bottom").classList.remove("invisible");
  });

  // Subtract button
  document.querySelector(`#sub${index}`).addEventListener("click", () => {
    const component = document.querySelector(`#bill-component-${index}`);

    if (itemPrices[index] === 1) {
      itemPrices[index] = 0;
      component?.remove();
      countDisplay.textContent = itemPrices[index];

      let flag = false;
      for (let i = 0; i < itemPrices.length; i++) {
        if (itemPrices[i] > 0) 
          flag = true;
      }
      if (!flag) {
        document.querySelector("#bottom").classList.add("invisible");
      }

      return;
    }

    if (itemPrices[index] > 1) {
      itemPrices[index]--;
      countDisplay.textContent = itemPrices[index];
      document.querySelector(`#no-of-${index}`).innerHTML = `&times; ${itemPrices[index]}`;
    }

    calCulateBill();
  });
}

// construct bill and show the selected items in the right

function updateCart(index) {
  document.querySelector(`#no-of-${index}`).innerHTML = `&times; ${itemPrices[index]}`;
}
function returnNewItemToCart(index) {
  return `
    <div id="bill-component-${index}" class="bg-slate-600 h-12 rounded-xl flex items-center justify-between px-4 transition-transform duration-500 opacity-0 scale-95 invisible my-2">
      <span>${restaurantMenu[index].name}</span>
      <span id="no-of-${index}">&times; ${itemPrices[index]}</span>
    </div>
  `;
}

function calCulateBill() {
  let subTotal = 0;
  let gst = 0;

  for (let index = 0; index < restaurantMenu.length; index++) {
    if (itemPrices[index] > 0) {
      const price = itemPrices[index] * restaurantMenu[index].price;
      subTotal += price;
      gst += (5 / 100) * price;
    }
  }

  document.querySelector("#Subtotal").innerHTML = subTotal.toFixed(2);
  document.querySelector("#GST").innerHTML = gst.toFixed(2);
  document.querySelector("#Total").innerHTML = (subTotal + gst).toFixed(2);
}

document.querySelector("#buy").addEventListener("click",()=>{
  alert("thanks");
  location.reload();
})