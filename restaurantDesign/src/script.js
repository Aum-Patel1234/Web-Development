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

let items = document.querySelector(".items");

restaurantMenu.forEach(menuItem => {
  items.innerHTML += `
        <div class="item-1 m-4 bg-cyan-800 rounded-3xl">
          <div class="img h-3/5 rounded-3xl">
              <img src="${menuItem.image}" alt="item" class="object-cover w-full h-full rounded-t-3xl">
          </div>

          <div class="content p-4 h-2/5 flex flex-col justify-between">
              <h2 class="text-lg font-semibold">${menuItem.name}</h2>
              
              <p class="text-sm truncate">
                  ${menuItem.description}
              </p>
              
              <div class="flex justify-between items-center mt-2">
                  <span class="text-lg font-bold">Rs ${menuItem.price}</span>
                  <div class="no_of_items flex justify-between items-center w-2/5">
                      <button id="sub" class="h-8 w-8 border-2 border-white rounded-md text-center font-bold flex items-center justify-center">
                          -
                      </button>
                      <span class="text-xl font-bold">0</span>
                      <button id="add" class="h-8 w-8 border-2 border-white rounded-md text-center font-bold flex items-center justify-center">
                          +
                      </button>
                  </div>
                  
              </div>
          </div>
        </div>
    `;
});