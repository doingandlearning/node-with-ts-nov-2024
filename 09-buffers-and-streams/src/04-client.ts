import net from "node:net";

const client = net.createConnection({ port: 8000, host: "localhost" }, () => {
  client.write(process.argv[2]);
});

client.on("data", (data) => {
  console.log(`From the server: ${data}`);
  process.exit();
});
