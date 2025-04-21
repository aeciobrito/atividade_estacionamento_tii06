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
    // Adicione aqui outras funções de carregamento inicial, se necessário
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
    console.log('listarTodosClientes foi chamada'); // Adicione esta linha
    console.log(clientes); // Adicione esta linha para ver o conteúdo do array
    return [...clientes]; // Retorna uma cópia
}

// --- Funções para Veículos ---

// (Mantenha as funções de veículos como estão)
export function salvarVeiculoNoBanco(veiculo) {
    veiculos.push(veiculo);
    console.log("Veículo salvo no banco de dados:", veiculo);
    console.log("Objeto veículo recebido:", veiculo); // ADICIONE ESTE LOG
    localStorage.setItem('veiculos', JSON.stringify(veiculos)); // Se você quer persistir no Local Storage
}

export function buscarVeiculosPorClienteId(clienteId) {
    return veiculos.filter(veiculo => veiculo.clienteId === clienteId);
}

export function buscarVeiculoPorPlaca(placa) {
    return veiculos.find(veiculo => veiculo.placa === placa);
}

export function listarTodosVeiculos() {
    return [...veiculos]; // Retorna uma cópia
}