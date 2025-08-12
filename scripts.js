
//Arquivo de Scripts - Projeto MongoDB 2025.1              
//Tema: Gerenciamento de Cinema                            


// ================= PARTE 1: SETUP E CARGA INICIAL =================
use('CINEMA');


// Apaga o banco de dados existente para garantir um estado limpo a cada execução
db.dropDatabase();

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
    assentos: [{ id: "A1", status: "indisponivel" }, { id: "A2", status: "indisponivel" },{ id: "A3", status: "disponivel" },{ id: "A4", status: "disponivel" },{ id: "A5", status: "disponivel" }]
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
    assentos: [{ id: "B1", status: "indisponivel" }, { id: "B2", status: "indisponivel" }, {id: "B3", status: "indisponivel" },{id: "B4", status: "disponivel" },{id: "B5", status: "indisponivel" }],
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
    assentos_comprados: ["B5"],
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


//////////// CONSULTAS


//4. AGRREGATE 5. MATCH 7.GTE --- FILMES COM DURACAO MAIOR QUE 100 MINUTOS

db.filmes.aggregate([{$match:{duracao_min:{$gte:100}}}])

//31. ADDTOSET 
//25. UPDATE --- COLOCANDO ANO DE LANÇAMENTO NOS FILMES
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



// 2.FIND 14.SORT 15. LIMIT--- ORDENAR OS FILMES EM ORDEM DECRECENTE DE ACORDO COM A DURACAO   
db.filmes.find().sort({"duracao_min":-1}).limit(3);


// 3.SIZE  - Encontrar vendas com exatamente 2 ingressos 
db.vendas.find({ assentos_comprados: { $size: 2 } }).toArray();


//20.ALL  - Encontrar filmes que são de Ação E Suspense 
db.filmes.find({ generos: { $all: ["Ação", "Suspense"] } });

//13. EXISTS  -FILMES EM CARTAZ
db.filmes.find({ em_cartaz: { $exists: true } })


//21.SET - Tirar um filme de cartaz 
db.filmes.updateOne(
    { titulo: "A Vingança do NoSQL" },  
    { $set: { em_cartaz: false } }
);  

// 27.RENAMECOLLECTION  - Renomear 'vendas' para 'ingressos' 
db.vendas.renameCollection("ingressos");

  
// 9. SUM --- SOMA O VALOR TOTAL ARERCADADE COM A VENDA DOS INGRESSOS DO CINEMA
db.ingressos.aggregate([
    {
      $group: {
        _id: null,
        total_arrecadado: { $sum: "$valor_total" }
      }
    }
  ]);


// 19.PRETTY - FORMATA A SAIDA
db.filmes.find().pretty()


//10. COUNT  - CONTAR SALAS EM MANUTENÇÃO
db.salas.countDocuments({ em_manutencao: true });


// 30.FINDONE --- RETORNA PRIMEIRO FILME QUE TEM MARIA COMO DIRETORA
db.filmes.findOne({ diretor: "Maria Souza" })



//16. WHERE 18.FUNCTION --- FILMES COM DURACAO MENOR 110 MINUTOS
db.filmes.find({
    $where: function() {
      return this.duracao_min < 110;
    }
  }).toArray();


// 22. TEXT e 23. SEARCH  - Buscar por texto na sinopse 
db.filmes.find({ $text: { $search: "banco de dados" } }).toArray();


//6.PROJECT -- MOSTRAR APENAS ALGUMAS INFORMACÕES DA SESSAO
db.sessoes.aggregate([
    {
      $project: {
        _id: 0,
        horario_inicio: 1,
        preco_ingresso: 1
      }
    }
  ]).toArray();



//8.GROUP 11.MAX -- MAIOR PREÇO POR INGRESS
db.ingressos.aggregate([
    {
    $group: {
        _id: "$id_sessao",           // Agrupa por id da sessão
        total_ingressos: { $sum: { $size: "$assentos_comprados" } }  // Soma a quantidade de assentos comprados por venda
    }
    }
]).toArray();


//12.AVG-- RETORNA O PREÇO MEDIO DOS INGRESSOS VENDIDOS NO CINEMA
db.sessoes.aggregate([
    {
      $group: {
        _id: null,                   // Agrupa todos juntos
        preco_medio: { $avg: "$preco_ingresso" }  // Calcula a média do preço
      }
    }
]).toArray();



//17.MAPREDUCE para contar quantos filmes existem por cada diretor na coleção filmes

const mapFunction = function() {
    emit(this.diretor, 1);  // Para cada documento, emite o diretor com valor 1
  };
  
const reduceFunction = function(key, values) {
    return Array.sum(values);  // Soma os valores para cada diretor
  };
  
db.filmes.mapReduce(
    mapFunction,
    reduceFunction,
    { out: "filmes_por_diretor" }  // Resultado armazenado nessa coleção
  );
  
  // Para ver o resultado:
  db.filmes_por_diretor.find().toArray();
  
  
  // 26. SAVE (com insertone)  - Inserir filme
  db.filmes.insertOne({
      titulo: "Salvação da Integração",
      diretor: "Victor Luiz",
      generos: ["Comédia", "Drama"],
      duracao_min: 100,
      em_cartaz: true
  });

//24. FILTER  - Listar apenas os assentos disponíveis da sala 1   
db.salas.aggregate([
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

