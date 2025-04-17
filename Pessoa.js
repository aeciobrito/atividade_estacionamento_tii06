class Pessoa {
    #nome;
    #cpf;

    constructor (nome, cpf) {

        this.#nome = nome;
        this.#cpf = cpf;
    }
}

class Cliente extends Pessoa {

    constructor (nome, cpf, id, veiculos) {
        super(nome, cpf);
        this.id = id;
        this.veiculos = veiculos;
    }
}

let c1 = new Cliente ("James", "123.234.345-34", 1, "Corsa");
console.log(c1.veiculos);