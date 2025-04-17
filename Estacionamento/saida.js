function registrarSaida(placa) {
    const registros = Storage.get("registros");
    const index = registros.findIndex(r => r.veiculo.placa === placa.toUpperCase() && !r.horaSaida);
    
    if (index === -1) {
      alert("Registro não encontrado ou já finalizado.");
      return;
    }
  
    const registro = registros[index];
    registro.horaSaida = new Date();
    registro.valorCobrado = calcularValor(new Date(registro.horaEntrada), registro.horaSaida);
  
    registros[index] = registro;
    Storage.update("registros", registros);
  
    alert(`Saída registrada. Valor: R$ ${registro.valorCobrado.toFixed(2)}`);
  }
  