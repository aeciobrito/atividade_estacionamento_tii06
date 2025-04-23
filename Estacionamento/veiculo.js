function registrarSaida(placa) {
    const registros = Storage.get("registros");
    const index = registros.findIndex(r => r.veiculo.placa === placa.toUpperCase() && !r.horaSaida);
    
    if (index === -1) {
      alert("Registro não encontrado ou já finalizado.");
      return;
    }}