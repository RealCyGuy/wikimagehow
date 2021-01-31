const fetch = require("node-fetch");
exports.handler = async function (event, context) {
  return fetch(
    "https://www.wikihow.com/api.php?format=json&action=query&list=random&rnnamespace=0&rnlimit=7"
  )
    .then((articles) => articles.json())
    .then((articles) => {
      return Promise.all(
        articles["query"]["random"].map((article) => {
          return fetch(
            `https://www.wikihow.com/api.php?format=json&action=parse&prop=images&pageid=${article["id"]}`
          )
            .then((image) => image.json())
            .then((image) => {
              image["parse"]["images"].shift();
              random_image =
                image["parse"]["images"][
                  Math.floor(Math.random() * image["parse"]["images"].length)
                ];
              if (random_image == null) {
                return;
              }
              return fetch(
                `https://www.wikihow.com/api.php?format=json&action=query&titles=File:${random_image}&prop=imageinfo&iiprop=url`
              )
                .then((image_link) => image_link.json())
                .then((image_link) => {
                  id = Object.keys(image_link["query"]["pages"])[0];
                  return image_link["query"]["pages"][id]["imageinfo"][0]["url"];
                })
                .then((image_link) => {
                  return [image["parse"]["title"], image_link];
                });
            });
        })
      ).then((images) => {
        return images.filter(Boolean);
      });
    })
    .then((images) => ({
      statusCode: 200,
      body: JSON.stringify(images),
    }));
};
