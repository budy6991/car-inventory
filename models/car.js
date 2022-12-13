const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true, maxLenght: 120 },
  model: { type: String, required: true, maxLenght: 120 },
  year: { type: Number, min: 1900, max: 2100, required: true },
  description: { type: String, required: true },
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  carBody: { type: Schema.Types.ObjectId, ref: "CarBody" },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
});

// Virtual for Car's URL

CarSchema.virtual("url").get(function () {
  return `/catalog/car/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
