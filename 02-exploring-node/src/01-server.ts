// const http = require("node:http"); //
import http from "node:http";
import url from "node:url";
import fs from "node:fs";
// <script>

const hostname = "127.0.0.1";
const port = 3000;
const file = fs.readFileSync("./src/team.txt", "utf-8").split("\n");

const server = http.createServer((req, res) => {
  const parsedRequest = url.parse(req.url!, true);
  const path = parsedRequest.pathname;
  if (path === "/favicon.ico") {
    return;
  }
  res.setHeader("Content-Type", "text/html");
  if (path === "/") {
    handleHomePage(res);
    return;
  } else if (path === "/about") {
    console.log();
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
function handleAboutPage(res: http.ServerResponse, query: { name?: string }) {
  res.statusCode = 200;
  const name = query.name || "human";
  res.write("Welcome to the about page!");
  res.end(`<p>Welcome ${name}!</p>`); // Template literals - f"{}"
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
