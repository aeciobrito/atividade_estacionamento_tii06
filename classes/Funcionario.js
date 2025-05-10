import { Pessoa } from "./Pessoa.js";

export class Funcionario extends Pessoa {
    _id;
    #matricula;
    #cargo;

    constructor(nome, documento, matricula, cargo) {
        super(nome, documento);
        this._id = Funcionario.getNextId();
        this.#matricula = matricula;
        this.#cargo = cargo;
    }

    get id() { return this._id; }
    get matricula() { return this.#matricula; }
    get cargo() { return this.#cargo; }

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

    toString() {
        return `Funcionário: ${this.nome}, Documento: ${this.documento}, Matrícula: ${this.matricula}, Cargo: ${this.cargo}`;
    }

    // Método estático para converter de JSON para Funcionario
    static fromJSON(json) {
        const funcionario = new Funcionario(json.nome, json.documento, json.matricula, json.cargo);
        funcionario._id = json.id
        return funcionario;
    }

    toJSON() {
        return {
            id: this.id, 
            nome: this.nome,
            documento: this.documento,
            _tipo: "funcionario",
            matricula: this.matricula,
            cargo: this.cargo
        };
    }

    atualizarDados(nome, documento, matricula, cargo) {
        if(!nome || !documento || !matricula || !cargo) {
            throw new Error("Dados Inválidos para Atualização");
        }
        super.nome = nome;
        this.#matricula = matricula;
        this.#cargo = cargo;
    }
}