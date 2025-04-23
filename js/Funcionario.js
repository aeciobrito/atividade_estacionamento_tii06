import {Pessoa} from "./Pessoa.js"

export class Funcionario extends Pessoa {
    #matricula;
    #cargo;

    constructor(nome, documento, matricula, cargo) {
        super(nome, documento);
        this.#matricula = matricula;
        this.#cargo = cargo;
    }

    get matricula() {
        return this.#matricula;
    }

    get cargo() {
        return this.#cargo;
    }

    set matricula(matricula) {
        this.#matricula = matricula;
    }

    set cargo(cargo) {
        this.#cargo = cargo;
    }


}