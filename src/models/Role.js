const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Required unique name"],
      require: [true, "Required name"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Role", roleSchema);
