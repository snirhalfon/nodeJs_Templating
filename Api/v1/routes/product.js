const Router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

Router.get("/", getAllProduct);
Router.get("/:id", getProductById);
Router.post("/", addProduct);
Router.patch("/:id", updateProduct);
Router.delete("/:id", deleteProduct);

module.exports = Router;
