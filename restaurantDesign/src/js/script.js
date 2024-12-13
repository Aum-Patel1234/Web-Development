"use strict";

import { fetchAPIData, allProducts, fetchCategories } from "./service.js";
import { calculateBill, updateCart, updateCartIndex } from "./events.js";
import { buildItem } from "./service.js";
import { makeCard, scrollCardImages } from "./product_card.js";

function debounce(callBackfn) {
  let timeout;

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callBackfn(...args);
    }, 750);
  };
}

let currentDataLink = "https://dummyjson.com/products"; // Default to full URL

const searchElement = document.querySelector("#search");

async function search(query, limit = 12, skip = 0) {
  const itemsContainer = document.querySelector(".items");

  if(query == ""){
    itemsContainer.innerHTML = "";
    fetchAPIData(20,0,`https://dummyjson.com/products/`);
    currentDataLink = "https://dummyjson.com/products"; 
    itemsContainer.classList.add("grid");
    return;
  }

  // Update state and handle UI
  if (currentDataLink !== `https://dummyjson.com/products/search?q=${query}`) {
    itemsContainer.innerHTML = "<p>Loading...</p>";
  }

  const showMore = document.querySelector("#showMore");
  if (showMore.classList.contains("hidden")) {
    showMore.classList.remove("hidden");
  }

  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    // console.log(`https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`)

    // Clear previous results if necessary
    if (currentDataLink !== `https://dummyjson.com/products/search?q=${query}`) {
      itemsContainer.innerHTML = "";
    }

    if (data.products.length === 0) {
      itemsContainer.innerHTML = `<div class=\"w-full h-full flex justify-center items-center\">No results found.</div>`;
      itemsContainer.classList.remove("grid");
      showMore.classList.add("hidden");
      currentDataLink = "https://dummyjson.com/products/noResults";
    } else {
      if (currentDataLink === "https://dummyjson.com/products/noResults") {
        itemsContainer.innerHTML = "";
      }
      itemsContainer.classList.add("grid");
      data.products.forEach((product) => {
        const itemDOM = document.createElement("div");
        allProducts[product.id] = product;
        itemDOM.innerHTML = buildItem(product);
        itemsContainer.appendChild(itemDOM);
      });
      currentDataLink = `https://dummyjson.com/products/search?q=${query}`;
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    itemsContainer.innerHTML = "<p>Error loading results. Please try again.</p>";
  }
}

searchElement.addEventListener(
  "input",
  debounce(() => search(searchElement.value, 12, 0))
);

async function getAllProducts() {
  await fetchAPIData(20, 0, "https://dummyjson.com/products");
  currentDataLink = "https://dummyjson.com/products";
}
getAllProducts();

const cardInfo = document.getElementById("cardInfo");
function showCardInfo(product) {
  document.querySelector("#productCard").innerHTML = makeCard(product);
  scrollCardImages(product.images);
  cardInfo.classList.remove("hidden", "pointer-events-none");
  cardInfo.classList.add("pointer-events-auto");
}

function hideCardInfo() {
  cardInfo.classList.add("hidden", "pointer-events-none");
  cardInfo.classList.remove("pointer-events-auto");
}

document.querySelector("#globalEventListner").addEventListener("click", async (event) => {
  const target = event.target;
  const idParts = target.id.split("-");

  if (idParts.length < 2) {
    if (target.id === "showMore") {
      const items = document.querySelector(".items");
      if (searchElement.value !== "") {
        await search(searchElement.value, 12, items.childNodes.length);
      } else {
        const link = currentDataLink;
        await fetchAPIData(12, items.childNodes.length, link);
      }
    }

    if (target.id === "categoriesBtn") {
      const categories = document.querySelector("#categories");
      categories.classList.toggle("left-sliderOut");
      fetchCategories();
    } else if (
      document.querySelector("#categories")?.classList.contains("left-sliderOut")
    ) {
      document.querySelector("#categories").classList.remove("left-sliderOut");
    }

    if (!target.id.includes("cardInfo")) {
      hideCardInfo();
    }

    return;
  }

  const action = idParts[0];
  const index = idParts[1];

  if (action === "deleteBillComponent") {
    document.querySelector(`#bill-component-${index}`).remove();
    document.querySelector(`#count-${index}`).textContent = 0;
    calculateBill();
    updateCartIndex();
    return;
  } else if (action === "category") {
    const itemsContainer = document.querySelector(".items");
    itemsContainer.innerHTML = "";
    const link = `https://dummyjson.com/products/category/${target.id.slice(9)}`;
    fetchAPIData(12, itemsContainer.children.length, link);
    currentDataLink = link;
    return;
  }

  const countDisplay = document.querySelector(`#count-${index}`);
  let currentCount = parseInt(countDisplay.textContent);

  if (action === "add" || action === "addToCart") {
    currentCount += 1;
  } else if (action === "sub" && currentCount > 0) {
    currentCount -= 1;
  } else if (action === "title" || action === "img") {
    showCardInfo(allProducts[index]);
  }

  countDisplay.textContent = currentCount;

  const productTitle = document.querySelector(
    `#item-${index} #title-${index}`
  ).textContent;
  updateCart(index, currentCount, productTitle, allProducts[index].price);

  if (document.querySelector("#top").children.length > 0) {
    document.querySelector("#bottom").classList.remove("invisible");
  } else {
    document.querySelector("#bottom").classList.add("invisible");
  }

  calculateBill();
});

document.querySelector("#buy").addEventListener("click", () => {
  alert("Thank you for your purchase!");
  location.reload();
});
