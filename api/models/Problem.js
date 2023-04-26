const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    level: String,
    submission: String,
    link : String
  },
);

module.exports = mongoose.model("Problem", ProblemSchema);