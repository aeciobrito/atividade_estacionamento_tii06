class Pessoa {
    constructor (nome, documento){
        if (new.target === Pessoa){
            throw new Error("Erro dados inválidos")
        }
        this.nome = nome
        this.documento = documento
    }
}