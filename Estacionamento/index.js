class Pessoa {
    constructor(nome, documento) {
      if (this.constructor === Pessoa) {
        throw new Error("Classe abstrata");
      }
      this.nome = nome;
      this.documento = documento;
    }
  }
  
  class Cliente extends Pessoa {
    constructor(id, nome, documento) {
      super(nome, documento);
      this.id = id;
      this.veiculos = [];
    }
  }
  
  class Funcionario extends Pessoa {
    constructor(nome, documento, matricula, cargo) {
      super(nome, documento);
      this.matricula = matricula;
      this.cargo = cargo;
    }
  }
  
  class Veiculo {
    constructor(placa, modelo, cor, tipo, clienteId) {
      this.placa = placa.toUpperCase();
      this.modelo = modelo;
      this.cor = cor;
      this.tipo = tipo;
      this.clienteId = clienteId;
    }
  }
  
  class RegistroEstacionamento {
    constructor(id, veiculo, cliente, horaEntrada) {
      this.id = id;
      this.veiculo = veiculo;
      this.cliente = cliente;
      this.horaEntrada = horaEntrada;
      this.horaSaida = null;
      this.valorCobrado = null;
    }
  }
  