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
  
  
  let clientes = recuperarClientes();
  let veiculos = recuperarVeiculos();
  
  // salvar os clientes e veiculos no localStorage
  function salvarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }
  
  function salvarVeiculos() {
    localStorage.setItem("veiculos", JSON.stringify(veiculos));
  }
  
  // cadastrar cliente e cadastrar veiculos
  function cadastrarCliente() {
    const nome = document.getElementById("nome-cliente").value.trim();
    const telefone = document.getElementById("telefone-cliente").value.trim();
    const CPF = document.getElementById("cpf-cliente").value.trim();
    const endereco = document.getElementById("endereco-cliente").value.trim();
  
    if (nome && telefone && endereco) {
      const cliente = { nome, telefone, endereco };
      clientes.push(cliente);
      salvarClientes();
      alert("Cliente cadastrado com sucesso!");
      listarClientes();
      limparCamposCliente();
    } else {
      alert("Preencha todos os campos do cliente.");
    }
  }
  
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
        salvarVeiculos(); 
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
  
  // clientes e veiculos cadastrados
  function listarClientes() {
    const lista = document.getElementById("clientes-list");
    lista.innerHTML = clientes.length
      ? clientes.map(c => `<li><span>${c.nome}</span> - ${c.telefone} - ${c.endereco}</li>`).join("")
      : "<li>Não há clientes cadastrados.</li>";
  }
  
  
  function listarVeiculos() {
    const lista = document.getElementById("veiculos-list");
    lista.innerHTML = veiculos.length
      ? veiculos.map(v => `<li><span>${v.modelo}</span> - ${v.placa} - ${v.cor} - Proprietário: ${v.proprietario}</li>`).join("")
      : "<li>Não há veículos cadastrados.</li>";
  }
  
  // limpar campos 
  function limparCamposCliente() {
    document.getElementById("nome-cliente").value = '';
    document.getElementById("telefone-cliente").value = '';
    document.getElementById("endereco-cliente").value = '';
  }
  

  function limparCamposVeiculo() {
    document.getElementById("placa-veiculo").value = '';
    document.getElementById("modelo-veiculo").value = '';
    document.getElementById("cor-veiculo").value = '';
    document.getElementById("proprietario-veiculo").value = '';
  }
  
  function carregarDados() {
    listarClientes();
    listarVeiculos();
  }
  
  window.onload = carregarDados;
  