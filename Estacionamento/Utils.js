function salvarLocalStorage(chave, valor){
    localStorage.setItem(chave, JASON.stringfy(valor));
}
function carregarLocalStorage(chave){
    return JASON.parse(localStorage.getItem(chave));
}