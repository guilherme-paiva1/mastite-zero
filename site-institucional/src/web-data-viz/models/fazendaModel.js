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
        SELECT f.id_fazenda as idFazenda, 
		f.nome as nome, 
        f.fk_endereco as fkEndereco, 
        f.fk_empresa as fkEmpresa,
        
        (SELECT count(id_cb) FROM Compost_barn
			JOIN Sensor 
				ON id_cb = fk_cb 
		    JOIN Dados_sensor 
				ON fk_sensor = id_sensor 
            
		WHERE umidade > 60 AND data_hora LIKE '${anoAtual}-${mesAtual}-${diaAtual} ${horaAtual}:${minutoAtual}:${segundoAtual}') as qtdCompost,
        
        (SELECT avg(umidade) FROM Sensor 
			JOIN Dados_sensor ON fk_sensor = id_sensor 
		WHERE fk_cb = id_cb) as umidadeMedia,

        (SELECT count(umidade) FROM Sensor 
			JOIN Dados_sensor ON fk_sensor = id_sensor 
		WHERE fk_cb = id_cb AND umidade > 60) as alertasSessenta,

        (SELECT count(umidade) FROM Sensor 
			JOIN Dados_sensor ON fk_sensor = id_sensor 
		WHERE fk_cb = id_cb AND umidade < 45) as alertasQuarentaECinco
        

        FROM Fazenda as f
		JOIN Compost_barn ON fk_fazenda = f.id_fazenda
                WHERE fk_empresa = ${fkEmpresa} AND id_fazenda = ${idFazenda};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarFazendaPeloFkEndereco,
    cadastrarFazenda,
    buscarFazendaPelaFkEmpresa
}
