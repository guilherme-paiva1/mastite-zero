var database = require("../database/config");

function buscarFazendaPeloFkEndereco(fkEndereco) {

    var instrucaoSql = `
        SELECT nome
            FROM Fazenda
                WHERE fk_endereco = ${fkEndereco}
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarFazenda(nome, fkEmpresa, fkEndereco){
    const instrucaoSql = 
        `INSERT INTO Fazenda (nome, fk_endereco, fk_empresa) VALUES ('${nome}', ${fkEmpresa}, ${fkEndereco})`;


    return database.executar(instrucaoSql);
}
// (SELECT count(id_sensor) FROM Sensor 
// JOIN Dados_sensor ON fk_sensor = id_sensor 
// WHERE fk_cb = id_cb AND umidade > 30) as qtdAlerta

function buscarFazendaPelaFkEmpresa(fkEmpresa, idFazenda) {

    var dataAtual = new Date();
    var diaAtual = dataAtual.getDate();
    var mesAtual = (dataAtual.getMonth() + 1);
    var anoAtual = dataAtual.getFullYear();

    var horaAtual = dataAtual.getHours();
    var minutoAtual = dataAtual.getMinutes();
    var segundoAtual = dataAtual.getSeconds();

    var instrucaoSql = `
                    SELECT
                    ds.umidade as umidadeAtual,
                    f.id_fazenda AS idFazenda, 
                    f.nome AS nome, 
                    f.fk_endereco AS fkEndereco, 
                    f.fk_empresa AS fkEmpresa,
                    
                    
                    (SELECT COUNT(DISTINCT cb.id_cb) 
                    FROM Compost_barn cb
                    JOIN Sensor s ON cb.id_cb = s.fk_cb
                    JOIN Dados_sensor ds ON s.id_sensor = ds.fk_sensor
                    WHERE cb.fk_fazenda = f.id_fazenda 
                    AND ds.umidade > 60 
                    AND ds.data_hora > NOW() - INTERVAL 7 SECOND) AS qtdCompost,
					

                    
                    (SELECT AVG(ds.umidade) 
                    FROM Sensor s
                    JOIN Dados_sensor ds ON s.id_sensor = ds.fk_sensor
                    WHERE s.fk_cb IN (SELECT id_cb FROM Compost_barn WHERE fk_fazenda = f.id_fazenda)
                    AND DATE(ds.data_hora) = CURDATE()) AS umidadeMedia,

                    
                    (SELECT COUNT(ds.umidade) 
                    FROM Sensor s
                    JOIN Dados_sensor ds ON s.id_sensor = ds.fk_sensor
                    WHERE s.fk_cb IN (SELECT id_cb FROM Compost_barn WHERE fk_fazenda = f.id_fazenda)
                    AND ds.umidade > 60
                    AND DATE(ds.data_hora) = CURDATE()) AS alertasSessenta,

                    
                    (SELECT COUNT(ds.umidade) 
                    FROM Sensor s
                    JOIN Dados_sensor ds ON s.id_sensor = ds.fk_sensor
                    WHERE s.fk_cb IN (SELECT id_cb FROM Compost_barn WHERE fk_fazenda = f.id_fazenda)
                    AND ds.umidade < 45
                    AND DATE(ds.data_hora) = CURDATE()) AS alertasQuarentaECinco

                FROM 
                    Fazenda f
                JOIN 
                    Compost_barn cb ON cb.fk_fazenda = f.id_fazenda
                
                JOIN 
                    Sensor s ON s.fk_cb = cb.id_cb
                JOIN 
                    Dados_sensor ds ON ds.fk_sensor = s.id_sensor
                WHERE 
                    f.id_fazenda = ${idFazenda}
                     AND DATE(ds.data_hora) = CURDATE()
                ORDER BY
                    ds.data_hora DESC
                LIMIT 1;
                ;

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPelaEmpresa (fkEmpresa) {
    var instrucaoSql = `
        SELECT id_fazenda, nome FROM Fazenda
            WHERE fk_empresa = ${fkEmpresa};    
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    buscarFazendaPeloFkEndereco,
    cadastrarFazenda,
    buscarFazendaPelaFkEmpresa,
    listarPelaEmpresa
}
