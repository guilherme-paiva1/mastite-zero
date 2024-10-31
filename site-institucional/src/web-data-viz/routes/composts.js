var express = require("express");
var router = express.Router();

var compostController = require("../controllers/compostController");

router.get("/:empresaId", function (req, res) {
  compostController.buscarCompostPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  compostController.cadastrar(req, res);
})

module.exports = router;