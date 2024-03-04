const product = require("../models/product"); //חיבור למודל של המוצרים

module.exports = {
  getAllProduct: (req, res) => {
    product.find().then((data) => {
      return res.status(200).json(data);
    });
  },
  getProductById: (req, res) => {
    let pid = req.params.id;
    product.findOne({ pid }).then((data) => {
      return res.status(200).json(data);
    });
  },
  addProduct: (req, res) => {
    let body = req.body;
    product.insertMany([body]).then((data) => {
      return res.status(200).json(data);
    });
  },
  updateProduct: (req, res) => {
    let pid = req.params.id;
    let body = req.body;
    product.updateOne({ pid }, body).then((date) => {
      return res.status(200).json(date);
    });
  },
  deleteProduct: (req, res) => {
    let pid = req.params.id;
    product.deleteOne({ pid }).then((data) => {
      return res.status(200).json(data);
    });
  },
};
