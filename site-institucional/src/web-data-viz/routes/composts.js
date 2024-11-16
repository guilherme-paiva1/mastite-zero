var express = require("express");
var router = express.Router();

var compostController = require("../controllers/compostController");

router.get("/buscar/:idCompost/:idFazenda", function (req, res) {
  compostController.buscarDadosPorFazenda(req, res);
});

router.post("/cadastrar", function (req, res) {
  compostController.cadastrar(req, res);
})

module.exports = router;