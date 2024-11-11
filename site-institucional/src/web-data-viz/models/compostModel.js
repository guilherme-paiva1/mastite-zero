var database = require("../database/config");

function buscarCompostsPorFazenda(fazendaId) {

  var instrucaoSql = `
                      SELECT 
                  data_hora AS "Data do Registro", 
                  umidade AS "Maior Umidade Registrada",
                (SELECT avg(umidade) FROM Dados_sensor WHERE fk_sensor = id_sensor) as "Nível médio registrado",
                  (SELECT min(umidade) FROM Dados_sensor WHERE fk_sensor = id_sensor) as "Nível mínimo registrado",
                  (SELECT count(id_dado) FROM Dados_sensor WHERE fk_sensor = id_sensor AND umidade < 30) as "Sensores acima do ideal atualmente",
                  (SELECT count(id_dado) FROM Dados_sensor WHERE fk_sensor = id_sensor AND umidade > 30) as "Quantidade de alertas no total"
              FROM 
                  Compost_barn
              JOIN 
                  Sensor ON fk_cb = id_cb
              JOIN 
                  Dados_sensor ON fk_sensor = id_sensor
              WHERE 
                  fk_fazenda ='${fazendaId}'
              ORDER BY 
                  umidade DESC, data_hora DESC
              LIMIT 1;
                      `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(areaM2, dataUltimaManutencao, fazendaId) {
  
  var instrucaoSql = `INSERT INTO (area_m2, data_ultima_manutencao, fk_fazenda) Compost_barn VALUES (${areaM2}, ${dataUltimaManutencao}, ${fazendaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarCompostsPorFazenda,
  cadastrar
}
