export class RegistroEstacionamento {
    #id;
    #veiculo;
    #cliente;
    #horaEntrada;
    #horaSaida;
    #valorCobrado;

    constructor(veiculo, cliente, horaEntrada = new Date(), horaSaida = null, valorCobrado = null) {
        this.#id = veiculo?.placa ?? Date.now();
        this.#veiculo = veiculo;
        this.#cliente = cliente;
        this.#horaEntrada = horaEntrada;
        this.#horaSaida = horaSaida;
        this.#valorCobrado = valorCobrado;
    }

    getHoraEntrada() { return this.#horaEntrada; }
    getHoraSaida() { return this.#horaSaida; }
    getValorCobrado() { return this.#valorCobrado; }

    estacionar(veiculo, cliente) {
        this.#veiculo = veiculo;
        this.#cliente = cliente;
        this.#horaEntrada = new Date();
        this.#horaSaida = null;
        this.#valorCobrado = null;

        alert(`O cliente ${cliente.nome} estacionou o veículo ${veiculo.placa} às ${this.#horaEntrada.toLocaleString()}`);
    }

    saida(horaSaida = new Date()) {
        this.#horaSaida = horaSaida;
        const diferencaMs = this.#horaSaida - this.#horaEntrada;
        const diferencaHoras = Math.ceil(diferencaMs / (1000 * 60 * 60));
        const valor = 10 + (diferencaHoras > 0 ? diferencaHoras * 5 : 0);
        this.#valorCobrado = valor;

        alert(`O cliente ${this.#cliente.nome} saiu com o veículo ${this.#veiculo.placa}. Tempo: ${diferencaHoras}h. Valor: R$ ${valor}`);
    }

    toJSON() {
        return {
            id: this.#id,
            veiculo: {
                placa: this.#veiculo.placa,
                modelo: this.#veiculo.modelo,
                cor: this.#veiculo.cor,
                tipo: this.#veiculo.tipo
            },
            cliente: {
                id: this.#cliente.id,
                nome: this.#cliente.nome,
                documento: this.#cliente.documento
            },
            horaEntrada: this.#horaEntrada,
            horaSaida: this.#horaSaida,
            valorCobrado: this.#valorCobrado
        };
    }

    static fromJSON(json) {
        const veiculo = new Veiculo(json.veiculo.placa, json.veiculo.modelo, json.veiculo.cor, json.veiculo.tipo, json.cliente.id);
        const cliente = new Cliente(json.cliente.nome, json.cliente.documento, [veiculo]);
        cliente._id = json.cliente.id;
        return new RegistroEstacionamento(veiculo, cliente, new Date(json.horaEntrada), json.horaSaida ? new Date(json.horaSaida) : null, json.valorCobrado);
    }
}
