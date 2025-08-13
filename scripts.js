// Arquivo de Scripts - Projeto MongoDB 2025.1              
// Tema: Gerenciamento de Cinema                            


// ================= PARTE 1: SETUP E CARGA INICIAL =================
use('CINEMA');


// Apaga o banco de dados existente para garantir um estado limpo a cada execução
db.dropDatabase();

print("Banco de dados 'CINEMA' selecionado e limpo.");

// --- INSERÇÃO DE DADOS ---
// Inserção de dados nas coleções para popular o banco.
print("Inserindo dados iniciais...");

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
  },

  {
    _id: ObjectId("66ba3a79f8d488390c5fe3a3"),
    titulo: "A Lenda dos SGBDS",
    diretor: "Waléria Tymes",
    generos: ["Cinebiografia", "Histórias Reais"],
    duracao_min: 90,
    sinopse: "A história da Lenda dos Sistemas de Gerenciamento de Banco de Dados."
  },

  {
    _id: ObjectId("66ba3a79f8d488390c5fe3a4"),
    titulo: "Sem Espaço para Dados",
    diretor: "Tarantina",
    generos: ["Terror", "Suspense"],
    duracao_min: 80,
    em_cartaz: true,
    sinopse: "Uma jornada assustadora em um mundo onde os dados têm valor."
  }

]);

// Salas
db.salas.insertMany([
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3b0"),
    numero_sala: 1,
    capacidade: 150,
    recursos: ["3D", "Som Dolby Atmos"],
    assentos: [{ id: "A1", status: "indisponivel" }, { id: "A2", status: "indisponivel" },{ id: "A3", status: "disponivel" },{ id: "A4", status: "disponivel" },{ id: "A5", status: "indisponivel" }]
  },
  {
    _id: ObjectId("66ba3a79f8d488390c5fe3b1"),
    numero_sala: 2,
    capacidade: 100,
    recursos: ["4K"],
    em_manutencao: true,
    historico_manutencao: [{ data_inicio: new Date(), motivo: "Projetor quebrado" }]
  },

  {
    _id: ObjectId("66ba3a79f8d488390c5fe3b2"),
    numero_sala: 3,
    capacidade: 100,
    recursos: ["IMAX", "Som Dolby Atmos"],
    assentos: [{ id: "B1", status: "indisponivel" }, { id: "B2", status: "indisponivel" }, {id: "B3", status: "indisponivel" },{id: "B4", status: "disponivel" },{id: "B5", status: "disponivel" }],
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
  },

  {
    _id: ObjectId("66ba3a79f8d488390c5fe3c2"),
    id_filme: ObjectId("66ba3a79f8d488390c5fe3a4"), // Sem Espaço para Dados
    id_sala: ObjectId("66ba3a79f8d488390c5fe3b2"), // Sala 3
    horario_inicio: new Date("2025-08-13T18:00:00Z"),
    preco_ingresso: 40.00
  }
]);

// Vendas
db.vendas.insertMany([
  {
    id_sessao: ObjectId("66ba3a79f8d488390c5fe3c0"),// sala 1
    assentos_comprados: ["A1", "A2"],
    valor_total: 80.00,
    data_venda: new Date()
  },
  {
    id_sessao: ObjectId("66ba3a79f8d488390c5fe3c1"), //sala 1
    assentos_comprados: ["A5"],
    valor_total: 30.00,
    data_venda: new Date()
  },

  {
    id_sessao: ObjectId("66ba3a79f8d488390c5fe3c2"),// sala 3
    assentos_comprados: ["B1", "B2", "B3"],
    valor_total: 120.00,
    data_venda: new Date()
  }


]);

print("Dados iniciais inseridos com sucesso")

//////////// CONSULTAS

/*
--------------------
MANIPULAÇÃO DE DADOS
--------------------
*/

print("\n======== MANIPULAÇÃO DE DADOS ========");

//25. UPDATE --- COLOCANDO ANO DE LANÇAMENTO NOS FILMES
print("\n--- 25. UPDATE: Atualizando ano de lançamento dos filmes ---");

db.filmes.updateOne(
    { titulo: "A Vingança do NoSQL" },
    { $set: { ano_lancamento: 2020 } }
  );
  
db.filmes.updateOne(
    { titulo: "Meu Primeiro Documento" },
    { $set: { ano_lancamento: 2010 } }
);  

db.filmes.updateOne(
    { titulo: "A Odisseia dos Índices" },  
    { $set: { ano_lancamento: 2025 } }
);  
db.filmes.updateOne(
    { titulo: "A Lenda dos SGBDS" },  
    { $set: { ano_lancamento: 2014 } }
);  

db.filmes.updateOne(
    { titulo: "Sem Espaço para Dados" },  
    { $set: { ano_lancamento: 2023 } }
);  

print("Anos de lançamento atualizados");

//21.SET - Tirar um filme de cartaz 
print("\n--- 21. SET: Tirando um filme de cartaz ---");
printjson(db.filmes.updateOne( { titulo: "A Vingança do NoSQL" }, { $set: { em_cartaz: false } } )); 

// 27.RENAMECOLLECTION  - Renomear 'vendas' para 'ingressos' 
print("\n--- 27. RENAMECOLLECTION: Renomeando coleção 'vendas' para 'ingressos' ---");
db.vendas.renameCollection("ingressos");
print("Coleção 'vendas' renomeada para 'ingressos'.");

// 26. SAVE (com insertOne) - Inserir filme
print("\n--- 26. INSERT: Inserindo um novo filme ('Salvação da Integração') ---");
printjson(db.filmes.insertOne({ titulo: "Salvação da Integração", diretor: "Victor Luiz", generos: ["Comédia", "Drama"], duracao_min: 100, em_cartaz: true }));

// 31. ADDTOSET --- adicionar genero em lista de generos
print("\n--- 31. ADDTOSET: Adicionando 'Romance' ao gênero de um filme ---");
printjson(db.filmes.updateOne({ titulo: "Meu Primeiro Documento" }, { $addToSet: { generos: "Romance" } }));

// 22. TEXT - Criar índice de texto para busca
print("\n--- 22. CREATEINDEX: Criando índice de texto para busca na sinopse ---");
db.filmes.createIndex({ sinopse: "text" });
print("Índice de texto criado.");


/*
-------------------------
CONSULTA DE BUSCA SIMPLES
-------------------------
*/


print("\n========== CONSULTAS DE BUSCA SIMPLES ==========");

// 2.FIND 14.SORT 15. LIMIT--- ORDENAR OS FILMES EM ORDEM DECRECENTE DE ACORDO COM A DURACAO  
print("\n--- 2, 14, 15. FIND/SORT/LIMIT: Ordenar os 3 filmes com maior duração ---"); 
printjson(db.filmes.find().sort({"duracao_min":-1}).limit(3).toArray());

// 3.SIZE  - Encontrar vendas com exatamente 2 ingressos 
print("\n--- 3. SIZE: Vendas com exatamente 2 ingressos ---");
printjson(db.vendas.find({ assentos_comprados: { $size: 2 } }).toArray());

//20.ALL  - Encontrar filmes que são de Ação E Suspense 
print("\n--- 20. ALL: Filmes que são de 'Ação' E 'Suspense' ---");
printjson(db.filmes.find({ generos: { $all: ["Ação", "Suspense"] } }).toArray());

//13. EXISTS  -FILMES EM CARTAZ
print("\n--- 13. EXISTS: Filmes que possuem o campo 'em_cartaz' ---");
printjson(db.filmes.find({ em_cartaz: { $exists: true } }).toArray());

// 10. COUNT - CONTAR SALAS EM MANUTENÇÃO
print("\n--- 10. COUNTDOCUMENTS: Contando salas em manutenção ---");
printjson(db.salas.countDocuments({ em_manutencao: true }));

// 30. FINDONE --- RETORNA PRIMEIRO FILME QUE TEM MARIA COMO DIRETORA
print("\n--- 30. FINDONE: Retornando o primeiro filme da diretora 'Maria Souza' ---");
printjson(db.filmes.findOne({ diretor: "Maria Souza" }));

// 16. WHERE 18. FUNCTION --- FILMES COM DURACAO MENOR 110 MINUTOS
print("\n--- 16, 18. $WHERE/FUNCTION: Filmes com duração menor que 110 minutos ---");
printjson(db.filmes.find({ $where: function() { return this.duracao_min < 110; } }).toArray());

// 23. SEARCH - Buscar por texto na sinopse
print("\n--- 23. SEARCH: Buscando por 'banco de dados' na sinopse ---");
printjson(db.filmes.find({ $text: { $search: "banco de dados" } }).toArray());

// 19. PRETTY - FORMATA A SAIDA
print("\n--- 19. PRETTY: Listando todos os filmes ---");
db.filmes.find().pretty();


/*
----------------------
CONSULTAS DE AGREGAÇÃO
----------------------
*/


print("\n========== CONSULTAS DE AGREGAÇÃO ==========");

//4. AGRREGATE 5. MATCH 7.GTE --- FILMES COM DURACAO MAIOR QUE 100 MINUTOS

print("\n--- 4, 5, 7. AGGREGATE/MATCH/GTE: Filmes com duração >= 100 minutos ---");
printjson(db.filmes.aggregate([{$match:{duracao_min:{$gte:100}}}]).toArray());

// 9. SUM --- SOMA O VALOR TOTAL ARERCADADE COM A VENDA DOS INGRESSOS DO CINEMA
print("\n--- 9. SUM: Somando o valor total arrecadado com a venda dos ingressos ---");
printjson(db.ingressos.aggregate([ { $group: { _id: null, total_arrecadado: { $sum: "$valor_total" } } } ]).toArray());

// 6. PROJECT -- MOSTRAR APENAS ALGUMAS INFORMACÕES DA SESSAO
print("\n--- 6. PROJECT: Mostrando apenas horário e preço das sessões ---");
printjson(db.sessoes.aggregate([ { $project: { _id: 0, horario_inicio: 1, preco_ingresso: 1 } } ]).toArray());

// 8. GROUP 
print("\n--- 8. GROUP: Agrupando para contar total de ingressos por sessão ---");
printjson(db.ingressos.aggregate([ { $group: { _id: "$id_sessao", total_ingressos: { $sum: { $size: "$assentos_comprados" } } } } ]).toArray());

// 11. MAX - Encontrar o maior valor de venda registrado em uma unica transação
print("\n--- 11. MAX: Encontrando o maior valor de venda única ---");
printjson(db.ingressos.aggregate([ { $group: { _id: null, maior_valor_venda: { $max: "$valor_total" } } } ]).toArray());

// 12. AVG -- RETORNA O PREÇO MEDIO DOS INGRESSOS VENDIDOS NO CINEMA
print("\n--- 12. AVG: Calculando o preço médio dos ingressos ---");
printjson(db.sessoes.aggregate([ { $group: { _id: null, preco_medio: { $avg: "$preco_ingresso" } } } ]).toArray());

// 17. MAPREDUCE para contar quantos filmes existem por cada diretor na coleção filmes
print("\n--- 17. MAPREDUCE: Contando filmes por diretor ---");
const mapFunction = function() { emit(this.diretor, 1); };
const reduceFunction = function(key, values) { return Array.sum(values); };
db.filmes.mapReduce(mapFunction, reduceFunction, { out: "filmes_por_diretor" });
print("MapReduce executado. O resultado foi salvo na coleção 'filmes_por_diretor'.");
print("--- Visualizando o resultado do MapReduce ---");
printjson(db.filmes_por_diretor.find().toArray());


// 24. FILTER - Listar apenas os assentos disponíveis
print("\n--- 24. FILTER: Listando apenas os assentos disponíveis de cada sala ---");
printjson(db.salas.aggregate([ { $project: { _id: 0, numero_sala: 1, assentos_disponiveis: { $filter: { input: "$assentos", as: "assento", cond: { $eq: ["$$assento.status", "disponivel"] } } } } } ]).toArray());

// 28. COND - Classificar filmes como 'Longo' ou 'Normal'
print("\n--- 28. COND: Classificando filmes como 'Longo' ou 'Normal' ---");
printjson(db.filmes.aggregate([ { $project: { _id: 0, titulo: 1, classificacao_duracao: { $cond: { if: { $gt: ["$duracao_min", 120] }, then: "Longo", else: "Normal" } } } } ]).toArray());

// 29. LOOKUP -- juntar informaçoes da sessão, filme e sala
print("\n--- 29. LOOKUP: Juntando informações de sessões, filmes e salas ---");
printjson(db.sessoes.aggregate([
  { $lookup: { from: "filmes", localField: "id_filme", foreignField: "_id", as: "info_filme" } },
  { $lookup: { from: "salas", localField: "id_sala", foreignField: "_id", as: "info_sala" } },
  { $unwind: "$info_filme" }, { $unwind: "$info_sala" },
  { $project: { _id: 0, horario_inicio: 1, preco_ingresso: 1, "filme_titulo": "$info_filme.titulo", "filme_diretor": "$info_filme.diretor", "sala_numero": "$info_sala.numero_sala", "sala_capacidade": "$info_sala.capacidade" } }
]).toArray());


print("\n========== FIM DAS CONSULTAS ==========");

// -------------FIM---------------