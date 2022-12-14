const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true, maxLenght: 120 },
  model: { type: String, required: true, maxLenght: 120 },
  year: { type: Number, min: 1900, max: 2100, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  car_body: { type: Schema.Types.ObjectId, ref: "CarBody" },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
});

// Virtual for Car's full model name

CarSchema.virtual("fullModelName").get(function () {
  let fullModelName = `${this.name} ${this.model}, ${this.year}, (${this.car_body})`;
});

// Virtual for Car's URL

CarSchema.virtual("url").get(function () {
  return `/catalog/car/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
