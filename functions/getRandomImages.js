const fetch = require("node-fetch");
exports.handler = async function (event, context) {
  return fetch(
    "https://www.wikihow.com/api.php?format=json&action=query&list=random&rnnamespace=0&rnlimit=5"
  )
    .then((articles) => articles.json())
    .then((articles) => {
      return Promise.all(articles["query"]["random"].map(article => {
        return fetch(
          `https://www.wikihow.com/api.php?format=json&action=parse&prop=images&pageid=${article["id"]}`
        )
          .then((image) => image.json())
          .then((image) => {
            image["parse"]["images"].shift();
            return [
              image["parse"]["title"],
              image["parse"]["images"][
                Math.floor(Math.random() * image["parse"]["images"].length)
              ],
            ];
          })
      }))
      .then(images => {
        console.log(images);
        return images;
      })
    })
    .then((images) => ({
      statusCode: 200,
      body: JSON.stringify(images),
    }));
};
