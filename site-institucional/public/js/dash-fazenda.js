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
        sessionStorage.FK_FAZENDA = selectFazenda.value;
        selectGrupo.disabled = false;
        dashCompost.style.display = 'flex';
        dashFazenda.style.display = 'none';
        dashGrupo.style.display = 'none';
        selectGrupo.value = '#';
        
        
        var fkEmpresa = sessionStorage.FK_EMPRESA;
        var fkFazenda = Number(document.getElementById("selectFazenda").value);
        
        
        if (fkEmpresa == null || fkEmpresa == undefined) {
            // location.replace("/cadastrar.html");
        } else {
            var idCompost = Number(document.getElementById("selectCompost").value);
            console.log(idCompost);
            
            if (reqCompost != null) {
                clearInterval(reqCompost);
            }

            reqCompost = setInterval(() => {
                buscarDadosCompost(fkFazenda, idCompost);
            }, 2000);
        }
    }
}

async function buscarDadosCompost(idFazenda, idCompost) {
    console.log(idFazenda);
    await fetch(`/compost/buscar/${idCompost}/${idFazenda}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {
        if (resposta.ok) {
            if (resposta.status == 204) {
                kpiMaiorNivelRegistrado.innerHTML = "Sem sensores na atual compost barn";
                kpiMaiorNivelRegistrado.innerHTML = "Sem sensores na atual compost barn";
                kpiNivelMedioRegistrado.innerHTML = "Sem sensores na atual compost barn";
                kpiNivelMinimoRegistrado.innerHTML = "Sem sensores na atual compost barn";
                
                kpiSensoresAcima.innerHTML = "Sem sensores na atual compost barn";
                kpiTotalAlertas.innerHTML = "Sem sensores na atual compost barn";
            } else {
                resposta.json().then((dados) => {
                    for (var index = 0; index < dados.length; index++) {
                        var dado = dados[index];
                        // var umidadeAtual = dado.umidadeAtual;
                        console.log(dado);

                        // if(umidadeAtual > 60 || umidadeAtual < 40){
                        //     situacaoCompost.innerHTML = "Alerta";
                        //     situacaoCompost.style.color = "red";
                        // }else{
                        //     situacaoCompost.innerHTML = "OK";
                        //     situacaoCompost.style.color = "green";
                        // }

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
        } else {
            console.log("Deu tudo errado")
        }
    }).catch((erro) => {
        console.log(erro);
    })
}

function listarPorFazenda(idFazenda) {
    console.log('No front:' + idFazenda);
    fetch("/compost/listarPorFazenda", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idFazendaServer: idFazenda
        })
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            resposta.json().then(json => {
                var tamanho_lista = json.length;
                var estrutura = '<option selected value="#">Selecione um Compost Barn</option>';
                
                for (var i = 0; i < tamanho_lista; i++) {
                    var idCompost = json[i].id_cb;
                        var apelidoCompost = json[i].apelido;

                        estrutura += 
                        `<option value="${idCompost}">${apelidoCompost}</option>`;
                        spanNumeroCompost.innerHTML = `Compost ${apelidoCompost}`;
                    }
                    spanNumeroFazenda.innerHTML = `Fazenda ${idFazenda}`;

                    selectCompost.innerHTML = estrutura;
                });

            } else {
                console.log('Não listou os composts');
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}
