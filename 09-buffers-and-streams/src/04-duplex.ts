import net from "node:net";

const server = net
  .createServer((socket) => {
    socket.on("data", (data) => {
      console.log(data.toString());
      socket.write(`Thanks for that data! ${data}`);
    });
  })
  .listen(8000);
