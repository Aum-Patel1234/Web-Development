"use strict";

export function buildItem(product) {
  const index = product.id;

  return `
      <div id="item-${index}" class="h-[475px] m-4 bg-cyan-800 rounded-3xl border-transparent hover:border-white hover:border-2 hover:scale-95 hover:cursor-pointer transform transition duration-300 ease-in-out">
        <div class="img h-3/4 rounded-3xl">
          <img id="img-${index}" src="${product.thumbnail}" alt="item" class="object-contain w-full h-full rounded-t-3xl">
        </div>
        <div class="content p-4 h-1/4 flex flex-col justify-between">
          <h2 id=title-${index} class="text-lg font-semibold">${product.title}</h2>
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

    const datad = [
      {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        stock: 5,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "RCH45Q1A",
        weight: 2,
        dimensions: {
          width: 23.17,
          height: 14.43,
          depth: 28.01,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "Low Stock",
        reviews: [
          {
            rating: 2,
            comment: "Very unhappy with my purchase!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "John Doe",
            reviewerEmail: "john.doe@x.dummyjson.com",
          },
          {
            rating: 2,
            comment: "Not as described!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Nolan Gonzalez",
            reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Very satisfied!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Scarlett Wright",
            reviewerEmail: "scarlett.wright@x.dummyjson.com",
          },
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 24,
        meta: {
          createdAt: "2024-05-23T08:56:21.618Z",
          updatedAt: "2024-05-23T08:56:21.618Z",
          barcode: "9164035109868",
          qrCode: "https://assets.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      },
      {
        id: 2,
        title: "Eyeshadow Palette with Mirror",
        description:
          "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
        category: "beauty",
        price: 19.99,
        discountPercentage: 5.5,
        rating: 3.28,
        stock: 44,
        tags: ["beauty", "eyeshadow"],
        brand: "Glamour Beauty",
        sku: "MVCFH27F",
        weight: 3,
        dimensions: {
          width: 12.42,
          height: 8.63,
          depth: 29.13,
        },
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships in 2 weeks",
        availabilityStatus: "In Stock",
        reviews: [
          {
            rating: 4,
            comment: "Very satisfied!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Liam Garcia",
            reviewerEmail: "liam.garcia@x.dummyjson.com",
          },
          {
            rating: 1,
            comment: "Very disappointed!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Nora Russell",
            reviewerEmquerySelectorail: "nora.russell@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Highly impressed!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Elena Baker",
            reviewerEmail: "elena.baker@x.dummyjson.com",
          },
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 32,
        meta: {
          createdAt: "2024-05-23T08:56:21.618Z",
          updatedAt: "2024-05-23T08:56:21.618Z",
          barcode: "2817839095220",
          qrCode: "https://assets.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
      },
    ];

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
// console.log('here all products -', allProducts);
export { fetchAPIData, allProducts };
