export class Pessoa {
    #nome;
    #documento;
 
    constructor(nome, documento) {
        if (!nome || !documento) {
            throw new Error("Nome e documento são obrigatórios.");
        }
 
        this.#nome = nome;
        this.#documento = documento;
    }
   
    get nome() { return this.#nome; }
    get documento() { return this.#documento; }
 
    toString() {
        return `Nome: ${this.#nome}, Documento: ${this.#documento}`;
    }
}
 
class Cliente extends Pessoa {
    constructor(nome, documento, clienteID) {
        super(nome, documento);
        this.clienteID = clienteID;
    }
}
 
class Funcionario extends Pessoa {
    constructor(nome, idade, matricula, cargo) {
      super(nome, idade);
      this.matricula = matricula;
      this.cargo = cargo;
    }
 
    exibirDadosFuncionario() {
      return `${this.nome} ${this.matricula} ${this.cargo}.`;
    }
  }
 
export class Veiculo {
  constructor(placa, modelo, cor, tipo, clienteId) {
    this.placa = placa;      
    this.modelo = modelo;  
    this.cor = cor;        
    this.tipo = tipo;      
    this.clienteId = clienteId;  
  }
 
  exibirInfoVeiculo() {
    console.log(` Placa ${this.placa}`);
    console.log(` Modelo ${this.modelo}`);
    console.log(` Cor ${this.cor}`);
    console.log(` Tipo ${this.tipo}`);
    console.log(` ClienteID: Dono do veículo ${this.clienteId}`);
  }
}
 
const veiculo1 = new Veiculo();
veiculo1.exibirInfoVeiculo();
 