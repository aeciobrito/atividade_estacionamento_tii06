import { Pessoa } from "./Pessoa.js";

class Funcionario extends Pessoa {
    #nome;
    #matricula;
    #cargo;

    constructor(nome, matricula, cargo) {
        super();
        this.#nome = nome;
        this.#matricula = matricula;
        this.#cargo = cargo;
    }
}