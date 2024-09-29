function logar() {

    var cnpj = inputCnpj.value;
    var senha = inputCnpj.value;

    if(cnpj == "" && senha == ""){
        mensagemAlertaCnpj.style.color = "red"
        mensagemAlertaCnpj.innerHTML = "Por favor insira valores validos !"
        mensagemAlertaSenha.style.color = "red"
        mensagemAlertaSenha.innerHTML = "Por favor insira valores validos !"
    }else if(cnpj == ""){
        mensagemAlertaSenha.innerHTML = "";
        mensagemAlertaCnpj.style.color = "red"
        mensagemAlertaCnpj.innerHTML = "Por favor insira valores validos !"
    }else if (senha == ""){
        mensagemAlertaCnpj.innerHTML = ""
        mensagemAlertaSenha.style.color = "red"
        mensagemAlertaSenha.innerHTML = "Por favor insira valores validos !"
    }

}