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

    // função necessária para buscar todos os usuários
    static fromJSON(json) {
        const pessoa = new Pessoa(json.nome, json.documento);
        pessoa.#id = json.id;
        return pessoa;
    }

    // função que transforma os dados e os permite ser lidos na tela
    toString() {
        let mensagem = `Usuário: ${this.#nome}, Documento ${this.#documento}`;
        return mensagem;
    }
}