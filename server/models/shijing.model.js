import mongoose from "mongoose";

// 定义诗经Schema
const shijingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  chapter: { type: String, required: true },
  section: { type: String, required: true },
  content: { type: [String], required: true },
  like: { type: Number, default: 0 },
});

// 创建模型
const Shijing = mongoose.model("Shijing", shijingSchema);

export default Shijing;
