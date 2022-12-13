const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarBodySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

CarBodySchema.virtual("url").get(function () {
  return `/catalog/carbody/${this._id}`;
});

module.exports = mongoose.model("CarBody", CarBodySchema);
