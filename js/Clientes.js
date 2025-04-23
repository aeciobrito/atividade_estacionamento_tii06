import { gerarId } from "./Utils.js";
import { Pessoa } from "./Pessoa.js";

export class Cliente extends Pessoa {
    #id;
    #veiculos;

    constructor(nome, documento, veiculo = []) {
        super(nome, documento);
        this.#id = gerarId('cliente-');
        this.#veiculos = [];
    }

    getId() {
        return this.#id;
    }

    getVeiculos() {
        return this.#veiculos;
    }
}