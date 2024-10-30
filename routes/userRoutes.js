// const express = require("express");
// const {
//   getAllUsers,
//   signup,
//   login,
// } = require("../Controllers/userController");

// const router = express.Router();

// router.get("/", getAllUsers);
// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;

const express = require("express");
const {
  getAllUsers,
  getUser,
  signup,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/users").get(getAllUsers).post(signup);

router
  .route("/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

router.post("/users/login", login);

module.exports = router;
