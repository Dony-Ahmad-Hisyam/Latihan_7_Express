const connection = require("../Models/Config/db");
const { body, validationResult } = require("express-validator");

const getAllKtpController = (req, res) => {
  connection.query("SELECT * FROM ktp", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,  
        message: "Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Sukses..!",
        data: rows,
      });
    }
  });
};

const addKtpController = [
  body("nik").notEmpty(),
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
      nik: req.body.nik,
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
const getByIdKtpController = (req, res) => {
  const ktpNik = req.params.nik; // Ambil nik dari parameter URL
  connection.query("SELECT * FROM ktp WHERE nik = ?", [ktpNik], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Error",
      });
    } else {
      if (rows.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Data not found",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Sukses..!",
          data: rows[0],
        });
      }
    }
  });
};

const editKtpController = [
  body("nik").notEmpty(),
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

    const ktpNik = req.params.nik;
    const data = {
      nik: req.body.nik,
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

    connection.query("UPDATE ktp SET ? WHERE nik = ?", [data, ktpNik], (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Sukses..!",
          data: rows[0],
        });
      }
    });
  },
];

const deleteKtpController = (req, res) => {
  const ktpNik = req.params.nik; //
  connection.query("DELETE FROM ktp WHERE nik = ?", [ktpNik], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data deleted successfully",
      });
    }
  });
};

module.exports = {
  getAllKtpController,
  getByIdKtpController,
  addKtpController,
  editKtpController,
  deleteKtpController,
};
