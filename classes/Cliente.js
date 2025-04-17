import { Pessoa } from "./Pessoa.js";

export class Cliente extends Pessoa {
    #veiculos;

    constructor(nome, documento, veiculos) {
        super(nome, documento)
        this.#veiculos = veiculos;
    }

    get veiculos() { return this.#veiculos }
}
