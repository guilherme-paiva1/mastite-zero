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

function buscarFazendaPelaFkEmpresa(fkEmpresa, nome) {

    var instrucaoSql = `
        SELECT f.id_fazenda as idFazenda, 
		f.nome as nome, 
        f.fk_endereco as fkEndereco, 
        f.fk_empresa as fkEmpresa,
        
        (SELECT count(id_sensor) FROM Sensor 
			JOIN Dados_sensor ON fk_sensor = id_sensor 
		WHERE fk_cb = id_cb AND umidade > 30 AND data_hora = now()) as "Qtd. de compost barn fora do ideal",
        
        (SELECT avg(umidade) FROM Sensor 
			JOIN Dados_sensor ON fk_sensor = id_sensor 
		WHERE fk_cb = id_cb) as UmidadeMedia,
        
        (SELECT count(id_sensor) FROM Sensor 
			JOIN Dados_sensor ON fk_sensor = id_sensor 
		WHERE fk_cb = id_cb AND umidade > 30) as "Quantidade de alertas da fazenda"
        FROM Fazenda as f
		JOIN Compost_barn ON fk_fazenda = f.id_fazenda
                WHERE fk_empresa = ${fkEmpresa} AND nome = '${nome}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarFazendaPeloFkEndereco,
    cadastrarFazenda,
    buscarFazendaPelaFkEmpresa
}
