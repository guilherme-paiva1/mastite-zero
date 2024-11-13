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
    }
}

var graficoBarraFazenda = new Chart(document.getElementById('grafico_fazenda').getContext('2d'), {
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
})
