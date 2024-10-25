function novoFuncionario (){
  var modal = modalNovoFuncionario;  
  
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

  modal.style.display = "flex"
}
function fecharModal() {
  var modal = modalNovoFuncionario;

  modal.style.display = "none";
}