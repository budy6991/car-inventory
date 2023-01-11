const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon"); //for date handling

const CarInstanceSchema = new Schema({
  car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
  authorized_dealer: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "On Loan", "On Repair", "Reserved", "Sold"],
    default: "Available",
  },
  available: { type: Date, default: Date.now },
});

// Virtual for CarInstance's URL

CarInstanceSchema.virtual("url").get(function () {
  return `/catalog/carinstance/${this._id}`;
});

CarInstanceSchema.virtual("date_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.available).toISODate(); //format 'YYYY-MM-DD'
});

module.exports = mongoose.model("CarInstance", CarInstanceSchema);
