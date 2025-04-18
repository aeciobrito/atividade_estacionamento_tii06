import { Pessoa } from "./Pessoa.js";

export class Cliente extends Pessoa {
    #id;
    #veiculos = [];

    constructor(nome, documento, veiculos = []) {
        super(nome, documento)
        this.#id = Cliente.getNextId();
        this.#veiculos = veiculos;
    }

    get id() { return this.#id; }
    get veiculos() { return this.#veiculos }

    static getNextId() {
        let maxId = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);

            if (!isNaN(parseInt(chave))) {
                maxId = Math.max(maxId, parseInt(chave));
            }
        }
        return maxId + 1;
    }

    adicionarVeiculo(veiculo) {
        if (veiculo.clienteId === this.#id) {
            this.#veiculos.push(veiculo);
        } else {
            throw new Error("Este veículo não pertence a este cliente.");
        }
    }

    toString() {
        const veiculosInfo = this.#veiculos.map(v => 
            `Placa: ${v.placa}, Modelo: ${v.modelo}, Cor: ${v.cor}, Tipo: ${v.tipo}`
        ).join(" | ");
        
        return `Cliente: ${this.nome}, Documento: ${this.documento}, Veículos: [${veiculosInfo}]`;
    }

    restaurarId(id) {
        this.#id = id;
    }

    static fromJSON(json, veiculos = []) {
        const cliente = new Cliente(json.nome, json.documento, veiculos);
        cliente.restaurarId(json.id);
        return cliente;
    }
    
}
