const mongoose = require("mongoose");

const DataValuesSchema = mongoose.Schema({
  range_type: {
    type: String,
    required: false,
  },
  range_values: {
    lower_bound: { type: Number },
    higher_bound: { type: Number },
    multiple_values: { type: Array },
  },
  contribution: {
    type: Number,
    required: false,
  },
});

module.exports = DataValuesSchema;
