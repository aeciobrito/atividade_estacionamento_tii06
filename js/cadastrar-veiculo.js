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

    const formCadastroVeiculo = document.getElementById('formCadastroVeiculo');
    if (!formCadastroVeiculo) {
        console.error("Elemento 'formCadastroVeiculo' não encontrado.");
        return;
    }

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

        if (!clienteId) {
            alert('Por favor, selecione um cliente.');
            return;
        }

        const veiculoData = {
            clienteId: clienteId,
            marca: marca,
            modelo: modelo,
            cor: cor,
            placa: placa,
            tipo: tipo
        };

        // Verificar se a janela foi aberta via window.open()
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({ type: 'cadastrarNovoVeiculo', payload: veiculoData }, '*');
            alert('Dados do veículo enviados para cadastro.');
        } else {
            console.error("A janela pai não existe ou já foi fechada. Não será possível enviar os dados.");
        }

        formCadastroVeiculo.reset();

        // Certificar que a página pode ser fechada corretamente
        setTimeout(() => {
            if (window.opener) {
                window.opener.postMessage({ type: 'cadastrarNovoVeiculo', payload: veiculoData }, '*');
            } else {
                alert("A janela de origem não está disponível. Por favor, volte à tela anterior e tente novamente.");
            }
            
        }, 500); // Pequeno atraso para garantir que a mensagem seja enviada
    });
});
