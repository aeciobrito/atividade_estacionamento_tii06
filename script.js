import { BancoDeDados } from "./bd/BancoDeDados.js";
import { Funcionario } from "./classes/Funcionario.js";
import { Cliente } from "./classes/Cliente.js"
import { Veiculo } from "./classes/Veiculo.js"

function renderizarVeiculo(veiculo = {}) {
    const container = document.getElementById('lista-veiculos');
    const veiculoDiv = document.createElement('div');
    veiculoDiv.classList.add('veiculo');

    veiculoDiv.innerHTML = `
        <label>Veículo:</label>
        <input type="text" name="veiculo" class="veiculo-nome" value="${veiculo.modelo || ''}">

        <label>Placa:</label>
        <input type="text" name="placa" class="veiculo-placa" value="${veiculo.placa || ''}">

        <label>Cor:</label>
        <input type="text" name="cor" class="veiculo-cor" value="${veiculo.cor || ''}">

        <label>Tipo de Veículo:</label>
        <input type="text" name="tipo-veiculo" class="veiculo-tipo" value="${veiculo.tipo || ''}">

        <button type="button" class="remover-veiculo">Remover</button>
        <hr>
    `;

    veiculoDiv.querySelector('.remover-veiculo').addEventListener('click', () => {
        veiculoDiv.remove();
    });

    container.appendChild(veiculoDiv);
}

document.getElementById('adicionar-veiculo').addEventListener('click', () => {
    renderizarVeiculo();
});

const tipoUsuario = document.getElementById('typeof-user');
const camposFuncionario = document.getElementById('funcionario-fields');
const camposCliente = document.getElementById('client-fields');

camposFuncionario.style.display = 'block';

tipoUsuario.addEventListener('change', function () {
    if (this.value === 'funcionario') {
        camposFuncionario.style.display = 'block';
        camposCliente.style.display = 'none';
    } else {
        camposFuncionario.style.display = 'none';
        camposCliente.style.display = 'block';
    }
});

document.getElementById('frmClientes').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const documento = document.getElementById("documento").value;
    const tipo = document.getElementById("typeof-user").value;
    const matricula = document.getElementById("matricula").value;
    const cargo = document.getElementById("cargo").value;

    if (!nome || !documento) {
        alert("Preencha todos os campos corretamente");
        return;
    }

    const nomes = document.querySelectorAll('.veiculo-nome');
    const placas = document.querySelectorAll('.veiculo-placa');
    const cores = document.querySelectorAll('.veiculo-cor');
    const tipos = document.querySelectorAll('.veiculo-tipo');

    const veiculos = [];

    for (let i = 0; i < nomes.length; i++) {
        if (!nomes[i].value || !placas[i].value || !cores[i].value || !tipos[i].value) {
            alert("Preencha todos os dados de todos os veículos.");
            return;
        }

        veiculos.push(new Veiculo(
            placas[i].value,
            nomes[i].value,
            cores[i].value,
            tipos[i].value,
            id || null
        ));
    }

    // ----------------------------- salvar ou editar a pessoa -----------------------------
    let pessoa;
    if (id) {
        pessoa = BancoDeDados.buscarPorId(id);

        if (pessoa instanceof Funcionario) {
            pessoa.atualizarDados(nome, documento, matricula, cargo);
        } else if (pessoa instanceof Cliente) {
            pessoa.atualizarDados(nome, documento, veiculos);
        }

        BancoDeDados.atualizar(pessoa);
    } else {
        if (tipo === "funcionario") {
            if (!matricula || !cargo) {
                alert("Preencha matrícula e cargo do funcionário");
                return;
            }
            pessoa = new Funcionario(nome, documento, matricula, cargo);
        } else if (tipo === "cliente") {
            pessoa = new Cliente(nome, documento);
            for (let veiculo of veiculos) {
                veiculo.clienteId = pessoa.id;
                pessoa.adicionarVeiculo(veiculo);
            }
        }

        BancoDeDados.salvar(pessoa);
        alert("Usuário Cadastrado com Sucesso!");
    }

    document.getElementById('frmClientes').reset();
    window.location.href = `../cadastrados/lista-cadastrados.html`;
});

// ----------------------------- Caso esteja editando -----------------------------
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('id')) {
    const pessoa = BancoDeDados.buscarPorId(urlParams.get('id'));

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

        const container = document.getElementById('lista-veiculos');
        container.innerHTML = '';

        pessoa.veiculos.forEach(veiculo => {
            renderizarVeiculo(veiculo);
        });
    }
}
