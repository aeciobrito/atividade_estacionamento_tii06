import { Pessoa } from "../classes/Pessoa.js";
import { Cliente } from "../classes/Cliente.js";
import { Funcionario } from "../classes/Funcionario.js";
import { Veiculo } from "../classes/Veiculo.js";

export class BancoDeDados {
    static salvar(pessoa) {
        let dados = {
            id: pessoa.id,
            nome: pessoa.nome,
            documento: pessoa.documento
        };

        if (pessoa instanceof Cliente) {
            dados.tipo = "cliente";
            dados.veiculos = pessoa.veiculos.map(v => ({
                placa: v.placa,
                modelo: v.modelo,
                cor: v.cor,
                tipo: v.tipo,
                clienteId: v.clienteId
            }));
        } else if (pessoa instanceof Funcionario) {
            dados.tipo = "funcionario";
            dados.matricula = pessoa.matricula;
            dados.cargo = pessoa.cargo;
        } else {
            dados.tipo = "pessoa"; // fallback
        }

        localStorage.setItem(pessoa.id, JSON.stringify(dados));
    }

    // READ
    static buscarTodos() {
        const usersCadastrados = [];

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);

            if (!isNaN(parseInt(chave))) {
                const dados = JSON.parse(localStorage.getItem(chave));

                if (dados.tipo === "cliente") {
                    const veiculos = dados.veiculos.map(v => new Veiculo(v.placa, v.modelo, v.cor, v.tipo, v.clienteId));
                    const cliente = new Cliente(dados.nome, dados.documento, veiculos);
                    cliente._id = dados.id; // fromJSON() das classes 
                    usersCadastrados.push(cliente);
                } else if (dados.tipo === "funcionario") {
                    const funcionario = new Funcionario(dados.nome, dados.documento, dados.matricula, dados.cargo);
                    funcionario._id = dados.id;
                    usersCadastrados.push(funcionario);
                } else {
                    const pessoa = Pessoa.fromJSON(dados);
                    usersCadastrados.push(pessoa);
                }
            }
        }

        return usersCadastrados.sort((a, b) => a.id - b.id);
    }

    static excluir(id) {
        localStorage.removeItem(id);
    }
}
