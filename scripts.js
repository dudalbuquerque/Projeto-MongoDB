
//Arquivo de Scripts - Projeto MongoDB 2025.1              
//Tema: Gerenciamento de Cinema                            


// ================= PARTE 1: SETUP E CARGA INICIAL =================

// --- 1. USE  ---
// Seleciona o banco de dados 'cinemaDB, se não existir, ele sera criado
use('cinemaDB');

// Apaga o banco de dados existente para garantir um estado limpo a cada execução
db.dropDatabase();
use('cinemaDB');

print("Banco de dados 'cinemaDB' selecionado e limpo.");

// --- INSERÇÃO DE DADOS ---
// Inserção de dados nas coleções para popular o banco.

// Filmes
db.filmes.insertMany([
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3a0"),
    titulo: "A Vingança do NoSQL",
    diretor: "Maria Souza",
    generos: ["Ação", "Suspense", "Ficção Científica"],
    duracao_min: 140,
    sinopse: "Uma busca por dados em um universo distribuído. Uma aventura de alta performance."
  },
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3a1"),
    titulo: "Meu Primeiro Documento",
    diretor: "João da Silva",
    generos: ["Comédia", "Drama"],
    duracao_min: 95,
    sinopse: "A jornada cômica de um documento para ser inserido no banco de dados."
  },
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3a2"),
    titulo: "A Odisseia dos Índices",
    diretor: "Maria Souza",
    generos: ["Documentário", "Tecnologia"],
    duracao_min: 110,
    sinopse: "Uma análise profunda sobre a otimização de consultas e a importância dos índices."
  }
]);

// Salas
db.salas.insertMany([
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3b0"),
    numero_sala: 1,
    capacidade: 150,
    recursos: ["3D", "Som Dolby Atmos"],
    assentos: [{ id: "A1", status: "disponivel" }, { id: "A2", status: "disponivel" }]
  },
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3b1"),
    numero_sala: 2,
    capacidade: 100,
    recursos: ["4K"],
    em_manutencao: true,
    historico_manutencao: [{ data_inicio: new Date(), motivo: "Projetor quebrado" }]
  }
]);

// Sessões
db.sessoes.insertMany([
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3c0"),
    id_filme: ObjectId("66ba3a79f8d488390c5fe3a0"), // A Vingança do NoSQL
    id_sala: ObjectId("66ba3a79f8d488390c5fe3b0"),  // Sala 1
    horario_inicio: new Date("2025-08-12T19:00:00Z"),
    preco_ingresso: 40.00
  },
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3c1"),
    id_filme: ObjectId("66ba3a79f8d488390c5fe3a1"), // Meu Primeiro Documento
    id_sala: ObjectId("66ba3a79f8d488390c5fe3b0"),  // Sala 1
    horario_inicio: new Date("2025-08-12T21:30:00Z"),
    preco_ingresso: 30.00
  }
]);

// Vendas
db.vendas.insertMany([
  {
    id_sessao: ObjectId("66ba3a79f8d488390c5fe3c0"),
    assentos_comprados: ["A1", "A2"],
    valor_total: 80.00,
    data_venda: new Date()
  },
  {
    id_sessao: ObjectId("66ba3a79f8d488390c5fe3c1"),
    assentos_comprados: ["B5"],
    valor_total: 30.00,
    data_venda: new Date()
  }
]);

print("======== CARGA INICIAL CONCLUÍDA ========");
