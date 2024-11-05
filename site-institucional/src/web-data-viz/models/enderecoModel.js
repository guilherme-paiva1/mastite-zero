var database = require("../database/config");


function cadastrar(cep, cidade, estado, logradouro, numero, complemento){
  var instrucaoSql = `INSERT INTO Endereco (cep, cidade, estado, logradouro, numero,complemento) 
                      VALUES ('${cep}', '${cidade}', '${estado}', '${logradouro}', '${numero}', '${complemento}');`;

  return database.executar(cadastrar);
}

module.exports = {
  cadastrar
}