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
        let mensagem = `Funcionário: ${this.nome}, Documento: ${this.documento}, Matrícula: ${this.matricula}, Cargo: ${this.cargo}`;
        return mensagem;
    }

    static fromJSON(json) {
        const funcionario = new Funcionario(json.nome, json.documento, json.matricula, json.cargo);
        funcionario._id = json.id;
        return funcionario;
    }
    
    // função usada para fornecer os dados para o BD conseguir salvar corretamente
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            documento: this.documento,
            tipo: "funcionario",
            matricula: this.matricula,
            cargo: this.cargo
        };
    }
}