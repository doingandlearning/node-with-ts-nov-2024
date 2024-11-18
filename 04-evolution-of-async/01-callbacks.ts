import fs from "node:fs";

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

// callback hell!
fs.readFile("user.json", "utf-8", (error: Error | null, userString) => {
  if (error) {
    console.log(error);
    return;
  }
  const user: User = JSON.parse(userString);
  fs.readFile("regions.json", "utf-8", (error: Error | null, regionString) => {
    if (error) {
      console.log(error);
      return;
    }
    const regions: Regions = JSON.parse(regionString);
    fs.readFile("news.json", "utf-8", (error: Error | null, newsString) => {
      if (error) {
        console.log(error);
        return;
      }
      const allNews: News = JSON.parse(newsString);
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
  });
});
