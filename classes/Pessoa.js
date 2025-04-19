export class Pessoa {
    #id;
    #nome;
    #documento;

    constructor(nome, documento) {
        this.#id = Pessoa.getNextId();
        this.#nome = nome;
        this.#documento = documento;
    }

    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get documento() { return this.#documento; }

    static getNextId() {
        let maxId = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            if (!isNaN(parseInt(chave))) {
                maxId = Math.max(maxId, parseInt(chave));
            }
        }
        return maxId + 1;
    }

    static fromJSON(json) {
        return new Pessoa(json.nome, json.documento);
    }

    // Função que transforma os dados para exibição
    toString() {
        return `Usuário: ${this.#nome}, Documento: ${this.#documento}`;
    }
}
