const mongoose = require("mongoose"); //חיבור לספריית העבודה מונגו
mongoose.pluralize(null); //מבטל את הרביים

//נגדיר סכמה עבור מוצר
const userSchema = new mongoose.Schema({
  userId: Number,
  fullname: String,
  email: String,
  pass: String,
  phone: String,
});

module.exports = mongoose.mongoose.model("user", userSchema);
