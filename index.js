console.log("hi");

function getImage() {
  fetch(
    "https://www.wikihow.com/api.php?format=json&action=query&list=random&rnnamespace=0&rnlimit=1"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
