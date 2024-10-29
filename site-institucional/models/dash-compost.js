var dataAtual = new Date()
        var diaAtual = dataAtual.getDate()
        var mesAtual = (dataAtual.getMonth() + 1)
        var anoAtual = dataAtual.getFullYear()

        titulo_dashboard_compost.innerHTML = `Dados - ${diaAtual}/${mesAtual}/${anoAtual}`
        legenda_dashboard_compost.innerHTML = `Dados do Compost Barn referente ao dia ${diaAtual}/${mesAtual}/${anoAtual}.`

        function mostrarFazenda(idFazenda) {
            dashFazenda.style.display = 'flex';
            dashCompost.style.display = 'none';
        }

        function mostrarGrupo (idGrupo) {
            dashGrupo.style.display = 'flex';
            dashCompost.style.display = 'none';
        }

        var sensorAnalogico = new Chart(document.getElementById('sensorAnalogico').getContext('2d'), {
            type: 'line',
            data: {
                labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                datasets: [{
                    label: 'Umidade',
                    borderColor: '#1F6A07',
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
                        color: '#1F6A07',
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
                labels: ["Valor acima do ideal", "Valor ideal"],
                datasets: [{
                    data: [30, 70],
                    backgroundColor: ["#fed859", "#1F6A07"]
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Relação de coletas do sensor',
                        color: '#1F6A07',
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
                    borderColor: '#1F6A07',
                    backgroundColor: '#1F6A07',
                    data: [53, 57, 49, 43, 51, 59, 65]
                }],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Umidade ideal x  Umidade média na semana',
                        color: '#1F6A07',
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
        Chart.defaults.elements.line.borderDash = [15, 5];
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