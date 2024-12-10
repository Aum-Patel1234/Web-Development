"use strict";

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
searchElement.addEventListener(
  "input",
  debounce(async () => {
    console.log(searchElement.value);
    await fetch(
      `https://dummyjson.com/products/search?q=${searchElement.value}`,
    )
      .then((res) => res.json())
      .then(console.log);
  }),
);
