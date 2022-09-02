const mongoose = require("mongoose");
const DataValuesSchema = require("./DataValues");

const ContextAttributesSchema = mongoose.Schema({
  context_attribute_name: {
    type: String,
    required: false,
  },
  context_attribute_description: {
    type: String,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  unit: {
    type: String,
    required: false,
    default: null,
  },
  data_values: [DataValuesSchema],
});

module.exports = ContextAttributesSchema;
