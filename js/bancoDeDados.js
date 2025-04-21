// bancoDeDados.js

let clientes = [];
let veiculos = [];

// --- Funções para Clientes ---

export function salvarClienteNoBanco(cliente) {
  clientes.push(cliente);
  console.log("Cliente salvo no banco de dados:", cliente);
  // Em um cenário real, você faria a persistência em um banco de dados real.
}

export function buscarClientePorId(id) {
  return clientes.find(cliente => cliente.id === id);
}

export function listarTodosClientes() {
  return [...clientes]; // Retorna uma cópia
}

// --- Funções para Veículos ---

export function salvarVeiculoNoBanco(veiculo) {
  veiculos.push(veiculo);
  console.log("Veículo salvo no banco de dados:", veiculo);
  // Aqui, em um cenário real, você faria a persistência em um banco de dados real.
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