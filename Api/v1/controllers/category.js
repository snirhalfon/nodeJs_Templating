const Category = require("../models/category"); //חיבור למודל של המוצרים
module.exports = {
  getAllCategory: (req, res) => {
    Category.find().then((data) => {
      return res.status(200).json(data);
    });
  },
  getCategoryById: (req, res) => {
    let cid = req.params.id;
    Category.findOne({ cid }).then((data) => {
      return res.status(200).json(data);
    });
  },
  addCategory: (req, res) => {
    let body = req.body;
    Category.insertMany([body]).then((data) => {
      return res.status(200).json(data);
    });
  },
  updateCategory: (req, res) => {
    let cid = req.params.id;
    let body = req.body;
    Category.updateOne({ cid }, body).then((date) => {
      return res.status(200).json(date);
    });
  },
  deleteCategory: (req, res) => {
    let cid = req.params.id;
    Category.deleteOne({ cid }).then((data) => {
      return res.status(200).json(data);
    });
  },
};
