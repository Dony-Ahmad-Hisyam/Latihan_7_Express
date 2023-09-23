const express = require("express");
const router = express.Router();
const { getAllKKController, getByIdKKController, addKKController, editKKController, deleteKKController } = require("../Controllers/kkController.js");

router.get("/api/kk", getAllKKController);
router.get("/api/kk/:no_kk", getByIdKKController);
router.post("/api/kk/add", addKKController);
router.put("/api/kk/update/:no_kk", editKKController);
router.delete("/api/kk/delete/:no_kk", deleteKKController);

module.exports = router;
