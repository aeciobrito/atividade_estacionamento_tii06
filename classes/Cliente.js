import { Pessoa } from "./Pessoa.js";
import { Veiculo } from "./Veiculo.js";

export class Cliente extends Pessoa {
    _id;
    #veiculos = [];

    constructor(nome, documento, veiculos = []) {
        super(nome, documento)
        this._id = Cliente.getNextId();
        this.#veiculos = veiculos;
    }

    atualizarDados(nome, documento, veiculos) {
        if(!nome || !documento || !veiculos) {
            throw new Error("Dados Inválidos para Atualização");
        }
        super.nome = nome;
        super.documento = documento;
        this.#veiculos = veiculos;
    }

    get id() { return this._id; }
    get veiculos() { return this.#veiculos }

    // define o próximo id
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

    // adiciona o veículo ao cliente correto
    adicionarVeiculo(veiculo) {
        if (veiculo.clienteId === this._id) {
            this.#veiculos.push(veiculo);
        } else {
            throw new Error("Este veículo não pertence a este cliente.");
        }
    }


    // passa as informações para serem lidas na tela
    toString() {
        const veiculosInfo = this.#veiculos.map(v => 
            `Placa: ${v.placa}, Modelo: ${v.modelo}, Cor: ${v.cor}, Tipo: ${v.tipo}`
        ).join(" | ");
        
        return `Cliente: ${this.nome}, Documento: ${this.documento}, Veículos: [${veiculosInfo}]`;
    }
    
    static fromJSON(json) {
        const cliente = new Cliente(json.nome, json.documento);
        cliente._id = json.id;
    
        (json.veiculos || []).forEach(v => {
            const veiculo = new Veiculo(v.placa, v.modelo, v.cor, v.tipo, json.id);
            cliente.adicionarVeiculo(veiculo);
        });
    
        return cliente;
    }
    
    
    // função usada para fornecer os dados para o BD conseguir salvar corretamente
    toJSON() {
        const dados = {
            id: this.id,
            nome: this.nome,
            documento: this.documento,
            _tipo: "cliente",
            veiculos: this.veiculos.map(v => ({
                placa: v.placa,
                modelo: v.modelo,
                cor: v.cor,
                tipo: v.tipo,
                clienteId: v.clienteId
            }))
        };
        return dados;
    }
}
