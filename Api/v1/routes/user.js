const Router = require("express").Router();

const {
  getAllUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  register,
  login,
} = require("../controllers/user");
Router.post("/register", register); //נקודת קצה עבור הרשמה

Router.post("/login", login);
Router.get("/", getAllUser);
Router.get("/:id", getUserById);
Router.post("/", addUser);
Router.patch("/:id", updateUser);
Router.delete("/:id", deleteUser);

module.exports = Router;
