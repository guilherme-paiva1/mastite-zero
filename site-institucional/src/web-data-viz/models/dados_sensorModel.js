var database = require("../database/config");

function buscarUltimasMedidas(grupo, fkCompost) {
    console.log(grupo);
var instrucaoSql = `
                                                
                        SELECT 
                            umidade,
                            data_hora,
                            (SELECT 
                                    TIMEDIFF(MAX(data_hora), MIN(data_hora)) AS tempoResposta
                                FROM
                                    Dados_sensor
                                        JOIN
                                    Sensor ON id_sensor = fk_sensor
                                WHERE
                                    umidade > 60
                                        AND data_hora LIKE '2024-11-29%') AS tempoResposta,
                            (SELECT 
                                    COUNT(id_sensor)
                                FROM
                                    Sensor
                                WHERE
                                    grupo = 'norte'
                                        AND (umidade > 60 OR umidade < 40)) AS sensoresFora,
                            (SELECT 
                                    AVG(umidade)
                                FROM
                                    Dados_sensor
                                WHERE
                                    fk_sensor = id_sensor
                                        AND (data_hora BETWEEN NOW() - INTERVAL 5 DAY AND NOW())) AS mediaGrupo
                        FROM
                            Sensor
                                JOIN
                            Dados_sensor ON id_sensor = fk_sensor
                        WHERE
                            grupo = 'norte' AND fk_cb = 1000
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
