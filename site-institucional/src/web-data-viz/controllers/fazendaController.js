var fazendaModel = require("../models/fazendaModel");

async function cadastrarFazenda(req, res) {
    const nome = req.body.nome;
    const fkEmpresa = req.body.fkEmpresa;
    const fkEndereco = req.body.fkEndereco;

    if (nome == undefined) {
        res.status(401).json({ message: "Erro, o nome da fazenda não pode ser undefined" })
    } else if (fkEmpresa == undefined) {
        res.status(401).json({ messagem: "Erro, a fk_empresa da fazenda não pode ser undefined" })
    } else if (fkEndereco == undefined) {
        res.status(401).json({ message: "Erro, a fk_endereco da fazenda não pode ser undefined" })
    } else {
        console.log("Cadastrando fazenda...");

        try {
            const fazenda = await fazendaModel.buscarFazendaPeloFkEndereco(fkEndereco);

            if (fazenda.length > 0) {
                res.status(401).json({ message: "Ja existe uma fazenda com esse endereço" });
            } else {
                fazendaModel.cadastrarFazenda(nome, fkEmpresa, fkEndereco).then((resposta) => {
                    if (resposta.length > 0) {

                    }
                })
            }

        } catch (erro) {
            console.log(erro);
            console.log("Houve um erro ao Cadastrar a fazenda.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        };
    }
}


async function buscarFazendaPeloFkEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var idFazenda = req.params.idFazenda;

    console.log("Buscando fazenda pela fkEmpresa...");

    fazendaModel.buscarFazendaPelaFkEmpresa(fkEmpresa, idFazenda)
        .then(async function (resultado) {
            if (resultado.length > 0) {
                const dadosGraficos = await fazendaModel.buscarDadosFazendaGrafico(idFazenda);
                if(dadosGraficos.length > 0){
                    console.log("Entrou no segundo if")
                    return res.status(200).json({
                        dados: resultado,
                        dadosGrafico: dadosGraficos
                    });
                }
                return res.status(200).json({
                    dados: resultado,
                    dadosGraficos: {}
                });
            } else {
               return res.status(204).send("Nenhuma fazenda encontrada..")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as fazendas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarPelaEmpresa(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    console.log('No controller:' + idEmpresa);
    
    fazendaModel.listarPelaEmpresa(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Não tem fazenda cadastrada!");
            }
        }).catch (function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as fazendas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
}
module.exports = {
    cadastrarFazenda,
    buscarFazendaPeloFkEmpresa,
    listarPelaEmpresa
}