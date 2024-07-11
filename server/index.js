import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import poetryRoutes from "./routes/poetry.route.js";
import shijingRoutes from "./routes/shijing.route.js";
import searchRoutes from "./routes/search.route.js"; // 确保路径正确
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173", // 允许的前端地址
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// 中间件
app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// 路由
app.use("/api/poems", poetryRoutes);
app.use("/api/shijing", shijingRoutes);
app.use("/api/search", searchRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
