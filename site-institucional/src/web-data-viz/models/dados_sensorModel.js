var database = require("../database/config");

function buscarUltimasMedidas(grupo, limite_linhas) {

    var instrucaoSql = `
                        SELECT 
                            umidade, 
                            data_hora
                        FROM 
                            Sensor
                        JOIN 
                            Dados_sensor ON id_sensor = fk_sensor
                        WHERE 
                            grupo = '${grupo}';
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
