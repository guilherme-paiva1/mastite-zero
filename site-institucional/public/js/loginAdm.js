function logar() {
    var email = inputEmail.value;
    var senha = inputSenha.value;

    spanSucesso.innerHTML = "";
    spanErro.innerHTML = "";


    if (email == '' || senha == '') {
        spanErro.innerHTML = `Preencha todos os campos!`;

        return false;
    } else {
        console.log("FORM LOGIN: ", email);
        console.log("FORM SENHA: ", senha);

        // fetch vai buscar a rota USUARIOS/AUTENTICAR
        fetch("/admins/autenticarAdm", {
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

                spanSucesso.innerHTML = "Login realizado com sucesso!";

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                   
                    setTimeout(function () {
                        window.location = "./bobia.html";
                    }, 1000); // apenas para exibir o loading
                });
            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    spanErro.innerHTML = texto;
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }
}