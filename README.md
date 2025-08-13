# 🚀 Projeto-MongoDB: Gerenciamento de Cinema

## 📋 Relatório Final do Projeto da Disciplina de Banco de Dados

### 👥 Equipe

* Adriana Theil Melcop Castro - atmc@cin.ufpe.br
* Eduarda Vitória Albuquerque Sales - evas@cin.ufpe.br
* Gustavo Felipe Alves da Silva - gfas2@cin.ufpe.br
* Júlia Zovka de Souza - jzs@cin.ufpe.br
* Lucas Guimarães Fernandes - lgf@cin.ufpe.br
* Marcela Pereira Raposo - mpr@cin.ufpe.br

---

## 1. 📄 Descrição

Este projeto consiste na criação e manipulação de um banco de dados NoSQL utilizando MongoDB para simular o sistema de gerenciamento de um cinema. O sistema abrange o controle de filmes em cartaz, a gestão das salas (incluindo capacidade e manutenção), o agendamento de sessões e o registro de venda de ingressos.

O objetivo principal é aplicar os conceitos de modelagem de dados não relacionais e executar operações de CRUD (Create, Read, Update, Delete), com foco especial em consultas complexas e agregações, utilizando os recursos e operadores avançados do MongoDB para extrair informações valiosas do sistema.

## 2. 🗄️ Modelo de Dados

A aplicação foi modelada com quatro coleções principais, que se relacionam através de referências (`ObjectId`). A seguir, detalha-se a estrutura de cada uma:

* **`filmes`**: Armazena informações sobre os filmes.
    ```javascript
    {
      _id: ObjectId,
      titulo: String,
      diretor: String,
      generos: [String],
      duracao_min: Number,
      sinopse: String,
      ano_lancamento: Number, // Adicionado via update
      em_cartaz: Boolean
    }
    ```

* **`salas`**: Contém dados sobre cada sala de cinema.
    ```javascript
    {
      _id: ObjectId,
      numero_sala: Number,
      capacidade: Number,
      recursos: [String], // Ex: "3D", "4K"
      em_manutencao: Boolean,
      historico_manutencao: [{ data_inicio: Date, motivo: String }],
      assentos: [{ id: String, status: String }]
    }
    ```

* **`sessoes`**: Vincula um filme a uma sala em um determinado horário.
    ```javascript
    {
      _id: ObjectId,
      id_filme: ObjectId, // Ref: filmes
      id_sala: ObjectId,  // Ref: salas
      horario_inicio: Date,
      preco_ingresso: Number
    }
    ```

* **`ingressos`** (originalmente `vendas`): Registra cada transação de venda.
    ```javascript
    {
      id_sessao: ObjectId, // Ref: sessoes
      assentos_comprados: [String],
      valor_total: Number,
      data_venda: Date
    }
    ```

## 3. 💻 Tecnologias Utilizadas

* **Banco de Dados:** MongoDB
* **Interface Gráfica:** MongoDB Compass
* **Shell Interativo:** `mongosh`
* **Controle de Versão:** Git & GitHub

## 4. ▶️ Como Executar o Projeto

Para recriar o ambiente e executar todas as demonstrações, siga os passos abaixo:

1.  **Pré-requisitos:**
    * Ter o MongoDB instalado e em execução no seu ambiente local.
    * Ter o `mongosh` acessível no seu terminal.

2.  **Clonar o Repositório:**
    ```bash
    git clone [https://github.com/dudalbuquerque/Projeto-MongoDB.git](https://github.com/dudalbuquerque/Projeto-MongoDB.git)
    cd Projeto-MongoDB
    ```

3.  **Iniciar o `mongosh`:**
    Com o terminal aberto na pasta do projeto, inicie o shell do MongoDB.
    ```bash
    mongosh
    ```

4.  **Executar o Script:**
    Dentro do `mongosh`, carregue o arquivo de script principal. Isso irá apagar o banco de dados `CINEMA` se ele existir, recriá-lo, popular com dados de exemplo e executar todas as consultas de demonstração.
    ```javascript
    load('scripts.js')
    ```

## 5. 📂 Estrutura do Repositório

* `README.md`: Este arquivo, com a documentação completa do projeto.
* `scripts.js`: O arquivo principal contendo todos os comandos MongoDB para a criação, população e consulta ao banco de dados.

## 6. 🔍 Consultas e Operações Implementadas

O arquivo `scripts.js` contém 31 operações distintas que demonstram a manipulação e a consulta de dados no MongoDB. Abaixo estão alguns exemplos representativos, divididos por categoria.

### Manipulação de Dados

* **`updateOne` e `$set`**: Utilizado para adicionar o ano de lançamento a todos os filmes e para alterar o status `em_cartaz` de um filme.
* **`renameCollection`**: A coleção `vendas` foi renomeada para `ingressos` para melhor semântica.
* **`insertOne`**: Demonstra a inserção de um novo documento na coleção `filmes`.
* **`$addToSet`**: Garante que um gênero seja adicionado a um filme sem duplicatas.
* **`createIndex` e `$text`**: Foi criado um índice de texto no campo `sinopse` para permitir buscas textuais eficientes.

### Consultas Simples e Operadores

* **`find` com `sort` e `limit`**: Lista os 3 filmes com maior duração.
* **`$size`**: Encontra vendas que contenham um número exato de assentos comprados.
* **`$all`**: Localiza filmes que pertencem a múltiplos gêneros simultaneamente ("Ação" E "Suspense").
* **`$exists`**: Retorna todos os filmes que possuem o campo `em_cartaz`.
* **`countDocuments`**: Conta o número de salas que estão atualmente em manutenção.
* **`$where`**: Utiliza uma função JavaScript para filtrar filmes com base em uma condição (duração < 110 minutos).

### Consultas de Agregação (Aggregation Pipeline)

* **`$match` e `$gte`**: Filtra filmes que atendem a um critério numérico (duração >= 100 minutos).
* **`$group` com `$sum`, `$avg` e `$max`**: Calcula totais, médias e valores máximos nas coleções.
* **`$lookup`**: Realiza uma junção (join) entre as coleções `sessoes`, `filmes` e `salas` para criar um relatório detalhado.
* **`$project`**: Remodela os documentos de saída para exibir apenas os campos desejados.
* **`$filter`**: Percorre um array (`assentos`) e retorna um subconjunto com base em uma condição.
* **`$cond`**: Aplica uma lógica condicional para criar um novo campo (`classificacao_duracao`).
* **`mapReduce`**: Demonstra uma operação para contar quantos filmes cada diretor possui na coleção.

## 7. 🏁 Conclusão

Este projeto permitiu a aplicação prática e aprofundada dos conceitos de bancos de dados NoSQL com MongoDB. Através da modelagem de um sistema de gerenciamento de cinema, foi possível explorar desde operações básicas de CRUD até funcionalidades avançadas como o Aggregation Framework, índices de texto e MapReduce. A estrutura flexível do MongoDB mostrou-se adequada para o domínio do problema, facilitando a representação de dados complexos e relacionados de forma intuitiva e eficiente. O desenvolvimento das 31 consultas exigidas demonstrou a capacidade do MongoDB de responder a uma vasta gama de perguntas de negócio, reforçando o conhecimento adquirido na disciplina.
