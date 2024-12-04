var database = require("../database/config");


function buscarUltimasMedidas(grupo, fkCompost) {
    var dataAtual = new Date()
    var diaAtual = dataAtual.getDate()
    var mesAtual = (dataAtual.getMonth() + 1)
    var anoAtual = dataAtual.getFullYear();

    if(diaAtual.toString().length == 1){
        diaAtual = "0" + diaAtual.toString();
    }

    console.log(`${anoAtual}-${mesAtual}-${diaAtual}`);
var instrucaoSql = `

                        SELECT 
                            umidade as umidadeAtual,
                            data_hora,
                            (SELECT 
                                    TIMEDIFF(MAX(dds.data_hora), MIN(dds.data_hora))
                                FROM
                                    Dados_sensor dds
                                        JOIN
                                    Sensor ON id_sensor = dds.fk_sensor
                                WHERE
                                    dds.umidade > 60
                                        AND dds.data_hora LIKE '${anoAtual}-${mesAtual}-${diaAtual} %') AS tempoResposta,
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
                            grupo = '${grupo}' AND fk_cb = ${fkCompost}
                            AND DATE(data_hora) = CURDATE() 
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
