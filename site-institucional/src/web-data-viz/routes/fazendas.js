var express = require("express");
var router = express.Router();

var fazendaController = require("../controllers/fazendaController");

router.post("/cadastrar", function (req, res) {
    fazendaController.cadastrarFazenda(req, res);
});

router.get("/buscar/:fkEmpresa/:idFazenda", function (req, res) {
    fazendaController.buscarFazendaPeloFkEmpresa(req, res);
});

router.post("/listarPorEmpresa", function (req, res) {
    fazendaController.listarPelaEmpresa(req, res);
});

module.exports = router;