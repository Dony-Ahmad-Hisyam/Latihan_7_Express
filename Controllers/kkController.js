const connection = require("../Models/Config/db");
const { body, validationResult } = require("express-validator");

const getAllKKController = (req, res) => {
  connection.query("SELECT * FROM kartu_keluarga", (err, rows) => {
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

const addKKController = [
  body("no_kk").notEmpty(),
  body("alamat").notEmpty(),
  body("rt").notEmpty(),
  body("rw").notEmpty(),
  body("kode_pos").notEmpty(),
  body("desa_kelurahan").notEmpty(),
  body("kecamatan").notEmpty(),
  body("kabupaten_kota").notEmpty(),
  body("provinsi").notEmpty(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      no_kk: req.body.no_kk,
      alamat: req.body.alamat,
      rt: req.body.rt,
      rw: req.body.rw,
      kode_pos: req.body.kode_pos,
      desa_kelurahan: req.body.desa_kelurahan,
      kecamatan: req.body.kecamatan,
      kabupaten_kota: req.body.kabupaten_kota,
      provinsi: req.body.provinsi,
    };

    connection.query("INSERT INTO kartu_keluarga SET ?", data, (err, rows) => {
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

const getByIdKKController = (req, res) => {
  const kkNo_kk = req.params.no_kk; // Ambil nik dari parameter URL
  connection.query("SELECT * FROM kartu_keluarga WHERE no_kk = ?", [kkNo_kk], (err, rows) => {
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

const editKKController = [
  body("no_kk").notEmpty(),
  body("alamat").notEmpty(),
  body("rt").notEmpty(),
  body("rw").notEmpty(),
  body("kode_pos").notEmpty(),
  body("desa_kelurahan").notEmpty(),
  body("kecamatan").notEmpty(),
  body("kabupaten_kota").notEmpty(),
  body("provinsi").notEmpty(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const ktpno_kk = req.params.no_kk;

    const data = {
      no_kk: req.body.no_kk,
      alamat: req.body.alamat,
      rt: req.body.rt,
      rw: req.body.rw,
      kode_pos: req.body.kode_pos,
      desa_kelurahan: req.body.desa_kelurahan,
      kecamatan: req.body.kecamatan,
      kabupaten_kota: req.body.kabupaten_kota,
      provinsi: req.body.provinsi,
    };

    connection.query("UPDATE kartu_keluarga SET ? WHERE no_kk = ?", [data, ktpno_kk], (err, rows) => {
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

const deleteKKController = (req, res) => {
  const ktpno_kk = req.params.no_kk; //
  connection.query("DELETE FROM kartu_keluarga WHERE no_kk = ?", [ktpno_kk], (err, rows) => {
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
  getAllKKController,
  getByIdKKController,
  addKKController,
  editKKController,
  deleteKKController,
};
