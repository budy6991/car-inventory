const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
});

BrandSchema.virtual("url").get(function () {
  return `/catalog/brand/${this._id}`;
});

module.exports = mongoose.model("Brand", BrandSchema);
