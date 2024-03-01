const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
