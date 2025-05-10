Para permitir o cadastro de **vários veículos por cliente**, você pode seguir este caminho:

---

### ✅ 1. **Alterar o HTML**
Transformar os campos de veículo em um grupo repetível:

```html
<div id="client-fields" class="subgroup" style="display: none;">
    <div id="veiculos-container">
        <div class="veiculo">
            <label for="veiculo">Veículo:</label>
            <input type="text" name="veiculo" class="veiculo-nome">

            <label for="placa">Placa:</label>
            <input type="text" name="placa" class="veiculo-placa">

            <label for="cor">Cor:</label>
            <input type="text" name="cor" class="veiculo-cor">

            <label for="tipo-veiculo">Tipo de Veículo:</label>
            <input type="text" name="tipo-veiculo" class="veiculo-tipo">
        </div>
    </div>

    <button type="button" id="adicionar-veiculo">+ Adicionar Veículo</button>
</div>
```

---

### ✅ 2. **Alterar o `script.js` para lidar com múltiplos veículos**

#### a. Lógica para adicionar veículos dinamicamente:
```js
document.getElementById('adicionar-veiculo').addEventListener('click', () => {
    const container = document.getElementById('veiculos-container');
    const veiculoHtml = `
        <div class="veiculo">
            <label>Veículo:</label>
            <input type="text" name="veiculo" class="veiculo-nome">

            <label>Placa:</label>
            <input type="text" name="placa" class="veiculo-placa">

            <label>Cor:</label>
            <input type="text" name="cor" class="veiculo-cor">

            <label>Tipo de Veículo:</label>
            <input type="text" name="tipo-veiculo" class="veiculo-tipo">
        </div>
    `;
    container.insertAdjacentHTML('beforeend', veiculoHtml);
});
```

#### b. Capturar todos os veículos no submit:
```js
} else if (tipo === "cliente") {
    const veiculos = [];
    const nomes = document.querySelectorAll('.veiculo-nome');
    const placas = document.querySelectorAll('.veiculo-placa');
    const cores = document.querySelectorAll('.veiculo-cor');
    const tipos = document.querySelectorAll('.veiculo-tipo');

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
            null // o cliente ainda não foi criado
        ));
    }

    pessoa = new Cliente(nome, documento);
    for (let veiculo of veiculos) {
        veiculo.clienteId = pessoa.id;
        pessoa.adicionarVeiculo(veiculo);
    }
}
```

---

### ✅ 3. **Classe `Cliente` já está pronta**
Sua classe já aceita múltiplos veículos via `adicionarVeiculo`, então está tudo certo nesse ponto. Só precisa garantir que:

```js
cliente._id = dados.id;
```

no `fromJSON()` da `Cliente`, como você já faz.

---

Se quiser, posso te ajudar também com:

- Botão de “remover veículo”
- Validação melhor por veículo
- Estilização com CSS para deixar os blocos mais bonitinhos
