import { BancoDeDados } from "./bd/BancoDeDados.js";
import { Funcionario } from "./classes/Funcionario.js";
import { Cliente } from "./classes/Cliente.js"
import { Veiculo } from "./classes/Veiculo.js"

// buscar os dados da tela quando o usuário "salvar"
document.getElementById('frmClientes').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const documento = document.getElementById("documento").value;
    const tipo = document.getElementById("typeof-user").value;
    const matricula = document.getElementById("matricula").value;
    const cargo = document.getElementById("cargo").value;
    const nomeVeiculo = document.getElementById("veiculo").value;
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

        if (!nomeVeiculo || !placa || !cor || !tipoVeiculo) {
            alert("Preencha os dados do Veículo");
            return;
        }

        pessoa = new Cliente(nome, documento);
        const veiculo = new Veiculo(placa, nomeVeiculo, cor, tipoVeiculo, pessoa.id);
        pessoa.adicionarVeiculo(veiculo);
        
    }

    BancoDeDados.salvar(pessoa);
    alert("Usuário Cadastrado com Sucesso!");
    document.getElementById('frmClientes').reset();
    window.location.href = `../cadastrados/lista-cadastrados.html`
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

// ----------------------- caso esteja editando -----------------------
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('teste')) {
    const pessoa = BancoDeDados.buscarPorId(urlParams.get('teste'));

    document.getElementById("id").value = pessoa.id;
    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("documento").value = pessoa.documento;

    if (pessoa instanceof Funcionario) {
        document.getElementById("typeof-user").value = "funcionario";
        camposFuncionario.style.display = 'block';
        camposCliente.style.display = 'none';

        document.getElementById("matricula").value = pessoa.matricula;
        document.getElementById("cargo").value = pessoa.cargo;
    }

    if (pessoa instanceof Cliente) {
        document.getElementById("typeof-user").value = "cliente";
        camposFuncionario.style.display = 'none';
        camposCliente.style.display = 'block';

        if (pessoa.veiculos.length > 0) {
            const veiculo = pessoa.veiculos[0];
            document.getElementById("veiculo").value = veiculo.modelo;
            document.getElementById("placa").value = veiculo.placa;
            document.getElementById("cor").value = veiculo.cor;
            document.getElementById("tipo-veiculo").value = veiculo.tipo;
        }
    }
}
