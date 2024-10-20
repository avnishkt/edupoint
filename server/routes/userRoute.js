const express = require("express");
const { createUser, loginUser, logoutUser, deleteUser, updateUser } = require("../controllers/user");
const authenticateJWT = require("../midleware/authenticate");
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/logout", authenticateJWT, logoutUser);

router.put("/update/:userId", authenticateJWT, updateUser);

module.exports = router;
