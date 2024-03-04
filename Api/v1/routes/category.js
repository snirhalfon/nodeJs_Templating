const Router = require("express").Router();
const session = require("../middlewares/authSession");
const {
  getAllCategory,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

Router.get("/", getAllCategory);
Router.get("/:id", getCategoryById);
Router.post("/", session, addCategory);
Router.patch("/:id", session, updateCategory);
Router.delete("/:id", session, deleteCategory);

module.exports = Router;
