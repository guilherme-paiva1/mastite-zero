async function carregarDadosEmpresa(){
  var fkEmpresa = sessionStorage.getItem("FK_EMPRESA");

  if(fkEmpresa == null || fkEmpresa == undefined){
    // location.replace("/cadastrar.html");
  }else{
    var opcoes = document.getElementsByClassName("select-filtro");

    for(var index = 0; index < opcoes.length; index ++){
      var elementoAtual = opcoes[index];

      if(elementoAtual.id == "selectFazenda"){
        fetch(`/fazendas/buscar/${fkEmpresa}/${elementoAtual.value}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((resposta) => {
          if(resposta.ok){
            console.log("Deu tudo certo")
          }else{
            console.log("Deu tudo errado")
          }
        }).catch((erro) => {
          console.log(erro);
        })
      }
    }
  
  }
}