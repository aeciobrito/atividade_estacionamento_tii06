import { listarTodosClientes, inicializarBancoDeDados } from './bancoDeDados.js';

// Inicializar o banco de dados ao carregar a página de cadastro de veículos
inicializarBancoDeDados();

document.addEventListener('DOMContentLoaded', () => {
    const clienteSelect = document.getElementById('clienteId');

    if (!clienteSelect) {
        console.error("Elemento 'clienteId' não encontrado no DOM.");
        return;
    }

    // Carregar a lista de clientes e popular o select
    const clientes = listarTodosClientes();
    
    if (!clientes || clientes.length === 0) {
        console.warn("Nenhum cliente encontrado. Certifique-se de que o banco de dados foi inicializado corretamente.");
    } else {
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nome} (ID: ${cliente.id})`;
            clienteSelect.appendChild(option);
        });
    }

    
});

export class Veiculo {
    
    #id; // Será o mesmo do cliente
    #marca;
    #modelo;
    #cor;
    #placa;
    #tipo;
    #clienteId;

    constructor(clienteId, marca, modelo, cor, placa, tipo) {
        this.#id = clienteId;
        this.#marca = marca;
        this.#modelo = modelo;
        this.#cor = cor;
        this.#placa = placa;
        this.#tipo = tipo;
        this.#clienteId = clienteId;
    }

    getId() {
        return this.#id;
    }

    getMarca() {
        return this.#marca;
    }

    getModelo() {
        return this.#modelo;
    }

    getCor() {
        return this.#cor;
    }

    getPlaca() {
        return this.#placa;
    }

    getTipo() {
        return this.#tipo;
    }

    getClienteId() {
        return this.#clienteId;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastroVeiculo');
    const listaVeiculosElement = document.getElementById('veiculosCadastrados');
    const chaveLocalStorage = 'veiculosCadastrados';

    carregarVeiculos();

    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();
        cadastrarVeiculo();
    });

    function cadastrarVeiculo() {
        const clienteId = document.getElementById('clienteId').value;
        const marca = document.getElementById('marca').value;
        const modelo = document.getElementById('modelo').value;
        const cor = document.getElementById('cor').value;
        const placa = document.getElementById('placa').value;
        const tipo = document.getElementById('tipo').value;

        const novoVeiculo = new Veiculo(clienteId, marca, modelo, cor, placa, tipo);
        salvarVeiculo(novoVeiculo);
        formCadastro.reset();
        carregarVeiculos();
    }

    function salvarVeiculo(veiculo) {
        let veiculos = obterVeiculos();
        veiculos.push(veiculo);
        localStorage.setItem(chaveLocalStorage, JSON.stringify(veiculos));
    }

    function obterVeiculos() {
        const dados = localStorage.getItem(chaveLocalStorage);
        return dados ? JSON.parse(dados) : [];
    }

    function carregarVeiculos() {
        listaVeiculosElement.innerHTML = '';
        const veiculos = obterVeiculos();

        if (veiculos.length === 0) {
            listaVeiculosElement.innerHTML = '<p>Nenhum veículo cadastrado ainda.</p>';
            return;
        }

        const lista = document.createElement('ul');
        veiculos.forEach((veiculo, index) => {
            const item = document.createElement('li');
            item.textContent = `${veiculo.getClienteId()} - ${veiculo.getMarca()} ${veiculo.getModelo()} ${veiculo.getCor()}  - Placa: ${veiculo.getPlaca()} ${veiculo.getTipo()}  `;

            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.addEventListener('click', () => removerVeiculo(index));

            item.appendChild(botaoRemover);
            lista.appendChild(item);
        });
        listaVeiculosElement.appendChild(lista);
    }

    function removerVeiculo(index) {
        let veiculos = obterVeiculos();
        veiculos.splice(index, 1);
        localStorage.setItem(chaveLocalStorage, JSON.stringify(veiculos));
        carregarVeiculos();
    }
});
