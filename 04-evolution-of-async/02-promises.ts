import fs from "node:fs/promises";

type User = {
  name: string;
  age: number;
  region: string;
};

type Regions = Record<string, string[]>;

type News = {
  id: string;
  headline: string;
  content: string;
}[];

// How do you describe a JS promise?
// comes back always - response!

// pending (can now cancelled with the AbortController) - waiter skivs off!
// settled - resolved ✅ food is delivered!
//         - rejected 🙅 the kitchen is out of the food!

// new Promise((resolve, reject) => {
//   // do some work! if goes badly?
//   reject("It went badly - sad face!");

//   // it went well
//   resolve("Here's the data you wanted!");
// })
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

// this is what is happening under hood!
// function promiseReadFile(filename: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, "utf-8", (error, data) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(data);
//     });
//   });
// }

let user: User;
let allNews: News;
let regions: Regions;

fs.readFile("user.json", "utf-8")
  .then((data) => {
    user = JSON.parse(data);
    return fs.readFile("regions.json", "utf-8");
  })
  .then((data) => {
    regions = JSON.parse(data);
    return fs.readFile("news.json", "utf-8");
  })
  .then((data) => {
    allNews = JSON.parse(data);
    const userRegionNewsIds = regions[user.region];
    const userNews = allNews.filter((article) =>
      userRegionNewsIds.includes(article.id)
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("-----");
    });
  });

Promise.all([
  fs.readFile("user.json", "utf-8"),
  fs.readFile("regions.json", "utf-8"),
  fs.readFile("news.json", "utf-8"),
])
  .then(([userString, regionString, newsString]) => {
    const user = JSON.parse(userString);
    const regions = JSON.parse(regionString);
    const allNews = JSON.parse(newsString);
    const userRegionNewsIds = regions[user.region];
    const userNews = allNews.filter((article) =>
      userRegionNewsIds.includes(article.id)
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("-----");
    });
  })
  .catch((error) => console.log(error));

Promise.allSettled([
  fs.readFile("user.json", "utf-8"),
  fs.readFile("regions.json", "utf-8"),
  fs.readFile("news.json", "utf-8"),
])
  .then(([userResponse, regionResponse, newsResponse]) => {
    const user =
      userResponse.status === "fulfilled"
        ? JSON.parse(userResponse.value)
        : { region: "Scotland" };

    const regions =
      regionResponse.status === "fulfilled"
        ? JSON.parse(regionResponse.value)
        : { Scotland: ["news1"] };

    const allNews =
      newsResponse.status === "fulfilled"
        ? JSON.parse(newsResponse.value)
        : [
            {
              id: "news1",
              headline: "Something has gone wrong.",
              content: "Please reload.",
            },
          ];

    const userRegionNewsIds = regions[user.region];
    const userNews = allNews.filter((article) =>
      userRegionNewsIds.includes(article.id)
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("-----");
    });
  })
  .catch((error) => console.log(error));
