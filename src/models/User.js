const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Required username"],
      unique: [true, "Required unique username"],
    },
    email: {
      type: String,
      required: [true, "Required username"],
      unique: [true, "Required unique username"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: [true, "Required username"],
      trim: true,
    },
    roles: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { versionKey: false }
);

userSchema.set("toJSON", {
  transform: (returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

module.exports = model("User", userSchema);
