import { Pessoa } from "../classes/Pessoa.js";
import { Cliente } from "../classes/Cliente.js";
import { Funcionario } from "../classes/Funcionario.js";
import { Veiculo } from "../classes/Veiculo.js";

export class BancoDeDados {
    static salvar(pessoa) {
        const dados = pessoa.toJSON(); // Delegar a responsabilidade de como os dados são serializados para a própria classe
        
        localStorage.setItem(pessoa.id, JSON.stringify(dados)); // Salvar no localStorage
    }
    
    static buscarTodos() {
        const usersCadastrados = [];
    
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
    
            if (!isNaN(parseInt(chave))) {
                const dados = JSON.parse(localStorage.getItem(chave));
    
                const pessoa = BancoDeDados.instanciarPessoa(dados);
                usersCadastrados.push(pessoa);
            }
        }
    
        return usersCadastrados.sort((a, b) => a.id - b.id);
    }
    
    static buscarPorId(id) {
        const pessoaJSON = localStorage.getItem(id);
        if (!pessoaJSON) return null;
    
        const dados = JSON.parse(pessoaJSON);
        return BancoDeDados.instanciarPessoa(dados);
    }    

    static instanciarPessoa(dados) {
        switch (dados.tipo) {
            case "cliente":
                return Cliente.fromJSON(dados);
            case "funcionario":
                return Funcionario.fromJSON(dados);
            default:
                return Pessoa.fromJSON(dados);
        }
    }    
}
