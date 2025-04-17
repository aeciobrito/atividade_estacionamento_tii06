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
});