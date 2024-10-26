var dataAtual = new Date()
        var diaAtual = dataAtual.getDate()
        var mesAtual = (dataAtual.getMonth() + 1)
        var anoAtual = dataAtual.getFullYear()

        titulo_dashboard_fazenda.innerHTML = `Dados - ${diaAtual}/${mesAtual}/${anoAtual}`
        legenda_dashboard_fazenda.innerHTML = `Nessa página você terá acesso aos dados do seu negócio referente ao dia ${diaAtual}/${mesAtual}/${anoAtual}.`

        function mostrarCompost(idCompost) {
            dashCompost.style.display = 'flex';
            dashFazenda.style.display = 'none';
        }
