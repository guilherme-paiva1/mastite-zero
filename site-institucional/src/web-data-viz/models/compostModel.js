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

function buscarDadosGraficoUmidadeHora(fazendaId, compostId){
    var instrucaoSql = `
                  SELECT umidade as umidadeHora,
                  TIME(data_hora) as horaHora,
                    
                    (SELECT COUNT(dss.id_dado) FROM Sensor ss
                  JOIN Dados_sensor dss
                      ON ss.id_sensor = dss.fk_sensor
                      WHERE ss.fk_cb = ${compostId}
                      AND dss.umidade > 60
                      AND DATE(dss.data_hora) = CURDATE()) as coletasAcima,
                      
                      (SELECT COUNT(dss.id_dado) FROM Sensor ss
                  JOIN Dados_sensor dss
                      ON ss.id_sensor = dss.fk_sensor
                      WHERE ss.fk_cb = ${compostId}
                      AND dss.umidade < 40
                      AND DATE(dss.data_hora) = CURDATE()) as coletasAbaixo


                    (SELECT COUNT(dss.id_dado) FROM Sensor ss
                  JOIN Dados_sensor dss
                      ON ss.id_sensor = dss.fk_sensor
                      WHERE ss.fk_cb = ${compostId}
                      AND (dss.umidade > 40 AND dss.umidade < 60)
                      AND DATE(dss.data_hora) = CURDATE()) as coletasIdeais
                      
                  FROM Compost_barn
                    JOIN Sensor ON fk_cb = id_cb
                    JOIN Dados_sensor ON fk_sensor = id_sensor
                  WHERE id_cb = ${compostId}
                  AND DATE(data_hora) = CURDATE()
                  ORDER BY data_hora
                  LIMIT 12;          
                              `;

    return database.executar(instrucaoSql);
}

function buscarDadosGraficoUmidadeSemana(fazendaId, compostId){
  var instrucaoSql = `SELECT WEEKDAY(ds.data_hora) as diaSemana,
                        AVG(ds.umidade) as umidadeMediaSemana
                      FROM Compost_barn cb
                        JOIN Sensor s ON s.fk_cb = cb.id_cb
                        JOIN Dados_sensor ds ON ds.fk_sensor = s.id_sensor
                      
                      WHERE YEARWEEK(data_hora, 1) = YEARWEEK(CURDATE(), 1)
                        AND cb.id_cb = ${compostId}
                        GROUP BY cb.id_cb ,ds.data_hora
                      LIMIT 7;`
    return database.executar(instrucaoSql);
}


module.exports = {
  buscarDadosPorFazenda,
  listarPorFazenda,
  cadastrar,
  buscarDadosGraficoUmidadeHora,
  buscarDadosGraficoUmidadeSemana
}
