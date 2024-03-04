const mongoose = require("mongoose"); //חיבור לספריית העבודה מונגו
mongoose.pluralize(null); //מבטל את הרביים

//נגדיר סכמה עבור מוצר
const productSchema = new mongoose.Schema({
  cid: Number,
  pid: Number,
  pname: String,
  price: Number,
});

module.exports = mongoose.mongoose.model("product", productSchema);
