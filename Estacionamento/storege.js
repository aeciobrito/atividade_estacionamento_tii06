const Storage = {
    get(key) {
      return JSON.parse(localStorage.getItem(key)) || [];
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    push(key, item) {
      const data = this.get(key);
      data.push(item);
      this.set(key, data);
    },
    update(key, data) {
      this.set(key, data);
    }
  };
  
  function calcularValor(horaEntrada, horaSaida) {
    const diffMs = horaSaida - horaEntrada;
    const diffHoras = Math.floor(diffMs / 1000 / 60 / 60);
    return 10 + (diffHoras > 0 ? diffHoras * 5 : 0);
  }
  function registrarEntrada(placa) {
    placa = placa.trim().toUpperCase();
    const veiculos = Storage.get("veiculos");
    const registros = Storage.get("registros");
    const clientes = Storage.get("clientes");
  
    const veiculo = veiculos.find(v => v.placa === placa);
    if (!veiculo) return alert("Veículo não encontrado!");
  
    const jaEstacionado = registros.some(r => r.veiculo.placa === placa && !r.horaSaida);
    if (jaEstacionado) return alert("Este veículo já está no estacionamento.");
  
    const cliente = clientes.find(c => c.id === veiculo.clienteId);
    const novoRegistro = new RegistroEstacionamento(Date.now(), veiculo, cliente, new Date());
  
    Storage.push("registros", novoRegistro);
    alert("Entrada registrada com sucesso!");
  }
  