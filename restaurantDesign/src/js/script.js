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

const searchElement = document.querySelector("#search");

async function search(query, limit = 12, skip = 0) {
  console.log(query);

  // Show loading message
  const itemsContainer = document.querySelector(".items");
  itemsContainer.innerHTML = "<p>Loading...</p>";

  const showMore = document.querySelector("#showMore");
  if (showMore.classList.contains("hidden")) {
    showMore.classList.remove("hidden");
  }

  await fetch(
    `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`,
  )
    .then((res) => res.json())
    .then((data) => {
      // Clear previous search results
      itemsContainer.innerHTML = "";

      // Append new results and every line of code is very I M P O R T A N T
      if (data.products.length === 0) {
        itemsContainer.innerHTML = `<div class="w-full h-full flex justify-center items-center">No results found.</div>`;
        itemsContainer.classList.remove("grid");
        showMore.classList.add("hidden");
      } else {
        itemsContainer.classList.add("grid");
        data.products.forEach((product) => {
          const itemDOM = document.createElement("div");
          allProducts[product.id] = product;
          itemDOM.innerHTML = buildItem(product);
          itemsContainer.appendChild(itemDOM);
        });
      }
    });
}

searchElement.addEventListener(
  "input",
  debounce(() => search(searchElement.value, 12, 0)),
);

// Call the fetchData function to load items
async function getData() {
  await fetchAPIData(20, 0);
}

getData();

const cardInfo = document.getElementById("cardInfo");
function showCardInfo(product) {
  document.querySelector("#productCard").innerHTML = makeCard(product);
  scrollCardImages(product.images);
  cardInfo.classList.remove("hidden", "pointer-events-none");
  cardInfo.classList.add("pointer-events-auto");
  // console.log(product);
}

function hideCardInfo() {
  cardInfo.classList.add("hidden", "pointer-events-none");
  cardInfo.classList.remove("pointer-events-auto");
}

// Event delegation for add and subtract buttons
document.querySelector("#globalEventListner").addEventListener("click", async (event) => {
  const target = event.target;
  const idParts = target.id.split("-");
  // console.log("clicked",target);

  if (idParts.length !== 2) {
    // error occurs when other things are clicked and the event below occurs
    if (target.id == "showMore") {
      console.log("clicked");
      let items = document.querySelector(".items");
      const showMore = document.querySelector("#search");

      if (showMore.value != "") {
        await search(
          document.querySelector("#search").value,
          12,
          items.childNodes.length,
        );
      } else {
        await fetchAPIData(12, items.childNodes.length);
      }
    }
    if (target.id == "categoriesBtn") {
      const categories = document.querySelector("#categories");
      categories.classList.toggle("left-sliderOut");
      fetchCategories();
    }else{
      if (document.querySelector("#categories")?.classList.contains("left-sliderOut")) {
        document.querySelector("#categories").classList.remove("left-sliderOut");
      }
    }
    if (!target.id.includes("cardInfo")) {
      hideCardInfo();
    }

    return; // I M P O R T A N T
  }

  const action = idParts[0];
  const index = idParts[1];
  const countDisplay = document.querySelector(`#count-${index}`);
  let currentCount = parseInt(countDisplay.textContent);

  if (action === "add" || action === "addToCart") {
    currentCount += 1;
  } else if (action === "sub" && currentCount > 0) {
    currentCount -= 1;
  } else if (action === "title" || action === "img") {
    showCardInfo(allProducts[index]);
  } else {
    if(action == "deleteBillComponent"){
      console.log('here',action)
      document.querySelector(`#bill-component-${index}`).remove();
      document.querySelector(`#count-${index}`).textContent = 0;
      calculateBill();
      updateCartIndex();
    }
    return;
  }

  countDisplay.textContent = currentCount; // display the count

  const productTitle = document.querySelector(`#item-${index} #title-${index}`,).textContent;
  // console.log(productTitle)
  updateCart(index, currentCount, productTitle, allProducts[index].price);

  // Show or hide the bill container
  if (document.querySelector("#top").children.length > 0) {
    document.querySelector("#bottom").classList.remove("invisible");
  } else {
    document.querySelector("#bottom").classList.add("invisible");
  }

  calculateBill();
});

// Add Categories to the website

// Final purchase event
document.querySelector("#buy").addEventListener("click", () => {
  alert("Thank you for your purchase!");
  location.reload();
});
