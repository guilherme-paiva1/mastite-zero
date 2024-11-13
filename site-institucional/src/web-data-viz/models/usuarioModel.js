var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa, fkFazenda, fkSupervisor) {

    if (fkSupervisor == null) {
        var instrucaoSql = `
            INSERT INTO Usuario (nome, email, senha, fk_empresa, fk_fazenda, fk_supervisor) VALUES 
            ('${nome}', '${email}', '${senha}', '${fkEmpresa}', '${fkFazenda}', NULL);
        `;
    } else {
        var instrucaoSql = `
            INSERT INTO Usuario (nome, email, senha, fk_empresa, fk_fazenda, fk_supervisor) VALUES 
            ('${nome}', '${email}', '${senha}', '${fkEmpresa}', '${fkFazenda}', '${fkSupervisor}');
        `;
    }


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsuarioPeloEmailESenha(email, senha) {
    var instrucaoSql = `
        SELECT * FROM Usuario 
        WHERE email = '${email}' AND senha = '${senha}'
    ;`

    return database.executar(instrucaoSql);
}

function buscarUsuarioPeloSupervisor(fkSupervisor) {
    var instrucaoSql = `
        SELECT * FROM Usuario 
        WHERE fk_supervisor = ${fkSupervisor}
    ;`

    return database.executar(instrucaoSql);
}

function excluirUsuario(idUsuario) {
    var instrucaoSql = `
    DELETE FROM Usuario
    WHERE id_usuario = ${idUsuario}
    ;`

    return database.executar(instrucaoSql);
}

function atualizarUsuario(nome, email, idUsuario) {
    var instrucaoSql = `
    UPDATE Usuario SET nome = '${nome}', email = '${email}' 
    WHERE id_usuario = ${idUsuario}
    ;`

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarUsuarioPeloEmailESenha,
    buscarUsuarioPeloSupervisor,
    excluirUsuario,
    atualizarUsuario
};