import { EventEmitter } from "events";
import readline, { Interface } from "readline";

class ChatSystem extends EventEmitter {
  private users: string[];
  private chatHistory: string[];

  constructor() {
    super();
    this.users = [];
    this.chatHistory = [];
  }

  public join(username: string): void {
    this.users.push(username);
    this.emit("user-joined", username);
    this.chatHistory.forEach((msg) => {
      console.log(msg);
    });
  }

  public leave(username: string): void {
    const index = this.users.indexOf(username);
    if (index > -1) {
      this.users.splice(index, 1);
      this.emit("user-left", username);
    }
  }

  public sendMessage(username: string, message: string): void {
    const formattedMessage = `${username}: ${message}`;
    this.chatHistory.push(formattedMessage);
    if (this.chatHistory.length > 10) this.chatHistory.shift();
    this.emit("message", { username, message });
  }

  public listUsers(): void {
    this.emit("list-users", this.users);
  }
}

const chat = new ChatSystem();

chat.on("user-joined", (username: string) => {
  console.log(`${username} joined the chat!`);
});

chat.on("user-left", (username: string) => {
  console.log(`${username} left the chat.`);
});

chat.on("message", (data: { username: string; message: string }) => {
  console.log(`${data.username}: ${data.message}`);
});

chat.on("list-users", (users: string[]) => {
  console.log(`Online Users: ${users.join(", ")}`);
});

const rl: Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "Commands:\n/join [username]\n/leave [username]\n/message [username] [message]\n/list\n"
);
rl.prompt();

rl.on("line", (input: string) => {
  const [command, ...args] = input.split(" ");

  switch (command) {
    case "/join":
      chat.join(args[0]);
      break;
    case "/leave":
      chat.leave(args[0]);
      break;
    case "/message":
      chat.sendMessage(args[0], args.slice(1).join(" "));
      break;
    case "/list":
      chat.listUsers();
      break;
    default:
      console.log("Unknown command!");
  }

  rl.prompt();
});
