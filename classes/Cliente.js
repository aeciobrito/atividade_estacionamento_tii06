import { Pessoa } from "./Pessoa.js";

export class Cliente extends Pessoa {
    static #proximoId = 1; // id incremental
    #id;
    #veiculos = [];

    constructor(nome, documento, veiculos = []) {
        super(nome, documento)
        this.#veiculos = veiculos;
        this.#id = Cliente.#proximoId++;
    }

    get id() { return this.#id; }
    get veiculos() { return this.#veiculos }

    adicionarVeiculo(veiculo) {
        if (veiculo.clienteId === this.#id) {
            this.#veiculos.push(veiculo);
        } else {
            throw new Error("Este veículo não pertence a este cliente.");
        }
    }

    toString() {
        return `Cliente ${this.nome}, ID: ${this.id}, Veículos: ${this.veiculos.length}`;
    }
    
}
