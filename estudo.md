# Organização da Lógica de CRUD com Encapsulamento e Suporte a Múltiplos Veículos

## 1. CRUD com Encapsulamento em JavaScript

- Classes criadas: `Pessoa`, `Cliente`, `Funcionario`, `Veiculo`.
- Uso de propriedades privadas (`#`) com acesso por getters e métodos públicos.
- Métodos como `adicionarVeiculo`, `toJSON`, `fromJSON` e `atualizarDados` usados para garantir encapsulamento.
- Evitado o acesso direto a propriedades privadas.

---

## 2. Cadastro e Edição com Suporte a Múltiplos Veículos

- Os veículos são encapsulados em `Cliente`, por meio de um array privado `#veiculos`.
- Método `adicionarVeiculo(veiculo)` verifica se o veículo pertence ao cliente antes de adicionar.
- Durante edição, novos veículos são adicionados sem duplicar os existentes.
- Evitado acesso direto ao array; apenas métodos públicos usados.

---

## 3. BancoDeDados.js (Persistência com LocalStorage)

### salvar(pessoa)
Refatorado para:
- Usar `pessoa.toJSON()` ao invés de montar manualmente o objeto.

```js
static salvar(pessoa) {
    localStorage.setItem(pessoa.id, JSON.stringify(pessoa.toJSON()));
}
```

### buscarTodos()
Refatorado para usar método auxiliar `instanciarPessoa(dados)`:

```js
static buscarTodos() {
    const usersCadastrados = [];

    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (!isNaN(parseInt(chave))) {
            const dados = JSON.parse(localStorage.getItem(chave));
            const pessoa = this.instanciarPessoa(dados);
            if (pessoa) usersCadastrados.push(pessoa);
        }
    }

    return usersCadastrados.sort((a, b) => a.id - b.id);
}
```

### buscarPorId(id)

```js
static buscarPorId(id) {
    const pessoaJSON = localStorage.getItem(id);
    if (!pessoaJSON) return null;

    const dados = JSON.parse(pessoaJSON);
    return this.instanciarPessoa(dados);
}
```

### instanciarPessoa(dados)

```js
static instanciarPessoa(dados) {
    switch (dados.tipo) {
        case "cliente":
            return Cliente.fromJSON(dados);
        case "funcionario":
            return Funcionario.fromJSON(dados);
        case "pessoa":
        default:
            return Pessoa.fromJSON(dados);
    }
}
```

### atualizar(pessoa)

```js
static atualizar(pessoa) {
    this.salvar(pessoa); // mesma lógica do salvar()
}
```

---

## 4. Métodos fromJSON e toJSON

- Todas as classes implementam `fromJSON(json)` para reconstrução correta.
- `Cliente.fromJSON` reconstrói também os veículos com `new Veiculo(...)`.
- `toJSON` exporta apenas os dados públicos (inclusive veículos).

---

## 5. script.js – Integração com Formulário

### Lógica de Edição

```js
if (id) {
    pessoa = BancoDeDados.buscarPorId(id);

    if (pessoa instanceof Funcionario) {
        pessoa.atualizarDados(nome, documento, matricula, cargo);
    } else if (pessoa instanceof Cliente) {
        pessoa.atualizarDados(nome, documento);
        // Criar novo veículo com base nos campos preenchidos
        const veiculo = new Veiculo(placa, nomeVeiculo, cor, tipoVeiculo, pessoa.id);
        pessoa.adicionarVeiculo(veiculo);
    }

    BancoDeDados.atualizar(pessoa);
} else {
    // Novo cadastro
    if (tipo === "cliente") {
        const cliente = new Cliente(nome, documento);
        const veiculo = new Veiculo(placa, nomeVeiculo, cor, tipoVeiculo, cliente.id);
        cliente.adicionarVeiculo(veiculo);
        BancoDeDados.salvar(cliente);
    } else if (tipo === "funcionario") {
        const funcionario = new Funcionario(nome, documento, matricula, cargo);
        BancoDeDados.salvar(funcionario);
    }
}
```

### Lógica de Exibição para Edição
- Ao carregar a tela com `?id=`, os dados do cliente são preenchidos.
- Campos de veículos populados a partir do primeiro veículo da lista (ou exibido em lista).

---

## 6. Correções de Erro e Melhorias

- Erro: `Cannot set property nome of [object Object]`.
  - Causa: propriedade privada sem setter.
  - Solução: adicionar métodos como `atualizarDados()`.

```js
atualizarDados(nome, documento) {
    this.#nome = nome;
    this.#documento = documento;
}
```

---

Esse documento serve como guia geral para organizar, refatorar e manter seu projeto de cadastro de pessoas com suporte a veículos, respeitando boas práticas de orientação a objetos e encapsulamento em JavaScript.

