var usuarioModel = require("../models/usuarioModel");
var compostModel = require("../models/compostModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.buscarUsuarioPeloEmailESenha(email, senha)
            .then(
                function (resposta) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resposta.length > 0) {
                        console.log("Usuario enviou as informações corretas!");

                       compostModel.buscarCompostsPorFazenda(resultadoAutenticar[0].fk_fazenda)
                            .then((resultadoComposts) => {
                                if (resultadoComposts.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        fkEmpresa: resultadoAutenticar[0].fk_empresa,
                                        fkFazenda: resultadoAutenticar[0].fk_fazenda,
                                        fkSupervisor: resultadoAutenticar[0].fk_supervisor,
                                        composts: resultadoComposts
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                        
                        res.status(201).json({mensagem: "Usuario cadastrado com sucesso!"});

                    } else{
                        res.status(401).send("Email e/ou senha inválido(s)");
                    } /* else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    } */
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var fkEmpresa = req.body.idEmpresa;
    var fkFazenda = req.body.idFazenda;
    var fkSupervisor = req.body.idSupervisor;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, fkFazenda, fkSupervisor)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarPeloSupervisor(req, res) {
    var fkSupervisor = req.body.idSupervisor;

    usuarioModel.buscarUsuarioPeloSupervisor(fkSupervisor)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar os funcionários! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    autenticar,
    cadastrar,
    listarPeloSupervisor
}