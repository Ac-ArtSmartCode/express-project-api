const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  phone: { type: String, default: null },
  images: { type: String, default: null },
  img_url: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
  role: { type: String, default: "user" },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// userSchema.methods.comparePassword = function (plaintext, callback) {
//   return callback(null, Bcrypt.compareSync(plaintext, this.password));
// };

module.exports = mongoose.model("users", userSchema);
