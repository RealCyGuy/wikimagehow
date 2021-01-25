const fetch = require("node-fetch");
exports.handler = async function (event, context) {
  fetch(
    "https://www.wikihow.com/api.php?format=json&action=query&list=random&rnnamespace=0&rnlimit=5"
  )
    .then((articles) => articles.json())
    .then((articles) => {
      articles["query"]["random"].forEach((article) => {
        fetch(
          `https://www.wikihow.com/api.php?format=json&action=parse&prop=images&pageid=${article["id"]}`
        )
          .then((image) => image.json())
          .then((image) => {
            images.push([
              image["parse"]["title"],
              image["parse"]["images"][
                Math.floor(Math.random() * image["parse"]["images"].length)
              ],
            ]);
          })
      });
    });
  return {
    statusCode: 200,
    body: JSON.stringify(images),
  };
};
