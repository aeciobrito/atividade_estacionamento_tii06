// bancoDeDados.js

let clientes = [];
let veiculos = [];

// --- Funções para Clientes ---

function carregarClientesDoLocalStorage() {
    const clientesDoStorage = localStorage.getItem('clientes');
    if (clientesDoStorage) {
        clientes = JSON.parse(clientesDoStorage);
        console.log("Clientes carregados do Local Storage para o banco de dados:", clientes);
    }
}

export function inicializarBancoDeDados() {
    carregarClientesDoLocalStorage();
    carregarVeiculoDoLocalStorage(); // Corrigido
}

export function salvarClienteNoBanco(cliente) {
    clientes.push(cliente);
    console.log("Cliente salvo no banco de dados:", cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

export function buscarClientePorId(id) {
    return clientes.find(cliente => cliente.id === id);
}

export function listarTodosClientes() {
    console.log('listarTodosClientes foi chamada');
    console.log(clientes);
    return [...clientes]; // Retorna uma cópia
}

// --- Funções para Veículos ---

function carregarVeiculoDoLocalStorage() {
    const veiculoDoStorage = localStorage.getItem('veiculos');
    if(veiculoDoStorage) {
        veiculos = JSON.parse(veiculoDoStorage);
        console.log("Veiculos carregados do Local Storage para o banco de dados:", veiculos);
    }
}


export function salvarVeiculoNoBanco(veiculo) {
    veiculos.push(veiculo);
    console.log("Veículo salvo no banco de dados:", veiculo);
    console.log("Objeto veículo recebido:", veiculo); // ADICIONE ESTE LOG
    localStorage.setItem('veiculos', JSON.stringify(veiculos)); // Se você quer persistir no Local Storage
}

export function buscarVeiculosPorClienteId(clienteId) {
    return veiculos.filter(veiculo => veiculo.clienteId === parseInt(clienteId)); // Garante que clienteId seja um número
}

export function buscarVeiculoPorPlaca(placa) {
    return veiculos.find(veiculo => veiculo.placa === placa);
}

export function listarTodosVeiculos() {
    return [...veiculos]; // Retorna uma cópia
}