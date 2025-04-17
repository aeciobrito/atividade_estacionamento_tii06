import { Pessoa } from "../classes/Pessoa.js"

export class BancoDeDados {
    // CREATE
    static salvar(pessoa) {
        localStorage.setItem(pessoa.id, JSON.stringify({
            id: pessoa.id,
            nome: pessoa.nome,
            documento: pessoa.documento,
        }));
    }

    static buscarTodos() {
        const usersCadastrados = [];
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);

            if(!isNaN(parseInt(chave))) {
                const dados = JSON.parse(localStorage.getItem(chave));
                usersCadastrados.push(Pessoa.fromJSON(dados))
            }
        }
        return usersCadastrados.sort((a, b) => a.id - b.id);
    }
}