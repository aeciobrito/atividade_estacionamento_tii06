
export function salvarNoStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function carregarDoStorage(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

