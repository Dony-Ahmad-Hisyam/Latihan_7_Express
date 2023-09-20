const connection = require("../Models/Config/db");
const { body, validationResult } = require("express-validator");

const addKtpController = [
  body("nama_lengkap").notEmpty(),
  body("jenis_kelamin").notEmpty().isIn(["Laki-laki", "Perempuan"]),
  body("tempat_lahir").notEmpty(),
  body("tanggal_lahir").notEmpty(),
  body("agama").notEmpty().isIn(["Islam", "Kristen"]),
  body("pendidikan").notEmpty(),
  body("jenis_pekerjaan").notEmpty(),
  body("golongan_darah").notEmpty(),
  body("kewarganegaraan").notEmpty(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      agama: req.body.agama,
      pendidikan: req.body.pendidikan,
      jenis_pekerjaan: req.body.jenis_pekerjaan,
      golongan_darah: req.body.golongan_darah,
      kewarganegaraan: req.body.kewarganegaraan,
    };

    connection.query("INSERT INTO ktp SET ?", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Sukses..!",
          data: rows[0],
        });
      }
    });
  },
];

module.exports = { addKtpController };
