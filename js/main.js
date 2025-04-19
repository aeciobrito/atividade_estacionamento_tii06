import { carregarDoStorage, salvarNoStorage } from './storage.js';
import { Cliente } from './Clientes.js';
import { Veiculo } from './Veiculo.js'

//Função Cadastro de Cliente
function cadastrarCliente(nome, documento) {
    // Carregar clientes já cadastrados
    const clientes = carregarDoStorage("clientes");

    //Criar uma nova instância da classe Cliente
    const novoClienteInstancia = new Cliente(nome, documento);

    //Obter o ID gerado para o novo cliente
    const novoclienteId = novoClienteInstancia.getId();

    //Criar um novo objeto cliente
    const novoCliente = {
        id: novoclienteId,
        nome: nome || "Sem nome",
        documento: documento || "Sem documento"
    };

    // Adicionar o novo cliente à lista
    clientes.push(novoCliente);

    // Salvar a lista atualizada no localStorage
    salvarNoStorage("clientes", clientes);

    console.log("Cliente cadastrado com sucesso:", novoCliente);
}

function atualizarTabelaClientes() {
    const clientes = carregarDoStorage("clientes");
    const tabelaClientesBody = document.getElementById("tabelaClientesBody");

    // Verifique se o corpo da tabela existe no HTML
    if (!tabelaClientesBody) {
        console.error("O elemento com ID 'tabelaClientesBody' não foi encontrado no HTML.");
        return;
    }

    tabelaClientesBody.innerHTML = ""; // Limpar o corpo da tabela

    clientes.forEach(cliente => {
        // Criar uma nova linha para cada cliente
        const row = tabelaClientesBody.insertRow();

        // Criar células para cada propriedade do cliente (Nome e Documento)
        const cellID = row.insertCell();
        const cellNome = row.insertCell();
        const cellDocumento = row.insertCell();
        const cellPlaca = row.insertCell();
        const cellHrsEntrada = row.insertCell();
        const cellHrsSaida = row.insertCell();
        const cellValor = row.insertCell();

        // Definir o conteúdo de cada célula
        cellID.textContent = cliente.id;
        cellNome.textContent = cliente.nome;
        cellDocumento.textContent = cliente.documento;
        cellPlaca.textContent = cliente.placa;
        cellHrsEntrada.textContent = cliente.hrsEntrada;
        cellHrsSaida.textContent = cliente.hrsSaida;
        cellValor.textContent = cliente.valor;

    });
}

atualizarTabelaClientes();

// Evento de submissão do formulário
const formulario = document.getElementById("formCliente");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const documento = document.getElementById("documento").value;

    cadastrarCliente(nome, documento); // Chamar a função para salvar os dados

    alert("Cliente cadastrado com sucesso!");

    formulario.reset(); // Limpar o formulário após o cadastro
    atualizarListaClientes();
});
atualizarListaClientes();

function cadastrarVeiculo(clienteId, marca, modelo, cor, placa, tipo) {
    const veiculos = carregarDoStorage("veiculos") || [];
    const novoVeiculoInstancia = new Veiculo(clienteId, marca, modelo, cor, placa, tipo);
    const novoVeiculoParaSalvar = {
        id: novoVeiculoInstancia.getId(),
        marca: novoVeiculoInstancia.getMarca(),
        modelo: novoVeiculoInstancia.getModelo(),
        cor: novoVeiculoInstancia.getCor(),
        placa: novoVeiculoInstancia.getPlaca(),
        tipo: novoVeiculoInstancia.getTipo(),
        clienteId: novoVeiculoInstancia.getClienteId()
    };
    veiculos.push(novoVeiculoParaSalvar);
    salvarNoStorage("veiculos", veiculos);
    console.log(`Veículo com placa ${placa} cadastrado para o cliente com ID ${clienteId}`, novoVeiculoParaSalvar);
    // Opcional: Atualizar a tabela de veículos
}