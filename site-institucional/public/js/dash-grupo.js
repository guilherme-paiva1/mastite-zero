var dataAtual = new Date()
        var diaAtual = dataAtual.getDate()
        var mesAtual = (dataAtual.getMonth() + 1)
        var anoAtual = dataAtual.getFullYear()

        titulo_dashboard_grupo.innerHTML = `Dados - ${diaAtual}/${mesAtual}/${anoAtual}`
        legenda_dashboard_grupo.innerHTML = `Dados do Grupo referente ao dia ${diaAtual}/${mesAtual}/${anoAtual}.`


// function mostrarGrupo(){

// }