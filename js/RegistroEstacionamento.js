import { Utils } from "./Utils.js";

export class RegistroEstacionamento {
    #id;
    #veiculo;
    #cliente;
    #horaEntrada
    #horaSaida;
    #valorCobrado;

    constructor(veiculo, cliente) {
        this.#id = Utils.getProximoId("registro_");
        this.#veiculo = veiculo;
        this.#cliente = cliente;
        this.#horaEntrada = new Date();
        this.#horaSaida = null;
        this.#valorCobrado = null;
    }

    get id() {
        return this.#id;
    }

    get veiculo() {
        return this.#veiculo;
    }

    get cliente() {
        return this.#cliente;
    }

    get horaEntrada() {
        return this.#horaEntrada;
    }

    get horaSaida() {
        return this.#horaSaida;
    }

    get valorCobrado() {
        return this.#valorCobrado;
    }

    // Finalização da Saída
    finalizarSaida() {
        this.#horaSaida = new Date();
        const tempoEstacionado = (this.#horaSaida - this.#horaEntrada) / 3600000; //Em horas
        const primeiraHora = 10; //Valor de R$10,00 pela 1ª hora
        const valorAdicional = 5; //Adiciona R$5,00 por hora cheia adicional

        this.#valorCobrado = primeiraHora + Math.max(0, Math.ceil(tempoEstacionado - 1) * valorAdicional);
    }
}