import {Cliente} from "./Clientes.js";
import {Veiculo} from "./Veiculo.js";
import { RegistroEstacionamento } from "./js/RegistroEstacionamento.js";

//Função para clientes

export const clienteControle = {
    cadastrarCliente: (nome, documento) => {
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        const cliente = new Cliente(nome, documento);
        clientes.push(cliente);
        localStorage.setItem("clientes", JSON.stringify(clientes));
    },

    listarClientes: () => {
        return JSON.parse(localStorage.getItem("clientes")) || [];
    },
};

//Função para Veículos

export const veiculoControle = {
    cadastrarVeiculo: (placa, modelo, cor, tipo, clienteId) => {
        let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    
        // Verificar se o cliente existe
        if (!clientes.some(cliente => cliente.id === clienteId)) {
            throw new Error("Cliente não encontrado!");
        }
    
        // Criar e salvar veículo
        const veiculo = new Veiculo(placa, modelo, cor, tipo, clienteId);
        veiculos.push(veiculo);
        localStorage.setItem("veiculos", JSON.stringify(veiculos));
    },
}

// Função para Registro de Estacionamento

export const registroControle = {
    registrarEntrada: (veiculo, cliente) => {
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        const registro = new RegistroEstacionamento(veiculo, cliente);
        registros.push(registro);
        localStorage.setItem("registros", JSON.stringify(registros));
    },

    registrarSaida: (idRegistro) => {
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        const registro = registros.find(r => r.id === idRegistro);
        if (registro && !registro.horaSaida) {
            registro.finalizarSaida();
        }
        localStorage.setItem("registros", JSON.stringify(registros));
    },

    listarRegistros: () => {
        return JSON.parse(localStorage.getItem("registros")) || [];
    },
};
