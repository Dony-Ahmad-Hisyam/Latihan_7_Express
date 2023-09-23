const express = require("express");
const router = express.Router();
const { getAllKtpController, getByIdKtpController, addKtpController, editKtpController, deleteKtpController } = require("../Controllers/ktpController.js");

router.get("/api/ktp", getAllKtpController);
router.get("/api/ktp/:nik", getByIdKtpController);
router.post("/api/ktp/add", addKtpController);
router.put("/api/ktp/update/:nik", editKtpController);
router.delete("/api/ktp/delete/:nik", deleteKtpController);

module.exports = router;
