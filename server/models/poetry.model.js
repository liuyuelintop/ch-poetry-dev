import mongoose from "mongoose";

// 定义诗词Schema
const poetrySchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    paragraphs: { type: [String], required: true },
    rhythmic: { type: String, required: false }, // 可选，用于宋词
    title: { type: String, required: false }, // 可选，用于唐诗
    like: { type: Number, default: 0 }, // 设置默认值
    dynasty: {
      type: String,
      required: true,
      enum: ["tang", "song"], // 仅允许'tang'或'song'
      message: "{VALUE} is not a valid dynasty",
    },
  },
  { timestamps: true }
); // 增加时间戳

// 创建索引以优化查询
poetrySchema.index({ dynasty: 1 });

const Poetry = mongoose.model("Poetry", poetrySchema);

export default Poetry;
