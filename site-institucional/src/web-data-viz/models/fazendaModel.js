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

function buscarFazendaPelaFkEmpresa(fkEmpresa) {

    var instrucaoSql = `
        SELECT f.id_fazenda as idFazenda, f.nome as nome, f.fk_endereco as fkEndereco, f.fk_empresa as fkEmpresa
            FROM Fazenda as f
                WHERE fk_empresa = ${fkEmpresa}
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarFazendaPeloFkEndereco,
    cadastrarFazenda,
    buscarFazendaPelaFkEmpresa
}
