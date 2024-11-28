var database = require("../database/config");

function buscarAdmPeloEmailESenha(email, senha) {
    var instrucaoSql = `
        SELECT email FROM Adm WHERE email = '${email}' AND senha = '${senha}';
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarAdmPeloEmailESenha    
}