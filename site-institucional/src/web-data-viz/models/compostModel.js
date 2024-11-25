var database = require("../database/config");

function buscarDadosPorFazenda(fazendaId, compostId) {

  var instrucaoSql = `
                 SELECT
                  MAX(ds.umidade) AS "umidadeMaxima",
                  (SELECT ds_max.data_hora
                  FROM Dados_sensor ds_max
                  WHERE ds_max.fk_sensor = s.id_sensor
                    AND DATE(ds_max.data_hora) = CURDATE()
                  ORDER BY ds_max.umidade DESC
                  LIMIT 1) AS "dataUmidadeMaxima",
                  AVG(ds.umidade) AS "nivelMedio",
                  MIN(ds.umidade) AS "nivelMinimo",
                  SUM(CASE WHEN ds.umidade > 60 OR ds.umidade < 40 THEN 1 ELSE 0 END) AS "qtdAlertas",
                  COUNT(
                    DISTINCT CASE 
                    WHEN ds.umidade > 60 
                         AND ds.data_hora = (SELECT MAX(ds_now.data_hora)
                                             FROM Dados_sensor ds_now
                                             WHERE ds_now.fk_sensor = s.id_sensor) 
                    THEN s.id_sensor 
                   END) AS "sensoresAcima"
              FROM 
                  Compost_barn cb
              JOIN 
                  Sensor s ON s.fk_cb = cb.id_cb
              JOIN 
                  Dados_sensor ds ON ds.fk_sensor = s.id_sensor
              WHERE 
                  cb.fk_fazenda = ${fazendaId}
                  AND cb.id_cb = ${compostId}
                  AND DATE(ds.data_hora) = CURDATE()
              GROUP BY 
                  s.id_sensor
              ORDER BY 
                  MAX(ds.umidade) DESC
              LIMIT 1;


                      `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarPorFazenda(fkFazenda) {
  var instrucaoSql = `
    SELECT id_cb, apelido FROM Compost_barn 
      WHERE fk_fazenda = ${fkFazenda}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);

}

function cadastrar(areaM2, dataUltimaManutencao, fazendaId) {
  
  var instrucaoSql = `INSERT INTO Compost_barn (area_m2, data_ultima_manutencao, fk_fazenda) VALUES 
    ('${areaM2}', '${dataUltimaManutencao}', '${fazendaId}')`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarDadosPorFazenda,
  listarPorFazenda,
  cadastrar
}
