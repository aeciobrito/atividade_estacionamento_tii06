Erro:

> `Cannot set property nome of [object Object] which has only a getter`

E agora está apontando especificamente para aqui:

---

### 🧠 Causa

Na sua classe `Pessoa`, você ainda **não adicionou os setters** para `nome` e `documento`, e como esses campos são `#privates`, as subclasses (`Cliente`, `Funcionario`) **não conseguem acessar diretamente nem via `super.nome = ...`**.

---

### ✅ Solução definitiva

Adicione os **setters** na classe `Pessoa`. Sem isso, nenhuma tentativa de modificar `nome` ou `documento` por fora vai funcionar.

#### 📌 Pessoa.js (adicione abaixo dos getters):

```js
set nome(valor) {
    this.#nome = valor;
}

set documento(valor) {
    this.#documento = valor;
}
```

---

### 🔁 Depois disso...

O trecho em `Cliente.js`:

```js
this.nome = nome;
this.documento = documento;
```

...ou até mesmo:

```js
super.nome = nome;
super.documento = documento;
```

vai funcionar sem erro, porque agora a propriedade tem tanto o `get` quanto o `set`.

---

### ✅ Checklist rápido

| Local       | Ação                                                                 |
|-------------|----------------------------------------------------------------------|
| `Pessoa.js` | ✅ Adicione os `set nome(...)` e `set documento(...)`                |
| `Cliente.js`| ✅ Use `this.nome = nome` em vez de `super.nome = nome` (mais claro) |

---