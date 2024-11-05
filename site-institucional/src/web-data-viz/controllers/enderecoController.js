var enderecoModel = require("../models/enderecoModel");

async function cadastrar(req, res){
  var cep = req.body.cep;
  var cidade = req.body.cidade; 
	var estado = req.body.estado;
	var logradouro = req.body.logradouro; 
	var numero = req.body.numero;
	var complemento = req.body.complemento

  if(cep == undefined){
    res.status(401).json({mensagem: "Seu cep esta indefinido"});
  }else if(cidade == undefined){
    res.status(401).json({mensagem: "Seu cidade esta indefinido"});
  }else if(estado == undefined){
    res.status(401).json({mensagem: "Sua cidade esta indefinido"});
  }else if(logradouro == undefined){
    res.status(401).json({mensagem: "Seu logradouro esta indefinido"});
  }else if(numero == undefined){
    res.status(401).json({mensagem: "Seu numero esta indefinido"});
  }else if(complemento == undefined){
    res.status(401).json({mensagem: "Seu complemento esta indefinido"});
  }

  enderecoModel.cadastrar(cep, cidade, estado, logradouro, numero, complemento)
                  .then((resposta)=> {
                    if(resposta.length > 0){
                      res.status(201).json(resposta)
                    }else{
                      res.status(204).json({mensagem: "Não foi possivel cadastrar seu endereco"})
                    };

                  }).catch((erro)=> {
                    console.log(erro);
                    console.log("Houve um erro ao buscar as fazendas.", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                  })
                  


}

module.exports = {
  cadastrar
}