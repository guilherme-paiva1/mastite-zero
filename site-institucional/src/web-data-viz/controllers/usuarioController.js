var usuarioModel = require("../models/usuarioModel");
var compostModel = require("../models/compostModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.buscarUsuarioPeloEmailESenha(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length > 0) {
                        res.json({
                            // .id_usuario = nome do campo do banco de dados
                            id_usuario: resultadoAutenticar[0].id_usuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                            fk_empresa: resultadoAutenticar[0].fk_empresa,
                            fk_fazenda: resultadoAutenticar[0].fk_fazenda,
                            fk_supervisor: resultadoAutenticar[0].fk_supervisor,
                        });
                    } else {
                        res.status(401).send("Email e/ou senha inválido(s)");
                    }
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

    console.log(fkSupervisor);

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
    var fkSupervisor = req.body.fkSupervisor;

    usuarioModel.buscarUsuarioPeloSupervisor(fkSupervisor)
        .then(
            function (resultadoLista) {
                console.log(`\nResultados encontrados: ${resultadoLista.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoLista)}`); // transforma JSON em String

                if (resultadoLista.length > 0) {
                    var lista_funcionarios = [];
                    var tamanho_lista = resultadoLista.length;
                    for (var i = 0; i < tamanho_lista; i++) {
                        lista_funcionarios.push({
                            id_usuario: resultadoLista[i].id_usuario,
                            email: resultadoLista[i].email,
                            nome: resultadoLista[i].nome,
                        })
                    }
                    res.json(lista_funcionarios);
                } else {
                    res.status(404).send("Não tem nenhum funcionário!")
                }
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

function excluirFuncionario(req, res) {
    var id_usuario = req.body.id_usuario;

    usuarioModel.excluirUsuario(id_usuario)
    .then(
        function (resultadoExclusao) {
            res.json(resultadoExclusao);    
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao excluir o funcionário! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );

}

module.exports = {
    autenticar,
    cadastrar,
    excluirFuncionario,
    listarPeloSupervisor
}