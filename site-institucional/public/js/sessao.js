// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

/* carregamento (loading)
function aguardar() {
    var divMensagem = document.getElementById("divMensagem");
    divMensagem.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divMensagem = document.getElementById("divMensagem");
    divMensagem.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}
    */

