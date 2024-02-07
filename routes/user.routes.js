const express = require("express");
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/addUser", addUser);
router.get("/getUsers", getUsers);
router.get("/searchUserByName/:name", searchUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
