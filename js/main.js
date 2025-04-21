// main.js
import { Cliente } from './Clientes.js';
import { Veiculo } from './Veiculo.js';
import { salvarClienteNoBanco, listarTodosClientes, inicializarBancoDeDados, salvarVeiculoNoBanco } from './bancoDeDados.js'; // Importe a função de inicialização

// Inicializar o banco de dados carregando dados do Local Storage
inicializarBancoDeDados();

// Função Cadastro de Cliente
function cadastrarCliente(nome, documento) {
  // Criar uma nova instância da classe Cliente
  const novoClienteInstancia = new Cliente(nome, documento);

  // Obter o ID gerado para o novo cliente
  const novoClienteId = novoClienteInstancia.getId();

  // Criar um novo objeto cliente USANDO O ID GERADO
  const novoCliente = {
    id: novoClienteId,
    nome: nome || "Sem nome",
    documento: documento || "Sem documento"
  };

  // Salvar o novo cliente no banco de dados
  salvarClienteNoBanco(novoCliente);

  console.log("Cliente cadastrado com sucesso:", novoCliente);

  atualizarTabelaClientes();
}

function atualizarTabelaClientes() {
  const clientes = listarTodosClientes(); // Buscar clientes do banco de dados
  const tabelaClientesBody = document.getElementById("tabelaClientesBody");

  // Verifique se o corpo da tabela existe no HTML
  if (!tabelaClientesBody) {
    console.error("O elemento com ID 'tabelaClientesBody' não foi encontrado no HTML.");
    return;
  }

  tabelaClientesBody.innerHTML = ""; // Limpar o corpo da tabela

  clientes.forEach(cliente => {
    console.log("Dados do cliente para a tabela:", cliente); // Verifique o objeto cliente

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
    cellPlaca.textContent = "";
    cellHrsEntrada.textContent = "";
    cellHrsSaida.textContent = "";
    cellValor.textContent = "";
  });
}

// Evento de submissão do formulário (AGORA DENTRO DO DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById("formCliente");
  if (formulario) {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const documento = document.getElementById("documento").value;

      cadastrarCliente(nome, documento); // Chamar a função para salvar os dados

      alert("Cliente cadastrado com sucesso!");

      formulario.reset(); // Limpar o formulário após o cadastro
      // A atualização da tabela agora é feita diretamente na função cadastrarCliente
      // atualizarTabelaClientes();
    });
  } else {
    console.error("O formulário com ID 'formCliente' não foi encontrado nesta página.");
  }

  // Chamada inicial para exibir os clientes que já podem estar no "banco de dados"
  atualizarTabelaClientes();
});

// Função para atualizar a lista de clientes (se você tiver outra listagem além da tabela)
function atualizarListaClientes() {
  // (Mantenha a lógica de atualização de outras listas, se houver)
}

atualizarListaClientes(); // Chame também na inicialização, se necessário

window.cadastrarVeiculo = function(clienteId, marca, modelo, cor, placa, tipo) {
    console.log("Dados recebidos para cadastrar veículo:", clienteId, marca, modelo, cor, placa, tipo);
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
    salvarVeiculoNoBanco(novoVeiculoParaSalvar);
    console.log(`Veículo com placa ${placa} cadastrado para o cliente com ID ${clienteId}`, novoVeiculoParaSalvar);
    // Opcional: Atualizar alguma tabela de veículos, se houver
};

document.addEventListener('DOMContentLoaded', () => {
    const btnCadastrarCliente = document.getElementById('btnCliente');
    if (btnCadastrarCliente) {
        btnCadastrarCliente.addEventListener('click', () => {
            window.open('cadastro-cliente.html', '_self');
        });
    } else {
        console.error("Botão 'btnCadastrarCliente' não encontrado.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const botaoAbrirCadastroVeiculo = document.getElementById('btnVeiculo');
    if (botaoAbrirCadastroVeiculo) {
        botaoAbrirCadastroVeiculo.addEventListener('click', () => {
            window.open('cadastro-veiculo.html', '_self');
        });
    } else {
        console.error("Botão 'abrirCadastroVeiculo' não encontrado.");
    }
});