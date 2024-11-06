function logar() {
    var email = inputEmail.value;
    var senha = inputSenha.value;

    if (email == '' || senha == '') {
        spanErro.innerHTML = `Preencha todos os campos!`;

        return false;
    } else {
        console.log("FORM LOGIN: ", email);
        console.log("FORM SENHA: ", senha);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.FK_SUPERVISOR = json.fkSupervisor;
                    sessionStorage.FK_EMPRESA = json.fkEmpresa;
                    sessionStorage.FK_FAZENDA = json.fkFazenda;
                    setTimeout(function () {
                        window.location = "./dashboard/dashboard.html";
                    }, 1000); // apenas para exibir o loading

                });
            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    finalizarAguardar(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }


    spanErro.innerHTML = "";
    spanErro.innerHTML = "";
    spanSucesso.innerHTML = "Login correto";
}
