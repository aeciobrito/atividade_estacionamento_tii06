import { Cliente } from "./Cliente.js";
class Veiculo {
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
}

let c1 = new Cliente(1, "Civic")

let v1 = new Veiculo("abc-1234", "Civic", "Preto", "Carro", c1.id)
console.log(v1.clienteId)