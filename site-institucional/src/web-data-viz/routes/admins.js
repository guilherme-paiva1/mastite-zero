var express = require("express");
var router = express.Router();

var admController = require("../controllers/admController");

router.post("/autenticarAdm", function (req, res) {
    admController.autenticarAdm(req, res);
});

module.exports = router;