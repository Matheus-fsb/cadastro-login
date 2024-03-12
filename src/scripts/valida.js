function valida() {

    let senha = document.getElementById('senha');
    senha = senha.value;
    let senhaValidacao = document.getElementById('senhaValidacao');
    senhaValidacao = senhaValidacao.value;

    if (senha == senhaValidacao) {
        return true;
    }
    else {
        return false;
    }
}

exports.valida = valida;
