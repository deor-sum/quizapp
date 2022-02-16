const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: [
      {
        type: String,
      },
    ],
    correct_answer: {
      type: String,
      required: true,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = Question = mongoose.model("question", QuestionSchema);
