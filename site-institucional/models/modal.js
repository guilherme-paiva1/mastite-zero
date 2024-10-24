var vezesClicadas = 0;

function abrirModalUsuario(){
    vezesClicadas ++;
    var modal = modalUsuario;
    var botao = botaoAbrirModalUsuario.value; 

    if(vezesClicadas > 1){
        vezesClicadas = 0;
        modal.style.display = "none";
    }else{
        modal.style.display = "flex";
    }
}