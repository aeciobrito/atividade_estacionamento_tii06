import { BancoDeDados } from "./bd/BancoDeDados.js";
import { Cliente } from "./classes/Cliente.js";
const ul = document.getElementById("listaUsers");

const users = BancoDeDados.buscarTodos();

if (users.length === 0) {
    ul.innerHTML = '<li>Nenhum usuário cadastrado!</li>'
} else {
    users.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.toString();

        // Se for cliente e tiver veículos, adiciona detalhes dos veículos
        if (p instanceof Cliente && p.veiculos.length > 0) {
            const ulVeiculos = document.createElement("ul");
            p.veiculos.forEach(v => {
                const liVeic = document.createElement("li");
                liVeic.textContent = `Placa: ${v.placa}, Modelo: ${v.modelo}, Cor: ${v.cor}, Tipo: ${v.tipo}`;
                ulVeiculos.appendChild(liVeic);
            });
            li.appendChild(ulVeiculos);
        }

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => {
            window.location.href = `index.html?id=${p.id}` // navega para a tela inicial
        }
        
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir"
        btnExcluir.onclick = () => {
            BancoDeDados.excluir(p.id);
            window.location.reload(); // recarrega os dados na tela, depois de excluir o id, retira o item da tela
        }

        li.append(btnEditar, btnExcluir);
        ul.appendChild(li);
    });
}