
export class Veiculo {
    
    id; // Será o mesmo do cliente
    marca;
    modelo;
    cor;
    placa;
    tipo;
    clienteId;

    constructor(clienteId, marca, modelo, cor, placa, tipo) {
        this.id = clienteId;
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.placa = placa;
        this.tipo = tipo;
        this.clienteId = clienteId;
    }

}