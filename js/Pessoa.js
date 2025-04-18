export default class Pessoa {
    #nome;
    #documento;

    constructor (nome, documento) {

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

