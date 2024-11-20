var reqFazenda = null;
var reqGrupo = null;


var dataAtual = new Date()
        var diaAtual = dataAtual.getDate()
        var mesAtual = (dataAtual.getMonth() + 1)
        var anoAtual = dataAtual.getFullYear()

        titulo_dashboard_compost.innerHTML = ` - ${diaAtual}/${mesAtual}/${anoAtual}`
        // legenda_dashboard_compost.innerHTML = `Dados do Compost Barn referente ao dia ${diaAtual}/${mesAtual}/${anoAtual}.`

        function mostrarFazenda(idFazenda) {
            if (idFazenda == "#") {
                selectCompost.disabled = true;
                selectGrupo.disabled = true;
                dashCompost.style.display = 'none';
                telaInicial.style.display = 'flex';
                dashFazenda.style.display = 'none';
                dashGrupo.style.display = 'none';
                selectCompost.value = '#';
                selectGrupo.value = '#';
            } else {
                sessionStorage.FK_FAZENDA = idFazenda;
                listarPorFazenda(sessionStorage.FK_FAZENDA); 
                selectCompost.disabled = false;
                dashFazenda.style.display = 'flex';
                dashCompost.style.display = 'none';
                telaInicial.style.display = 'none';
                dashGrupo.style.display = 'none';
                selectCompost.value = '#';
                selectGrupo.value = '#';
                var fkEmpresa = sessionStorage.FK_EMPRESA;
                
                if(fkEmpresa == null || fkEmpresa == undefined){
                    // location.replace("/cadastrar.html");
                }else{
                    var idFazenda = document.getElementById("selectFazenda").value;
<<<<<<< HEAD

                        if(reqFazenda != null){
                            clearInterval(reqFazenda);
                        }
                        if(reqGrupo != null){
                            clearInterval(reqGrupo);
                        }
                        reqFazenda = setInterval(()=> {
                            buscarDadosFazenda(fkEmpresa, idFazenda);
=======
                    
                    if(reqFazenda != null){
                        clearInterval(reqFazenda);
                    }
                    reqFazenda = setInterval(()=> {
                        buscarDadosFazenda(fkEmpresa, idFazenda);
>>>>>>> b5fc441ef3b0ea8489ef026152776f621ce79aad
                        }, 2000);
                    }
                }
            }
<<<<<<< HEAD
        function mostrarGrupo (nome) {
            if (nome == "#") {
=======
            function mostrarGrupo (idGrupo) {
            if (idGrupo == "#") {
>>>>>>> b5fc441ef3b0ea8489ef026152776f621ce79aad
                mostrarCompost(selectCompost.value);
                selectGrupo.value = '#';
            } else {
                selectGrupo.disabled = false;
                spanNumeroGrupo.innerHTML = `Grupo ${nome}`;
                dashFazenda.style.display = 'none';
                dashCompost.style.display = 'none';
                dashGrupo.style.display = 'flex';

                if(reqFazenda != null){
                    clearInterval(reqFazenda);
                } 

                reqGrupo = setInterval(() => {
                    buscarDadosGrupo(nome)
                }, 2000);


            }
        }

        var sensorAnalogico = new Chart(document.getElementById('sensorAnalogico').getContext('2d'), {
            type: 'line',
            data: {
                labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                datasets: [{
                    label: 'Umidade',
                    borderColor: "#22603A",
                    data: [47, 45, 50, 55, 61, 56, 48, 63, 61, 58, 53, 50, 46, 40, 37, 33, 39, 45, 47, 45, 50, 55, 59]
                }, {
                    label: 'Umidade máxima (60%)',
                    borderColor: '#b41b1b',
                    backgroundColor: '#b41b1b',
                    data: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
                }, {
                    label: 'Umidade mínima (40%)',
                    borderColor: '#b41b1b',
                    backgroundColor: '#b41b1b',
                    data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Variação de umidade por hora',
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
                        align: 'center'
                    }
                },
                
                scales: {
                    x: {
                        beginAtZero: false,
                        ticks: {
                            color: "#fffff"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '(%)',
                        },
                        beginAtZero: false
                    },
                },
            }
        });

        var relacaoColetas = new Chart(document.getElementById('relacaoColetas').getContext('2d'), {
            type: 'pie',
            data: {
                labels: ["Valor acima do ideal","Valor ideal"],
                datasets: [{
                    data: [30, 70],
                    backgroundColor: ["#fed859", "#22603A"]
                }]
            }, 
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Relação de coletas do sensor',
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
                        align: 'center'
                    }
                },
            }
        });
        
        
        var umiMediaSemana = new Chart(document.getElementById('umiMediaSemana').getContext('2d'), {
            data: {
                labels: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
                datasets: [{
                    type: 'line',
                    label: 'Umidade máxima (60%)',
                    borderColor: '#b41b1b',
                    backgroundColor: '#b41b1b',
                    data: [60, 60, 60, 60, 60, 60, 60]
                }, {
                    type: 'line',
                    label: 'Umidade mínima (40%)',
                    borderColor: '#b41b1b',
                    backgroundColor: '#b41b1b',
                    data: [40, 40, 40, 40, 40, 40, 40]
                },{
                    type: 'bar',
                    label: 'Umidade média do CB',
                    borderColor: "#22603A",
                    backgroundColor: "#22603A",
                    data: [53, 57, 49, 43, 51, 59, 65]
                }],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Umidade ideal x  Umidade média na semana',
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
        });
        // Deixa as linhas do gráfico tracejadas e define o tamanho (15) e o espaço entre elas (5)
        // Chart.defaults.elements.line.borderDash = [15, 5];
        // Tira os pontos das linhas do gráfico
        Chart.defaults.elements.point.pointStyle = false;
        
        var paginacao = {};
        var tempo = {};
        
        /*  function obterDados(grafico, endpoint) {
            fetch('http://localhost:3300/sensores/' + endpoint)
            .then(response => response.json())
            .then(valores => {
                if (paginacao[endpoint] == null) {
                    paginacao[endpoint] = 0;
                    }
                    if (tempo[endpoint] == null) {
                        tempo[endpoint] = 0;
                        }
                        
                        var ultimaPaginacao = paginacao[endpoint];
                        paginacao[endpoint] = valores.length;
                        valores = valores.slice(ultimaPaginacao);
                        
                        valores.forEach((valor) => {
                            if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
                                grafico.data.labels.shift();
                                grafico.data.datasets[0].data.shift();
                         }
 
                         grafico.data.labels.push(tempo[endpoint]++);
                         grafico.data.datasets[0].data.push(parseFloat(valor));
                         grafico.update();
                         });
                         })
                         .catch(error => console.error('Erro ao obter dados:', error));
                         }
                         
                         setInterval(() => {
                            obterDados(sensorAnalogico, 'analogico');
                            }, 1500); */
                            
                            async function buscarDadosFazenda(fkEmpresa, idFazenda){
    console.log(idFazenda);
    fetch(`/fazendas/buscar/${fkEmpresa}/${idFazenda}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        }).then((resposta) => {
            if(resposta.ok){
                if(resposta.status == 204){
                    qtdCompost.innerHTML = "Nenhum sensor cadastrado na atual fazenda.";
                    alertasSessenta.innerHTML = "Nenhum sensor cadastrado na atual fazenda."; 
                    alertasQuarentaECinco.innerHTML = "Nenhum sensor cadastrado na atual fazenda.";
                    umidadeMedia.innerHTML = "Nenhum sensor cadastrado na atual fazenda."; 
            }else{
                resposta.json().then((dados)=> {
                    for (var index = 0; index < dados.length; index++) {
                        var dado = dados[index];
                        var umidade = Number(dado.umidadeAtual);
                        console.log(dado);  
                        qtdCompost.innerHTML = dado.qtdCompost;
                        alertasSessenta.innerHTML = dado.alertasSessenta;
                        alertasQuarentaECinco.innerHTML = dado.alertasQuarentaECinco;

                        if(umidade > 60 || umidade < 40){
                            situacaoFazenda.innerHTML = "Alerta";
                            situacaoFazenda.style.color = "red";
                        }else{
                            situacaoFazenda.innerHTML = "OK";
                            situacaoFazenda.style.color = "green";
                        }

                        if(dado.umidadeMedia == null){
                            umidadeMedia.innerHTML = "0%"
                        }else{
                            umidadeMedia.innerHTML = `${Number(dado.umidadeMedia).toFixed(2)}%`
                        }
                    }                    
                })
            }

        }else{
            console.log("Deu tudo errado")
        }
    }).catch((erro) => {
        console.log(erro);
        });
    }
async function buscarDadosGrupo(grupo){
    fetch(`/dados_sensor/ultimas/${grupo}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resposta) => {
        if(resposta.ok){
            if(resposta.status == 204){
                // qtdCompost.innerHTML = "Nenhum sensor cadastrado na atual fazenda.";
                // alertasSessenta.innerHTML = "Nenhum sensor cadastrado na atual fazenda."; 
                // alertasQuarentaECinco.innerHTML = "Nenhum sensor cadastrado na atual fazenda.";
                // umidadeMedia.innerHTML = "Nenhum sensor cadastrado na atual fazenda."; 
            }else{
                resposta.json().then((dados)=> {
                    console.log(`Dados do grupo de sensor ${dados}`)

                    for (var index = 0; index < dados.length; index++) {
                        var dado = dados[index];                     
                        kpiSensoresFora.innerHTML = dado.sensoresFora;
                        kpiMediaGrupo.innerHTML = dado.mediaGrupo;
                    }                    
                })
            }

        }else{
            console.log("Deu tudo errado")
        }
        }).catch((erro) => {
        console.log(erro);
        });
}
