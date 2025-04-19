export function gerarId(chave) {
    const ultimoId = parseInt(localStorage.getItem(chave) || "0");
    const novoId = ultimoId + 1;
    localStorage.setItem(chave, novoId.toString());
    return novoId;
  }

