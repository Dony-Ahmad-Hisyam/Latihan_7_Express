const connection = require("../Models/Config/db");
const { body, validationResult } = require("express-validator");

const addDetail_ktpController = async (req, res) => {
  const { no_kk, nik, status_hubungan_dalam_keluarga, ayah, ibu } = req.body;

  try {
    // Validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // Pastikan semua data yang diperlukan ada
    if (!no_kk || !nik || !ayah || !ibu || !status_hubungan_dalam_keluarga) {
      return res.status(400).json({
        status: false,
        message: "Data yang dibutuhkan tidak lengkap.",
      });
    }

    // Cari ayah_nik, ibu_nik, dan no_kk di database berdasarkan nik dan no_kk
    const [ayahResult, ibuResult, kkResult] = await Promise.all([
      queryDB("SELECT nik FROM ktp WHERE nik = ?", [ayah]),
      queryDB("SELECT nik FROM ktp WHERE nik = ?", [ibu]),
      queryDB("SELECT no_kk FROM kartu_keluarga WHERE no_kk = ?", [no_kk]),
    ]);

    const ayah_nik = ayahResult[0]?.nik; // Menggunakan nullish coalescing operator (?.) untuk mengatasi jika data tidak ditemukan
    const ibu_nik = ibuResult[0]?.nik;
    const kk_no_kk = kkResult[0]?.no_kk;

    // Buat objek data untuk disimpan di database
    const data = {
      no_kk: kk_no_kk,
      nik: nik,
      status_hubungan_dalam_keluarga: status_hubungan_dalam_keluarga,
      ayah: ayah_nik,
      ibu: ibu_nik,
    };

    // Simpan data ke database
    connection.query("INSERT INTO detail_ktp SET ?", data, (err, result) => {
      if (err) {
        console.error("Kesalahan dalam permintaan:", err);
        return res.status(500).json({
          status: false,
          message: "Kesalahan dalam server: " + err.message,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Sukses..!",
          data: result.insertId,
        });
      }
    });
  } catch (err) {
    console.error("Kesalahan dalam permintaan:", err);
    return res.status(500).json({
      status: false,
      message: "Kesalahan dalam server: " + err.message,
    });
  }
};

// Fungsi untuk menjalankan query database dengan menggunakan Promise
function queryDB(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

const getAllDetail_ktpController = (req, res) => {
  connection.query("SELECT * FROM detail_ktp", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Kesalahan dalam server: " + err.message,
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

const getByIdDetail_ktpController = (req, res) => {
  const id_detail = req.params.id_detail;
  connection.query("SELECT * FROM detail_ktp WHERE id_detail = ?", [id_detail], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Kesalahan dalam server: " + err.message,
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

const editDetail_ktpController = (req, res) => {
  const id_detail = req.params.id_detail;
  const { no_kk, nik, status_hubungan_dalam_keluarga, ayah, ibu } = req.body;

  const data = {
    no_kk,
    nik,
    status_hubungan_dalam_keluarga,
    ayah,
    ibu,
  };

  connection.query("UPDATE detail_ktp SET ? WHERE id_detail = ?", [data, id_detail], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Kesalahan dalam server: " + err.message,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Sukses..!",
        data: result,
      });
    }
  });
};

const deleteDetail_ktpController = (req, res) => {
  const id_detail = req.params.id_detail;
  connection.query("DELETE FROM detail_ktp WHERE id_detail = ?", [id_detail], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Kesalahan dalam server: " + err.message,
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
  addDetail_ktpController,
  getAllDetail_ktpController,
  getByIdDetail_ktpController,
  editDetail_ktpController,
  deleteDetail_ktpController,
};
