const mongoose = require("mongoose"); //חיבור לספריית העבודה מונגו
mongoose.pluralize(null); //מבטל את הרביים

//נגדיר סכמה עבור מוצר
const CategorySchema = new mongoose.Schema({
  cid: Number,
  pid: Number,
  cname: String,
});

module.exports = mongoose.mongoose.model("category", CategorySchema);
