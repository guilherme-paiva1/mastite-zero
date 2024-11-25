var database = require("../database/config");

function buscarUltimasMedidas(idSensor, limite_linhas) {

    var instrucaoSql = `
        SELECT id_dado, umidade, data_hora, fk_sensor
            FROM Dados_sensor
                WHERE fk_sensor = ${idSensor}
                    ORDER BY id DESC LIMIT ${limite_linhas}
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {

    var instrucaoSql = `
     SELECT id_dado, umidade, data_hora, fk_sensor
            FROM Dados_sensor
                WHERE fk_sensor = ${idSensor} 
                    ORDER BY id DESC LIMIT 1
    `;
    
    //DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico,
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
