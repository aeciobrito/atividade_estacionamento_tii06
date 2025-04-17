import { Pessoa } from "./Pessoa.js";

export class Cliente extends Pessoa {
    #id;
    #veiculos;

    constructor(id, veiculos) {
        super();
        this.#id = id;
        this.#veiculos = veiculos;
    }

    get id() { return this.#id }
    get veiculos() { return this.#veiculos }
}
