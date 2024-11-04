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
    }
}
