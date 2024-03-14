const express = require("express");

const { register, login, forgotPassword, resetPassword } = require("../controllers/auth");

// const { { getUser } } = require("../controllers/userController.js";
const { requireAuth } = require("../middlewares/requireAuth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgetPassword",forgotPassword);
router.post("/resetPassword",resetPassword);
// router.get("/getuser", requireAuth, getUser);

module.exports = router;
