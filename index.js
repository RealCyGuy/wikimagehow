let image = document.querySelector(".image");
let loader = document.querySelector(".loader");
let back = document.querySelector(".back");
let next = document.querySelector(".next");
let title = document.querySelector(".title");
let queue = [];
let index = 0;
async function startup() {
  const response = await fetch("/.netlify/functions/getRandomImages");
  const images = await response.json();
  queue = images;
  image.src = queue[0][1];
  loader.remove();
  image.classList.remove("hidden");
  next.disabled = false;
  title.textContent = queue[0][0];
  title.href = "https://wikihow.com/" + queue[0][0];
  title.classList.add("underline");
  new Image().src = queue[1][1];
}
startup();
next.addEventListener("click", async function () {
  next.disabled = true;
  index += 1;
  image.src = queue[index][1];
  title.textContent = queue[index][0];
  title.href = "https://wikihow.com/" + queue[index][0];
  back.disabled = false;
  if (image.complete) {
    next.disabled = false;
  } else {
    image.addEventListener("load", function () {
      next.disabled = false;
    });
  }
  try {
    new Image().src = queue[index + 1][1];
  } catch {
    next.disabled = true;
    const response = await fetch("/.netlify/functions/getRandomImages");
    const images = await response.json();
    console.log(images);
    queue = queue.concat(images);
    next.disabled = false;
  }
});
back.addEventListener("click", function () {
  index -= 1;
  image.src = queue[index][1];
  title.textContent = queue[index][0];
  title.href = "https://wikihow.com/" + queue[index][0];
  if (index === 0) {
    back.disabled = true;
  }
});
