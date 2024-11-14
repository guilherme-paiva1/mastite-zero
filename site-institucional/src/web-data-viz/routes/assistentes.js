var express = require("express");
var router = express.Router();

var assistenteController = require("../controllers/assistenteController");

router.post("/pergunta", function(req, res){
  assistenteController.pergunta(req, res);
});

module.exports = router;