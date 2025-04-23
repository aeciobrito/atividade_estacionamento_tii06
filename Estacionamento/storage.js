// Função para recuperar clientes do localStorage
function recuperarClientes() {
    const clientesStorage = localStorage.getItem("clientes");
    return clientesStorage ? JSON.parse(clientesStorage) : [];
  }
  
  // Função para recuperar veículos do localStorage
  function recuperarVeiculos() {
    const veiculosStorage = localStorage.getItem("veiculos");
    return veiculosStorage ? JSON.parse(veiculosStorage) : [];
  }
  
  // Inicializando os arrays de clientes e veículos a partir do localStorage
  let clientes = recuperarClientes();
  let veiculos = recuperarVeiculos();
  
  // Função para salvar os clientes no localStorage
  function salvarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }
  
  // Função para salvar os veículos no localStorage
  function salvarVeiculos() {
    localStorage.setItem("veiculos", JSON.stringify(veiculos));
  }
  
  // Função para cadastrar cliente
  function cadastrarCliente() {
    const nome = document.getElementById("nome-cliente").value.trim();
    const telefone = document.getElementById("telefone-cliente").value.trim();
    const endereco = document.getElementById("endereco-cliente").value.trim();
  
    if (nome && telefone && endereco) {
      const cliente = { nome, telefone, endereco };
      clientes.push(cliente);
      salvarClientes(); // Salva a lista de clientes no localStorage
      alert("Cliente cadastrado com sucesso!");
      listarClientes();
      limparCamposCliente();
    } else {
      alert("Preencha todos os campos do cliente.");
    }
  }
  
  // Função para cadastrar veículo
  function cadastrarVeiculo() {
    const placa = document.getElementById("placa-veiculo").value.trim();
    const modelo = document.getElementById("modelo-veiculo").value.trim();
    const cor = document.getElementById("cor-veiculo").value.trim();
    const proprietario = document.getElementById("proprietario-veiculo").value.trim();
  
    if (placa && modelo && cor && proprietario) {
      const cliente = clientes.find(c => c.nome.toLowerCase() === proprietario.toLowerCase());
  
      if (cliente) {
        const veiculo = { placa, modelo, cor, proprietario };
        veiculos.push(veiculo);
        salvarVeiculos(); // Salva a lista de veículos no localStorage
        alert("Veículo cadastrado com sucesso!");
        listarVeiculos();
        limparCamposVeiculo();
      } else {
        alert("Proprietário não encontrado!");
      }
    } else {
      alert("Preencha todos os campos do veículo.");
    }
  }
  
  // Função para listar os clientes cadastrados
  function listarClientes() {
    const lista = document.getElementById("clientes-list");
    lista.innerHTML = clientes.length
      ? clientes.map(c => `<li><span>${c.nome}</span> - ${c.telefone} - ${c.endereco}</li>`).join("")
      : "<li>Não há clientes cadastrados.</li>";
  }
  
  // Função para listar os veículos cadastrados
  function listarVeiculos() {
    const lista = document.getElementById("veiculos-list");
    lista.innerHTML = veiculos.length
      ? veiculos.map(v => `<li><span>${v.modelo}</span> - ${v.placa} - ${v.cor} - Proprietário: ${v.proprietario}</li>`).join("")
      : "<li>Não há veículos cadastrados.</li>";
  }
  
  // Função para limpar campos de cadastro de cliente
  function limparCamposCliente() {
    document.getElementById("nome-cliente").value = '';
    document.getElementById("telefone-cliente").value = '';
    document.getElementById("endereco-cliente").value = '';
  }
  
  // Função para limpar campos de cadastro de veículo
  function limparCamposVeiculo() {
    document.getElementById("placa-veiculo").value = '';
    document.getElementById("modelo-veiculo").value = '';
    document.getElementById("cor-veiculo").value = '';
    document.getElementById("proprietario-veiculo").value = '';
  }
  
  // Função chamada ao carregar a página para garantir que as listas de clientes e veículos sejam exibidas
  function carregarDados() {
    listarClientes();
    listarVeiculos();
  }
  
  // Chama a função de carregamento de dados assim que a página for carregada
  window.onload = carregarDados;
  