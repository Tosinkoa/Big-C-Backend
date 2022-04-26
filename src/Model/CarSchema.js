const { Schema, model, models } = require("mongoose");

const CarSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    carImage: {
      type: String,
    },
    CarImage_id: {
      type: String,
    },
    carName: {
      type: String,
      require: true,
    },
    carPrice: {
      type: Number,
      require: true,
    },
    carDescription: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = models.Car || model("Car", CarSchema);
