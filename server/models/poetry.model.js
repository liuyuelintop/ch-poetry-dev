import mongoose from "mongoose";

// 定义诗词Schema
const poetrySchema = new mongoose.Schema({
  author: { type: String, required: true },
  paragraphs: { type: [String], required: true },
  rhythmic: { type: String, required: false }, // 可选，用于宋词
  title: { type: String, required: false }, // 可选，用于唐诗
  like: { type: Number, default: 0 }, // 设置默认值
  dynasty: { type: String, required: true }, // 新增的属性，用于区分朝代
});

// 创建模型
const Poetry = mongoose.model("Poetry", poetrySchema);

export default Poetry;
