var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id_empresa, nome_fantasia, razao_social, representante_legal, cnpj 
    FROM Empresa
  `;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM Empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nomeFantasia, razaoSocial, representanteLegal, cnpj, email) {
  var instrucaoSql = `INSERT INTO Empresa (nome_fantasia, razao_social, representante_legal, cnpj, email) 
    VALUES ('${razaoSocial}', '${nomeFantasia}', '${representanteLegal}','${cnpj}', '${email}')
  `;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
