var compostModel = require("../models/compostModel");

function buscarDadosPorFazenda(req, res) {
  var fazendaId = req.params.idFazenda;
  var compostId = req.params.idCompost;

  compostModel.buscarDadosPorFazenda(fazendaId, compostId).then((resultado) => {
      if (resultado.length > 0) {
        compostModel.buscarDadosGraficoUmidadeHora(fazendaId, compostId).then((resultadoHora) => {
          if(resultado.length > 0){
            compostModel.buscarDadosGraficoUmidadeSemana(fazendaId, compostId).then((resultadoSemana) => {
              if(resultadoSemana.length > 0){
                return res.status(200).json({
                  dadosKpi: resultadoHora,
                  dadosGraficoUmidadeHora: resultadoHora,
                  dadosGraficoUmidadeSemana: resultadoSemana
                });
              }else{
                return res.status(200).json({
                  dadosKpi: resultadoHora,
                  dadosGraficoUmidadeHora: resultadoHora,
                  dadosGraficoUmidadeSemana: []
                });
              }
            })
          }else{
            return res.status(200).json({
              dadosKpi: resultadoHora,
              dadosGraficoUmidadeHora: [],
              dadosGraficoUmidadeSemana: []
            });
          }
        })
      } else {
        return res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os compost barns: ", erro.sqlMessage);
      return res.status(500).json(erro.sqlMessage);
    });
}

function listarPorFazenda(req, res) {
  var fazendaId = req.body.idFazendaServer;

  compostModel.listarPorFazenda(fazendaId)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os compost barns: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  var areaM2 = req.body.areaM2;
  var dataUltimaManutencao = req.body.dataUltimaManutencao;
  var fazendaId = req.body.fazendaId;

  if (areaM2 == undefined) {
    res.status(400).send("areaM2 está undefined!");
  } else if (dataUltimaManutencao == undefined) {
    res.status(400).send("dataUltimaManutencao está undefined!");
  } else if (fazendaId == undefined) {
    res.status(400).send("fazendaId está undefined!");
  } else {


    compostModel.cadastrar(areaM2, dataUltimaManutencao, fazendaId)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarDadosPorFazenda,
  listarPorFazenda,
  cadastrar
}