import { Pessoa } from "./Pessoa.js";

export class Cliente extends Pessoa {
    #veiculos;

    constructor(id, veiculos) {
        super();
        this.#veiculos = veiculos;
    }

    get veiculos() { return this.#veiculos }
}
