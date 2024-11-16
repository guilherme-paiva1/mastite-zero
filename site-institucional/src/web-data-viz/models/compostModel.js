var database = require("../database/config");

function buscarDadosPorFazenda(fazendaId, compostId) {

  var instrucaoSql = `
                 SELECT 
					MAX(data_hora) AS "dtRegistro", 
					MAX(umidade ) AS "maiorUmidade",
					
          (SELECT avg(umidade) 
						FROM Dados_sensor 
                        WHERE fk_sensor = id_sensor 
                        AND DATE(data_hora) = CURDATE()) as "nivelMedio",
					(SELECT min(umidade) 
						FROM Dados_sensor 
                        WHERE fk_sensor = id_sensor
                        AND DATE(data_hora) = CURDATE()) as "nivelMinimo",
                    (SELECT count(id_dado) 
						FROM Dados_sensor 
                        WHERE fk_sensor = id_sensor 
                        AND umidade < 30
                        AND DATE(data_hora) = CURDATE()) as "sensoresAcima",
                    (SELECT count(id_dado) 
						FROM Dados_sensor 
                        WHERE fk_sensor = id_sensor 
                        AND umidade > 30
                        AND DATE(data_hora) = CURDATE()) as "qtdAlertas"
              FROM 
                  Compost_barn
              JOIN 
                  Sensor ON fk_cb = id_cb
              JOIN 
                  Dados_sensor ON fk_sensor = id_sensor
              WHERE 
                  fk_fazenda = ${fazendaId}
                  AND id_cb = ${compostId}
                  AND DATE(data_hora) = CURDATE()
              GROUP BY
                  id_sensor
              ORDER BY 
                  "maiorUmidade" DESC
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
  buscarDadosPorFazenda,
  cadastrar
}
