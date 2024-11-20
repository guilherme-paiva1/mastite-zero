var express = require("express");
var router = express.Router();

var dadosSensoresController = require("../controllers/dados_sensorController");

router.get("/ultimas/:grupoSensor/:idCompost", function (req, res) {
    dadosSensoresController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idSensor", function (req, res) {
    dadosSensoresController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;