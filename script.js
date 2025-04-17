import { BancoDeDados } from "./bd/BancoDeDados.js";
import { Pessoa } from "./classes/Pessoa.js";

// buscar os dados da tela quando o usuário "salvar"
document.getElementById('frmClientes').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const documento = document.getElementById("documento").value;

    if (!nome || !documento) {
        alert("Preencha todos os campos corretamente");
        return;
    }

    let pessoa = new Pessoa(nome, documento);
    // enviar esse objeto para o banco de dados
    BancoDeDados.salvar(pessoa);
});