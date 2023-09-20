const express = require("express");
const router = express.Router();
const { addKtpController } = require("../Controllers/ktpController");

router.post("/api/add-ktp", addKtpController);

module.exports = router;
