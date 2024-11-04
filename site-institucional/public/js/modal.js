var vezesClicadasUsuario = 0;
var vezesClicadasDashboard = 0;

function abrirModalUsuario(){
    vezesClicadasUsuario ++;
    var modal = modalUsuario;
    var ancora = svgUsuario;
    var botao = botaoAbrirModalUsuario.value; 

    if(vezesClicadasUsuario > 1){
        vezesClicadasUsuario = 0;
        ancora.style.fontWeight = "normal"
        ancora.style.opacity = "0.5";
        modal.style.display = "none";
    }else{
        ancora.style.fontWeight = "bold"
        ancora.style.opacity = "1";
        modal.style.display = "flex";
    }
}
function detalharDashboard(){
    var container = conteudoDetalhesDashboard;

    if(vezesClicadasDashboard == 1) {
        vezesClicadasDashboard = 0;
        container.style.display = "none";
        spanIconeDetalhar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>`;
    } else {
        window.onscroll = () => {
        spanIconeDetalhar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>`;

            container.style.display = "none";
            vezesClicadasDashboard = 0;
        };
        vezesClicadasDashboard++;
        container.style.display = "flex";
        spanIconeDetalhar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                        </svg>`;
        
    };

}