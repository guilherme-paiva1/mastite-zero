var express = require("express");
var router = express.Router();

var fazendaController = require("../controllers/fazendaController");

router.post("/cadastrar", function (req, res) {
    fazendaController.cadastrarFazenda(req, res);
});

router.get("/buscar/:fkEmpresa", function (req, res) {
    fazendaController.buscarFazendaPeloFkEmpresa(req, res);
})

module.exports = router;