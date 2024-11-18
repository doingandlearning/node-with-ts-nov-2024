// const http = require("node:http"); //
import http from "node:http";
import url from "node:url";
import fs from "node:fs";
// <script>
// dotenv

const hostname = process.argv[2]; // allows us to access CLI arguments!
const port = parseInt(process.env.PORT || "3000"); // requires .env and --env-file
const file = fs.readFileSync("./src/team.txt", "utf-8").split("\n");

const server = http.createServer((req, res) => {
  const parsedRequest = url.parse(req.url!, true);
  const path = parsedRequest.pathname!;

  logRequest(path, parsedRequest.query);
  if (path === "/favicon.ico") {
    return;
  }
  res.setHeader("Content-Type", "text/html");
  if (path === "/") {
    handleHomePage(res);
    return;
  } else if (path === "/about") {
    handleAboutPage(res, parsedRequest.query);
    return;
  } else if (path === "/team") {
    handleTeamPage(res);
    return;
  } else {
    res.statusCode = 404;
    res.end("Page not found");
    return;
  }
});

function handleHomePage(res: http.ServerResponse) {
  res.statusCode = 200;
  res.end("Welcome to the homepage!");
}

interface AboutParams {
  name?: string;
  lang?: string;
}

function handleAboutPage(res: http.ServerResponse, query: AboutParams) {
  res.statusCode = 200;
  const name = query.name || "human";
  const lang = query.lang || "en";
  res.write("Welcome to the about page!");
  res.end(`<p>${welcomeInLang(lang)} ${name}!</p>`); // Template literals - f"{}"
}

interface QueryType {
  [key: string]: string | string[] | undefined;
}

function logRequest(
  route: string,
  query: Record<string, string | string[] | undefined>
) {
  const timestamp = new Date().toISOString();
  const queryString = JSON.stringify(JSON.stringify(query));
  console.log(`[${timestamp}] Route: ${route}, Query: ${queryString}`);
}

function welcomeInLang(lang: string) {
  const langWithCode: Record<string, string> = {
    en: "Welcome",
    es: "Bienvendio",
    fr: "Bienvenue",
    ja: "ようこそ",
    da: "Velkommen",
    de: "Willkommen",
    // ta: "வரவேற்கிறோம்",
    ta: "Vanakkam",
  };
  return langWithCode[lang];
}

function handleTeamPage(res: http.ServerResponse) {
  res.statusCode = 200;

  const [leader, ...others] = file; // ... rest operator
  res.write("<h1>Welcome to the team page!</h1>");
  res.write(`<p>Our team leader is ${leader}.</p>`);
  res.write(`<ul>
			${others.map((name) => `<li>${name}</li>`).join("")}
		</ul>`);
  res.end();
}

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});

// - use command line arguments
// - environment varaibles
