var vezesClicadas = 0;

function abrirModalUsuario(){
    vezesClicadas ++;
    var modal = modalUsuario;
    var ancora = svgUsuario;
    var botao = botaoAbrirModalUsuario.value; 

    if(vezesClicadas > 1){
        vezesClicadas = 0;
        ancora.style.fontWeight = "normal"
        ancora.style.opacity = "0.5";
        modal.style.display = "none";
    }else{
        ancora.style.fontWeight = "bold"
        ancora.style.opacity = "1";
        modal.style.display = "flex";
    }
}