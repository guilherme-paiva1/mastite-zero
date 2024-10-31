var database = require("../database/config");

function buscarCompostsPorFazenda(fazendaId) {

  var instrucaoSql = `SELECT * FROM Compost_barn WHERE fk_fazenda = ${fazendaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(areaM2, dataUltimaManutencao, fazendaId) {
  
  var instrucaoSql = `INSERT INTO (area_m2, data_ultima_manutencao, fk_fazenda) Compost_barn VALUES (${areaM2}, ${dataUltimaManutencao}, ${fazendaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarCompostsPorFazenda: buscarCompostsPorFazenda,
  cadastrar
}
