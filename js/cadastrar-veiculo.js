import { listarTodosClientes, inicializarBancoDeDados } from './bancoDeDados.js';

// Inicializar o banco de dados ao carregar a página de cadastro de veículos
inicializarBancoDeDados();

document.addEventListener('DOMContentLoaded', () => {
    const clienteSelect = document.getElementById('clienteId');
    console.log(clienteSelect); // Adicione esta linha
    // Carregar a lista de clientes e popular o select
    const clientes = listarTodosClientes();
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nome} (ID: ${cliente.id})`;
        clienteSelect.appendChild(option);
    });

    const formCadastroVeiculo = document.getElementById('formCadastroVeiculo');
    const marcaInput = document.getElementById('marca');
    const modeloInput = document.getElementById('modelo');
    const corInput = document.getElementById('cor');
    const placaInput = document.getElementById('placa');
    const tipoSelect = document.getElementById('tipo');

    formCadastroVeiculo.addEventListener('submit', (event) => {
        event.preventDefault();

        const clienteId = clienteSelect.value;
        const marca = marcaInput.value;
        const modelo = modeloInput.value;
        const cor = corInput.value;
        const placa = placaInput.value;
        const tipo = tipoSelect.value;

        if (clienteId) {
            // Chamar a função cadastrarVeiculo no main.js (precisamos garantir que ela esteja acessível aqui)
            if (window.opener && typeof window.opener.cadastrarVeiculo === 'function') {
                window.cadastrarVeiculo(clienteId, marca, modelo, cor, placa, tipo);
                alert('Veículo cadastrado com sucesso!');
                formCadastroVeiculo.reset();
            } else {
                console.error('A função cadastrarVeiculo não está acessível na janela pai.');
                alert('Erro ao cadastrar veículo.');
            }
        } else {
            alert('Por favor, selecione um cliente.');
        }
    });
});