export class Pessoa {
  #nome;
  #documento;

  constructor(nome, documento) {
    if (new.target === Pessoa) {
      throw new Error("Pessoa é uma classe abstrata.");
    }
    this.#nome = nome;
    this.#documento = documento;
  }

  getNome() {
    return this.#nome;
  }

  setNome(nome) {
    this.#nome = nome;
  }

  getDocumento() {
    return this.#documento;
  }

  setDocumento(documento) {
    this.#documento = documento;
  }
}

