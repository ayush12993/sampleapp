// const { express } = require("express");

const express = require("express");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/forgotPasswordController.js");

const router = express.Router();
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
