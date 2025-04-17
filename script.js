import { BancoDeDados } from "./bd/BancoDeDados.js";
import { Pessoa } from "./classes/Pessoa.js";
import { Funcionario } from "./classes/Funcionario.js";
import { Cliente } from "./classes/Cliente.js"

// buscar os dados da tela quando o usuário "salvar"
document.getElementById('frmClientes').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const documento = document.getElementById("documento").value;
    const tipo = document.getElementById("typeof-user").value;
    const matricula = document.getElementById("matricula").value;
    const cargo = document.getElementById("cargo").value;
    const veiculo = document.getElementById("veiculo").value;
    const placa = document.getElementById("placa").value;
    const cor = document.getElementById("cor").value;
    const tipoVeiculo = document.getElementById("tipo-veiculo").value;

    if (!nome || !documento) {
        alert("Preencha todos os campos corretamente");
        return;
    }

    // verifica se o usuário é funcionário ou cliente, para enviar os dados para o bd
    let pessoa;
    if (tipo === "funcionario") {

        if (!matricula || !cargo) {
            alert("Preencha matrícula e cargo do funcionário");
            return;
        }
        pessoa = new Funcionario(nome, documento, matricula, cargo);

    } else if (tipo === "cliente") {

        if (!veiculo || !placa || !cor || !tipoVeiculo) {
            alert("Preencha os dados do Veículo");
            return;
        }
        pessoa = new Cliente(nome, documento, veiculo);
    }

    BancoDeDados.salvar(pessoa);

});

// buscar os dados de um funcionário quando o user "salvar"
const tipoUsuario = document.getElementById('typeof-user');
const camposFuncionario = document.getElementById('funcionario-fields');
const camposCliente = document.getElementById('client-fields');

camposFuncionario.style.display = 'block'

tipoUsuario.addEventListener('change', function () {
    if (this.value === 'funcionario') {
        camposFuncionario.style.display = 'block';
        camposCliente.style.display = 'none';

    } else if (this.value === 'cliente') {
        camposCliente.style.display = 'block'
        camposFuncionario.style.display = 'none';

    } 
});