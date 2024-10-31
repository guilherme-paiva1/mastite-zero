var fazendaModel = require("../models/fazendaModel");

async function cadastrarFazenda(req, res) {
    const nome = req.body.nome;
    const fkEmpresa = req.body.fkEmpresa;
    const fkEndereco = req.body.fkEndereco;

    if(nome == undefined){
        res.status(401).json({message: "Erro, o nome da fazenda não pode ser undefined"})
    }else if(fkEmpresa == undefined){
        res.status(401).json({messagem: "Erro, a fk_empresa da fazenda não pode ser undefined"})
    }else if(fkEndereco == undefined){
        res.status(401).json({message: "Erro, a fk_endereco da fazenda não pode ser undefined"})
    }else{
        console.log("Cadastrando fazenda...");

        try{
            const fazenda = await fazendaModel.buscarFazendaPeloFkEndereco(fkEndereco);
            
            if (fazenda.length > 0) {
            res.status(401).json({message: "Ja existe uma fazenda com esse endereço"});
        } else {
            fazendaModel.cadastrarFazenda(nome, fkEmpresa, fkEndereco).then((resposta)=> {
                if(resposta.length > 0){
    
                }
            })
        }
        
        }catch(erro) {
            console.log(erro);
            console.log("Houve um erro ao Cadastrar a fazenda.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        };
    }
}


function buscarFazendaPeloFkEmpresa(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    
    console.log("Buscando fazenda pela fkEmpresa...");

    fazendaModel.buscarFazendaPelaFkEmpresa(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma fazenda encontrada..")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as fazendas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    cadastrarFazenda,
    buscarFazendaPeloFkEmpresa
}