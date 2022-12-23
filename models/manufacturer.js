const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  headquarters: { type: String, required: true },
  brands: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
});

ManufacturerSchema.virtual("url").get(function () {
  return `/catalog/manufacturer/${this._id}`;
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
