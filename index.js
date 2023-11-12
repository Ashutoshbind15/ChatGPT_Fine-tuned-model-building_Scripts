import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db.js";

await connectDB();
const app = express();

import videoRoutes from "./routes/video.js";
import userRoutes from "./routes/auth.js";

app.use("/video", videoRoutes);
app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
