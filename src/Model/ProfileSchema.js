const { Schema, models, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    coverImage_id: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    profileImage_id: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    businessStatus: {
      type: String,
      default: false,
    },
    availability: {
      type: String,
      default: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = models.Profile || model("Profile", ProfileSchema);
