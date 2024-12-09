import { fetchAPIData,allProducts }  from "./service.js";
import { calculateBill, updateCart } from "./events.js";
import makeCard from "./product_card.js";

// Call the fetchData function to load items
async function getData(){
  await fetchAPIData(21, 0);
}

getData();

const cardInfo = document.getElementById("cardInfo");
function showCardInfo(product) {
    document.querySelector("#productCard").innerHTML = makeCard(product);
    cardInfo.classList.remove("hidden", "pointer-events-none");
    cardInfo.classList.add("pointer-events-auto");
    console.log(product);
}

function hideCardInfo() {
    cardInfo.classList.add("hidden", "pointer-events-none");
    cardInfo.classList.remove("pointer-events-auto");
}

// Event delegation for add and subtract buttons
document.querySelector("#globalEventListner").addEventListener("click", async(event) => {
  const target = event.target;
  const idParts = target.id.split("-");
  // console.log("clicked",target);

  if (idParts.length !== 2){              // error occurs when other things are clicked and the event below occurs
    if(target.id == "showMore"){
      console.log("clicked");
      let items = document.querySelector(".items");

      await fetchAPIData(15,items.childNodes.length);
    }
    if(!target.id.includes('cardInfo')){
      hideCardInfo();
    }

    return;                             // I M P O R T A N T
  }      

  const action = idParts[0];
  const index = idParts[1];
  const countDisplay = document.querySelector(`#count-${index}`);
  let currentCount = parseInt(countDisplay.textContent, 10);

  if (action === "add") {
    currentCount += 1;
  } else if (action === "sub" && currentCount > 0) {
    currentCount -= 1;
  } else if(action === "title" || action === "img"){
    showCardInfo(allProducts[index]);
  } else {
    return;
  }

  countDisplay.textContent = currentCount;      // display the count 

  const productTitle = document.querySelector(`#item-${index} #title-${index}`).textContent;       
  // console.log(productTitle)
  updateCart(index, currentCount, productTitle);

  // Show or hide the bill container
  if (document.querySelector("#top").children.length > 0) {
    document.querySelector("#bottom").classList.remove("invisible");
  } else {
    document.querySelector("#bottom").classList.add("invisible");
  }

  calculateBill();
});

// Final purchase event
document.querySelector("#buy").addEventListener("click", () => {
  alert("Thank you for your purchase!");
  location.reload();
});