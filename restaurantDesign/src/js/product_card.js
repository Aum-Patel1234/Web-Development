function makeCard(product) {
  // console.log(product);
  return `
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">${product.title}</h1>
            <span class="text-xl px-4 py-1 rounded-lg font-semibold">
                Price - $${product.price}
            </span>
        </div>

        <!-- Product Image and Details -->
        <div class="flex flex-1">
            <!-- Product Image -->
            <div id="cardImages" class="relative w-1/3 flex flex-row h-[400px]">

            </div>

            <!-- Product Details -->
            <div class="w-2/3 px-4 flex flex-col justify-around relative">
                <p class=" mb-2">
                    <span class="font-semibold">Category:</span> ${product.category}
                </p>
                <p class=" mb-2">
                    <span class="font-semibold">Description:</span> ${product.description}
                </p>
                <p class=" mb-2">
                    <span class="font-semibold">Stock:</span> ${product.stock == null ? "No data" : product.stock} Available
                </p>
                <p class=" mb-2">
                    <span class="font-semibold">Rating:</span> ⭐ ${product.rating}/5
                </p>
                <p class=" mb-2">
                    <span class="font-semibold">Warranty:</span> ${product.warrantyInformation}
                </p>
                <p class="">
                    <span class="font-semibold">Shipping:</span> ${product.shippingInformation}
                </p>
            </div>
        </div>

        <div class="mt-4">
            <h2 class="text-lg font-bold">Reviews</h2>
            <ul class="mt-2 space-y-2">
                ${makeReview(product.reviews)}
            </ul>
        </div>

        <!-- Footer Actions -->
        <div class="mt-4 flex justify-end space-x-4"> 
            <button class="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              💸 Discount - ${product.discountPercentage}%
            </button>
            <button id="addToCart-${product.id}" class="bg-white text-black py-2 px-6 rounded-lg font-semibold shadow hover:bg-gray-300">
                Add to Cart
            </button>
        </div>
    `;
}

function makeReview(reviews) {
  // console.log(reviews);
  let str = "";
  for (let review of reviews) {
    str += `
            <li class="light-light-dark p-2 rounded-md">
                <strong>${review.reviewerName}:</strong> ${review.comment} ${"⭐".repeat(review.rating)}
            </li>
        `;
  }
  return str;
}

function scrollCardImages(images) {
  // console.log(images);
  const cardImages = document.querySelector("#cardImages");

  if (images.length == 1) {
    cardImages.innerHTML = `<img src="${images[0]}" alt="img" class="w-full rounded-lg shadow h-[400px] object-contain"/>`;
    return;
  }

  let i = 0; // index to handle index of the images
  const updateImage = () => {
    cardImages.innerHTML = `<img src="${images[i]}" alt="img" class="image-slide w-full rounded-lg shadow h-[400px] object-contain"/>`;

    const img = cardImages.querySelector(".image-slide");

    img.classList.add("slide-in");

    setTimeout(() => {
      img.classList.remove("slide-in");
      img.classList.add("slide-out");
    }, 3000);

    i = (i + 1) % images.length;
  };

  updateImage(); // this is done because setInterval will make the img first time appear after the delay so we have to first time keeep img mannually then setInterval it

  setInterval(updateImage, 3500);
}

export { makeCard, scrollCardImages };
