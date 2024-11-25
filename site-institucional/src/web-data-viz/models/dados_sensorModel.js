var database = require("../database/config");

function buscarUltimasMedidas(grupo, fkCompost) {
    console.log(grupo);
var instrucaoSql = `
                                                
                       SELECT 
                            umidade,
                            data_hora,
                            
                            (SELECT COUNT(id_sensor) FROM Sensor
                            WHERE grupo = '${grupo}'
                            AND (umidade > 60 OR umidade < 40)
                            ) as sensoresFora,
                            
                            (SELECT AVG(umidade) FROM Dados_sensor
                            WHERE fk_sensor = id_sensor
                            AND (data_hora BETWEEN NOW() - INTERVAL 5 DAY AND NOW())) as mediaGrupo
                            
                        FROM 
                            Sensor
                        JOIN 
                            Dados_sensor ON id_sensor = fk_sensor
						WHERE grupo = '${grupo}'
                        AND fk_cb = ${fkCompost}
                        ORDER BY data_hora DESC
                        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {

    var instrucaoSql = `
     SELECT id_dado, umidade, data_hora, fk_sensor
            FROM Dados_sensor
                WHERE fk_sensor = ${idSensor} 
                    ORDER BY id_dado DESC LIMIT 1
    `;
    
    //DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico,
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
