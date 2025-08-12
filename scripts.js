
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

// =========== PARTE 2: DEMONSTRAÇÃO DOS REQUISITOS ===========

//2. FIND e 30. FINDONE  - Seleção básica
print("Todos os filmes em cartaz:");
printjson(db.filmes.find().toArray());

print("\nEncontrar uma sala específica (número 2):");
printjson(db.salas.findOne({ numero_sala: 2 }));


// 3. SIZE  - Encontrar vendas com exatamente 2 ingressos 
printjson(db.vendas.find({ assentos_comprados: { $size: 2 } }).toArray());


//4. AGGREGATE, 5. MATCH, 6. PROJECT, 7. GTE, 8. GROUP, 9. SUM, 11. MAX, 12. AVG  
print("Relatório de vendas: agrupa as vendas por sessão, calcula o total, a média e o maior valor por sessão para filmes com duração >= 90 min.");
const relatorioVendas = db.sessoes.aggregate([
    { // --- 29. LOOKUP  ---
      $lookup: { // Junta sessoes com filmes
        from: "filmes",
        localField: "id_filme",
        foreignField: "_id",
        as: "detalhes_filme"
      }
    },
    { $unwind: "$detalhes_filme" },
    { // --- 5. MATCH  e 7. GTE  ---
      $match: { "detalhes_filme.duracao_min": { $gte: 90 } } // Filtra filmes com duração >= 90 min
    },
    { // --- 29. LOOKUP  ---
      $lookup: { // Junta o resultado com vendas
        from: "vendas",
        localField: "_id",
        foreignField: "id_sessao",
        as: "vendas_sessao"
      }
    },
    { // --- 8. GROUP  ---
      $group: {
        _id: "$detalhes_filme.titulo",
        // --- 9. SUM  ---
        total_arrecadado: { $sum: { $sum: "$vendas_sessao.valor_total" } },
        // --- 12. AVG  ---
        media_por_venda: { $avg: { $sum: "$vendas_sessao.valor_total" } },
        // --- 11. MAX  ---
        maior_venda_registrada: { $max: { $sum: "$vendas_sessao.valor_total" } }
      }
    },
    { // --- 6. PROJECT  ---
      $project: {
        _id: 0,
        filme: "$_id",
        receita_total: "$total_arrecadado",
        outros_stats: {
            media: "$media_por_venda",
            maior_venda: "$maior_venda_registrada"
        }
      }
    }
]).toArray();
printjson(relatorioVendas);


//10. COUNT  (countDocuments) - Contar salas em manutenção
const salasManutencao = db.salas.countDocuments({ em_manutencao: true });
print(`Número de salas em manutenção: ${salasManutencao}`);


//13. EXISTS  - Encontrar salas que já tiveram manutenção
printjson(db.salas.find({ historico_manutencao: { $exists: true } }).toArray());


//14. SORT e 15. LIMIT  - Listar os 2 filmes mais longos
printjson(db.filmes.find().sort({ duracao_min: -1 }).limit(2).toArray());


//16. $WHERE  - Encontrar filmes onde o título é mais curto que a sinopse (USAR COM CUIDADO) 
printjson(db.filmes.find({ $where: "this.titulo.length < this.sinopse.length" }).toArray());


//17. MAPREDUCE e 18. FUNCTION  - Calcular total de ingressos por gênero 
const mapFunction = function() { // --- 18. FUNCTION ---
    this.generos.forEach(genero => {
        emit(genero, 1);
    });
};
const reduceFunction = function(key, values) { // --- 18. FUNCTION ---
    return Array.sum(values);
};
db.filmes.mapReduce(mapFunction, reduceFunction, { out: "total_por_genero" });
printjson(db.total_por_genero.find().toArray());

//  19. PRETTY  - Ja utilizado implicitamente com printjson, mas aqui esta um exemplo direto no shell 
// Para ver o efeito, execute no shell: db.filmes.find().pretty()
print("O comando db.collection.find().pretty() formata o resultado no shell. `printjson` tem efeito similar aqui.");


//20. ALL  - Encontrar filmes que são de Ação E Suspense 
printjson(db.filmes.find({ generos: { $all: ["Ação", "Suspense"] } }).toArray());


//21. SET e 25. UPDATE (updateOne)  - Tirar um filme de cartaz 
db.filmes.updateOne(
  { titulo: "A Vingança do NoSQL" },
  { $set: { em_cartaz: false } }
);
print("Filme 'A Vingança do NoSQL' atualizado. Campo 'em_cartaz' agora é false.");
printjson(db.filmes.findOne({ titulo: "A Vingança do NoSQL" }));


// 22. TEXT e 23. SEARCH  - Buscar por texto na sinopse 
db.filmes.createIndex({ sinopse: "text" });
printjson(db.filmes.find({ $text: { $search: "banco de dados" } }).toArray());


//24. FILTER  - Listar apenas os assentos disponíveis da sala 1 
const assentosDisponiveis = db.salas.aggregate([
    { $match: { numero_sala: 1 } },
    { $project: {
        _id: 0,
        assentos_disponiveis: {
            $filter: {
               input: "$assentos",
               as: "assento",
               cond: { $eq: [ "$$assento.status", "disponivel" ] }
            }
        }
    }}
]).toArray();
printjson(assentosDisponiveis);


// 26. SAVE (simulado com upsert)  - Inserir ou atualizar um filme 
// O método save() é obsoleto. A funcionalidade é simulada com updateOne e a opção upsert: true.
db.filmes.updateOne(
  { titulo: "A Lenda do Json" },
  { $set: { diretor: "Anônimo", generos: ["Fantasia"], duracao_min: 80, em_cartaz: true } },
  { upsert: true }
);
print("Executado 'save' para 'A Lenda do Json'. Documento inserido ou atualizado.");
printjson(db.filmes.find({ titulo: "A Lenda do Json" }).toArray());


// 27. RENAMECOLLECTION  - Renomear 'vendas' para 'ingressos' 
db.vendas.renameCollection("ingressos");
print("Coleção 'vendas' renomeada para 'ingressos'. Verificando se a nova coleção existe:");
print(db.getCollectionNames());

//28. COND  - Classificar filmes como 'Longo' ou 'Normal'
const filmesClassificados = db.filmes.aggregate([
  {
    $project: {
      _id: 0,
      titulo: 1,
      classificacao_duracao: {
        $cond: { if: { $gt: ["$duracao_min", 120] }, then: "Longo", else: "Normal" }
      }
    }
  }
]).toArray();
printjson(filmesClassificados);

//31. ADDTOSET  - Adicionar um gênero a um filme, sem duplicar 
db.filmes.updateOne(
  { titulo: "A Odisseia dos Índices" },
  { $addToSet: { generos: "História" } }
);
print("Adicionado o gênero 'História' ao filme 'A Odisseia dos Índices'.");
printjson(db.filmes.findOne({ titulo: "A Odisseia dos Índices" }));

print("DEMONSTRAÇÃO DOS REQUISITOS CONCLUÍDA");
