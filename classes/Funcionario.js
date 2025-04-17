import { Pessoa } from "./Pessoa.js";

export class Funcionario extends Pessoa {
    #matricula;
    #cargo;

    constructor(nome, documento, matricula, cargo) {
        super(nome, documento); // pega da classe pessoa e passa para funcionario
        this.#matricula = matricula;
        this.#cargo = cargo;
    }

    get matricula() { return this.#matricula; }
    get cargo() { return this.#cargo; }

    toString() {
        let mensagem = ` ID: ${this.id}, Usuário: ${this.nome}, Documento: ${this.documento}, Matrícula: ${this.matricula}, Cargo :${this.cargo}`;
        return mensagem;
    }
}