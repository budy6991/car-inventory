const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarInstanceSchema = new Schema({
  car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
  authorized_dealer: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "On loan", "On Repair", "Reserved", "Sold"],
    default: "Available",
  },
  available: { type: Date, default: Date.now },
});

// Virtual for CarInstance's URL

CarInstanceSchema.virtual("url").get(function () {
  return `/catalog/carinstance/${this._id}`;
});

module.exports = mongoose.model("CarInstance", CarInstanceSchema);
