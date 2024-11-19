import express from "express";
import userRoutes from "./routes/user.routes";
const app = express();
const port = process.env.PORT || 3000;

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
