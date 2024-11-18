var reqCompost = null;

var dataAtual = new Date()
var diaAtual = dataAtual.getDate()
var mesAtual = (dataAtual.getMonth() + 1)
var anoAtual = dataAtual.getFullYear()

titulo_dashboard_fazenda.innerHTML = `Dados - ${diaAtual}/${mesAtual}/${anoAtual}`
legenda_dashboard_fazenda.innerHTML = `Dados da fazenda referente ao dia ${diaAtual}/${mesAtual}/${anoAtual}.`

function mostrarCompost(idCompost) {

    if (idCompost == "#") {
        selectCompost.disabled = true;
        selectGrupo.disabled = true;
        mostrarFazenda(selectFazenda.value);
    } else {
        selectGrupo.disabled = false;
        spanNumeroCompost.innerHTML = `Compost ${idCompost}`;
        dashCompost.style.display = 'flex';
        dashFazenda.style.display = 'none';
        dashGrupo.style.display = 'none';
        selectGrupo.value = '#';


        var fkEmpresa = sessionStorage.getItem("FK_EMPRESA");
        var fkFazenda = Number(document.getElementById("selectFazenda").value);


                if(fkEmpresa == null || fkEmpresa == undefined){
                    // location.replace("/cadastrar.html");
                }else{
                    var idCompost = Number(document.getElementById("selectCompost").value);
                        console.log(idCompost);

                        if(reqCompost != null){
                            clearInterval(reqCompost);
                        }

                        reqCompost = setInterval(()=> {
                            buscarDadosCompost(fkFazenda,idCompost);
                        }, 2000);   
                    }
                }
            }

var graficoBarraFazenda = new Chart(document.getElementById('grafico_fazenda').getContext('2d'), {
    data: {
        labels: ["Compost Barn 1", "Compost Barn 2", "Compost Barn 3", "Compost Barn 4"],
        datasets: [{
            type: 'bar',
            label: 'Umidade média Fazenda',
            borderColor: "#22603A",
            backgroundColor: "#22603A",
            data: [53, 57, 49, 43, 51, 59, 65]
        }],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Umidade média dos Compost Barns (%)',
                color: "#22603A",
                font: {
                    size: 24,
                    weight: 'bold',
                    family: 'Poppins'
                },
                padding: {
                    top: 10,
                    bottom: 30
                },
                align: 'center',
            }
        },
    }
})

async function buscarDadosCompost(idFazenda,idCompost){
    console.log(idFazenda);
    await fetch(`/compost/buscar/${idCompost}/${idFazenda}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        }).then((resposta) => {
        if(resposta.ok){
            if(resposta.status == 204){
                kpiMaiorNivelRegistrado.innerHTML = "Sem sensores na atual compost barn"; 
                kpiMaiorNivelRegistrado.innerHTML = "Sem sensores na atual compost barn";
                kpiNivelMedioRegistrado.innerHTML = "Sem sensores na atual compost barn";
                kpiNivelMinimoRegistrado.innerHTML = "Sem sensores na atual compost barn";
                
                kpiSensoresAcima.innerHTML =  "Sem sensores na atual compost barn";
                kpiTotalAlertas.innerHTML =  "Sem sensores na atual compost barn";
            }else{
                resposta.json().then((dados)=> {
                    for (var index = 0; index < dados.length; index++) {
                        var dado = dados[index];
    
                        console.log(dado);
    
                        kpiMaiorNivelRegistrado.innerHTML = `${Number(dado.umidadeMaxima).toFixed(2)}% ás `;
                        kpiMaiorNivelRegistrado.innerHTML += dado.dataUmidadeMaxima.substring(11, 19);
                        kpiNivelMedioRegistrado.innerHTML = `${Number(dado.nivelMedio).toFixed(2)}%`;
                        kpiNivelMinimoRegistrado.innerHTML = `${Number(dado.nivelMinimo).toFixed(2)}%`;
                        
                        kpiSensoresAcima.innerHTML = dado.sensoresAcima;
    
                        kpiTotalAlertas.innerHTML = dado.qtdAlertas;
    
                       /*  if(dado.umidadeMedia == null){
                            umidadeMedia.innerHTML = "0%"
                        }else{
                            umidadeMedia.innerHTML = `${Number(dado.umidadeMedia).toFixed(2)}%`
                        } */
                    } 
                   console.log(dados);
                })
            }
        }else{
            console.log("Deu tudo errado")
        }
        }).catch((erro) => {
        console.log(erro);
        })
}