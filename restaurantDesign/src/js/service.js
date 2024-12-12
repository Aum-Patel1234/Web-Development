"use strict";

export function buildItem(product) {
  const index = product.id;

  return `
      <div id="item-${index}" class="h-[475px] m-4 card-dark rounded-3xl border-transparent hover:border-white hover:border-2 hover:scale-95 hover:cursor-pointer transform transition duration-300 ease-in-out">
        <div class="img h-3/4 rounded-3xl">
          <img id="img-${index}" src="${product.thumbnail}" alt="item" class="object-contain w-full h-full rounded-t-3xl">
        </div>
        <div class="content p-4 h-1/4 flex flex-col justify-between">
          <h2 id=title-${index} class="text-lg font-semibold truncate">${product.title}</h2>
          <p class="text-sm truncate">${product.description}</p>
          <div class="flex justify-between items-center mt-2">
            <span id=price-${index} class="text-lg font-bold">$ ${product.price}</span>
            <div class="no_of_items flex justify-between items-center w-2/5">
              <button id="sub-${index}" class="h-6 w-6 border-2 border-white rounded-md text-center font-bold flex items-center justify-center">-</button>
              <span id="count-${index}" class="text-xl font-bold">0</span>
              <button id="add-${index}" class="h-6 w-6 border-2 border-white rounded-md text-center font-bold flex items-center justify-center">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
}

let allProducts = {};

// Fetch and display data
async function fetchAPIData(limit, skip) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );
    const data = await response.json();

    const itemsContainer = document.querySelector(".items");

    // Render items dynamically
    data.products.forEach((product) => {
      // data.forEach((product) => {
      const itemDOM = document.createElement("div");
      allProducts[product.id] = product;
      itemDOM.innerHTML = buildItem(product);
      itemsContainer.appendChild(itemDOM);
    });
  } catch (e) {
    console.log(e);
  }
}

async function fetchCategories(){
  try{
    fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((categories) =>{
      const categoriesDiv = document.querySelector("#categories"); 
      let firstElement = document.createElement("div");
      firstElement.classList = "flex h-16 w-full items-center justify-center font-bold text-3xl text-white bg-gray-400 rounded-t-lg shadow-lg";
      firstElement.innerHTML = "Categories";
      categoriesDiv.appendChild(firstElement);
      
      
      categories.forEach((category, i) => {
        let element = document.createElement("div");
        element.id = `category-${category.id}`;
        element.classList = `h-12 flex px-4 py-4 items-center rounded-lg  light-light-dark-hover hover:cursor-pointer transition duration-200 ease-in-out`;
        
        // Alternating background colors for better readability
        // element.style.backgroundColor = i % 2 === 0 ? "#2D2D2D" : "bg-red-300";
      
        element.innerHTML = `
          <span class="text-gray-400 mr-4 font-semibold">${i + 1}</span>
          <span class="text-white">${category.name}</span>
        `; 
      
        let hr = document.createElement("hr");
        hr.classList.add("border-gray-600");
        categoriesDiv.appendChild(element);
        categoriesDiv.appendChild(hr);
      });
      
      // Remove the last horizontal line and add margin bottom
      categoriesDiv.removeChild(categoriesDiv.lastChild);
      categoriesDiv.lastElementChild.classList.add("mb-4");
      
    })
  }catch(e){
    console.log(e);
  }
}

// console.log('here all products -', allProducts);
export { fetchAPIData, allProducts,  fetchCategories};
