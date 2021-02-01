let image = document.querySelector("img");
let loader = document.querySelector("svg");
let queue = [];
let index = 0
async function startup() {
  const response = await fetch("/.netlify/functions/getRandomImages");
  const images = await response.json();
  queue = images;
  image.src = queue[0][1];
  loader.remove();
  image.classList.remove("hidden");
}
startup();
