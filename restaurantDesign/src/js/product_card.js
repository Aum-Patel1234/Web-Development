function makeCard(product){
    // console.log(product);
    return `
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">${product.title}</h1>
            <span class="text-teal-800 px-4 py-1 rounded-lg font-semibold">
                $${product.price}
            </span>
        </div>

        <!-- Product Image and Details -->
        <div class="flex flex-1">
            <!-- Product Image -->
            <div class="w-1/3">
                <img src="${product.images[0]}" alt="${product.title}" class="w-full rounded-lg shadow max-h-[450px]" />
            </div>

            <!-- Product Details -->
            <div class="w-2/3 px-4 flex flex-col justify-around">
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
                    <span class="font-semibold">Discount:</span> ${product.discountPercentage}%
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
            <button class="bg-white text-teal-800 py-2 px-6 rounded-lg font-semibold shadow hover:bg-gray-300">
                Add to Cart
            </button>
        </div>
    `;
}

function makeReview(reviews) {
    console.log(reviews);
    let str = '';
    for(let review of reviews){
        str += `
            <li class="bg-teal-700 p-2 rounded-md">
                <strong>${review.reviewerName}:</strong> ${review.comment} ${'⭐'.repeat(review.rating)}
            </li>
        `;
    }
    return str;
}

export default makeCard;
// <!-- Content Inside cardInfo -->
// <div id="productCard" class="p-6 h-full flex flex-col">
//     <!-- Header -->
//     <div class="flex justify-between items-center mb-4">
//         <h1 class="text-2xl font-bold">Strawberry</h1>
//         <span class="text-teal-800 px-4 py-1 rounded-lg font-semibold">
//             $3.99
//         </span>
//     </div>

//     <!-- Product Image and Details -->
//     <div class="flex flex-1">
//         <!-- Product Image -->
//         <div class="w-1/3">
//             <img src="https://cdn.dummyjson.com/products/images/groceries/Strawberry/1.png"
//                 alt="Strawberry" class="w-full h-auto rounded-lg shadow" />
//         </div>

//         <!-- Product Details -->
//         <div class="w-2/3 px-4 flex flex-col justify-around">
//             <p class=" mb-2">
//                 <span class="font-semibold">Category:</span> Groceries
//             </p>
//             <p class=" mb-2">
//                 <span class="font-semibold">Description:</span> Sweet and succulent
//                 strawberries, great for snacking, desserts, or blending into
//                 smoothies.
//             </p>
//             <p class=" mb-2">
//                 <span class="font-semibold">Stock:</span> 9 Available
//             </p>
//             <p class=" mb-2">
//                 <span class="font-semibold">Discount:</span> 19.59%
//             </p>
//             <p class=" mb-2">
//                 <span class="font-semibold">Rating:</span> ⭐ 4.5/5
//             </p>
//             <p class=" mb-2">
//                 <span class="font-semibold">Warranty:</span> 1 year warranty
//             </p>
//             <p class="">
//                 <span class="font-semibold">Shipping:</span> Ships in 1 week
//             </p>
//         </div>
//     </div>

//     <!-- Reviews Section -->
//     <div class="mt-4">
//         <h2 class="text-lg font-bold">Reviews</h2>
//         <ul class="mt-2 space-y-2">
//             <li class="bg-teal-700 p-2 rounded-md">
//                 <strong>Charlotte Lopez:</strong> Highly recommended! ⭐⭐⭐⭐⭐
//             </li>
//             <li class="bg-teal-700 p-2 rounded-md">
//                 <strong>Grace Green:</strong> Great product! ⭐⭐⭐⭐⭐
//             </li>
//             <li class="bg-teal-700 p-2 rounded-md">
//                 <strong>Logan Torres:</strong> Disappointing product! ⭐
//             </li>
//         </ul>
//     </div>

//     <!-- Footer Actions -->
//     <div class="mt-4 flex justify-end space-x-4">
//         <button
//             class="bg-white text-teal-800 py-2 px-6 rounded-lg font-semibold shadow hover:bg-gray-300">
//             Add to Cart
//         </button>
//         <button
//             class="bg-teal-600 py-2 px-6 rounded-lg font-semibold shadow hover:bg-teal-700">
//             Buy Now
//         </button>
//     </div>
// </div>