const express = require('express');
const database = require("./connections");
const cors = require('cors');

const randomString = require('randomstring');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/add", (req, res) => {
  const nomorPeserta = req.body.nomorPeserta;
  const namaPeserta = req.body.namaPeserta;
  const ttl = req.body.ttl;
  const jk = req.body.jk;
  const tanggalTes = req.body.tanggalTes;
  const tanggalBerlaku = req.body.tanggalBerlaku;
  const tempat = req.body.tempat;
  const skorVerbal = req.body.skorVerbal;
  const skorKuantitatif = req.body.skorKuantitatif;
  const skorPenalaran = req.body.skorPenalaran;
  const skorTotal = req.body.skorTotal;  
  const code = req.body.code;
  
  database.query("INSERT INTO kode_qr VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [0, nomorPeserta, namaPeserta, ttl, jk, tanggalTes, tanggalBerlaku, tempat, skorVerbal, skorKuantitatif, skorPenalaran, skorTotal,  code],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
    }
  })
})

app.get("/skor/:code", (req, res) => {    
  const code = req.params.code; 

  database.query("SELECT nomor_peserta, nama_peserta, tanggal_lahir, jenis_kelamin, tanggal_tes, berlaku_sampai, tempat_tes, skor_tpa_verbal, skor_tpa_kuantitatif, skor_tpa_penalaran, skor_total FROM kode_qr WHERE code = ?",
    code,
    (error, result) => {
    if(error) {
      throw (error);
    } else {
      res.send(result);
    }
  })
})



app.listen(port, () => {
  console.log(`Server TPA is Running at Port ${port}!`);
})