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

async function run() {
  const userString = await fs.readFile("user.json", "utf-8");

  const [regionsString, newsString] = await Promise.all([
    fs.readFile("regions.json", "utf-8"),
    fs.readFile("news.json", "utf-8"),
  ]);
  // const newsString = await

  const user = JSON.parse(userString);
  const regions = JSON.parse(regionsString);
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
}

run();
