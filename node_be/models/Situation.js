const mongoose = require("mongoose");
const ContextAttributesSchema = require("./ContextAttributes");

const SituationSchema = mongoose.Schema({
  situation_name: {
    type: String,
    required: false,
  },
  situation_description: {
    type: String,
    required: false,
  },
  application_description: {
    type: String,
    required: false,
  },
  application_name: {
    type: String,
    required: false,
  },
  fuzzy_selection: {
    type: Object,
    required: false,
  },
  fuzzy_rules: {
    type: Array,
    required: false,
  },
  weather: { type: Object, required: false },
  // context_attributes: [ContextAttributesSchema],
});

module.exports = mongoose.model("Situations", SituationSchema);
