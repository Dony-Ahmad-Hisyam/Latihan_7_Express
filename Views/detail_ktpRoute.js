const express = require("express");
const router = express.Router();
const { getAllDetail_ktpController, getByIdDetail_ktpController, addDetail_ktpController, editDetail_ktpController, deleteDetail_ktpController } = require("../Controllers/detailKtpController.js");

router.get("/api/detail_ktp", getAllDetail_ktpController);
router.get("/api/detail_ktp/:id_detail", getByIdDetail_ktpController);
router.post("/api/detail_ktp/add", addDetail_ktpController);
router.put("/api/detail_ktp/update/:id_detail", editDetail_ktpController);
router.delete("/api/detail_ktp/delete/:id_detail", deleteDetail_ktpController);

module.exports = router;
