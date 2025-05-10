import { Cliente } from "./Cliente.js";
export class Veiculo {
    #placa;
    #modelo;
    #cor;
    #tipo;
    #clienteId;

    constructor(placa, modelo, cor, tipo, clienteId) {
        this.#placa = placa;
        this.#modelo = modelo;
        this.#cor = cor;
        this.#tipo = tipo;
        this.#clienteId = clienteId;
    }

    get placa() {return this.#placa}
    get modelo() {return this.#modelo}
    get cor() {return this.#cor}
    get tipo() {return this.#tipo}
    get clienteId() {return this.#clienteId}

    set clienteId(valor) {
        this.#clienteId = valor;
    }

    toString() {
        return `${this.tipo.toUpperCase()} - ${this.modelo} (${this.placa})`;
    }
    
}