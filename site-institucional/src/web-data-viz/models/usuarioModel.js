var database = require("../database/config")
/* 
async function autenticar(email, senha) {
     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha) 
    
    return database.executar(instrucaoSql);
} */

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa, fkFazenda, fkSupervisor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha, fk_empresa, fk_fazenda, fk_supervisor) VALUES 
            ('${nome}', '${email}', '${senha}', ${fkEmpresa}, ${fkFazenda}, ${fkSupervisor});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarUsuarioPeloEmailESenha(email, senha) {
    var instrucaoSql = `SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}';`

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarUsuarioPeloEmailESenha
};