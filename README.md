# Projeto-MongoDB  
## Gerenciamento da ocupação e manutenção de salas de cinema, filmes exibidos, horários, e venda de ingressos

## 1. Descrição 

Este projeto consiste na criação e manipulação de um banco de dados NoSQL utilizando MongoDB para simular o sistema de gerenciamento de um cinema. O sistema abrange o controle de filmes em cartaz, a gestão das salas (incluindo capacidade e manutenção), o agendamento de sessões e o registro de venda de ingressos.

O objetivo é aplicar os conceitos de modelagem de dados não relacionais e executar operações de inserção, atualização, remoção e, principalmente, seleção de dados, utilizando os recursos e operadores do MongoDB.

## 2. Modelo de Dados

A aplicação foi modelada com quatro coleções principais, que se relacionam através de referências (`ObjectId`):

* **`filmes`**: Armazena todas as informações sobre os filmes, como título, diretor, gêneros, duração e sinopse.
* **`salas`**: Contém dados sobre cada sala de cinema, incluindo sua capacidade, recursos (3D, 4K, etc.) e status de manutenção.
* **`sessoes`**: Vincula um filme a uma sala em um determinado horário, definindo também o preço do ingresso para aquela sessão.
* **`ingressos`** (originalmente `vendas`): Registra cada transação de venda de ingressos, referenciando a sessão e listando os assentos comprados.

## 3. Tecnologias Utilizadas

* **Banco de Dados:** MongoDB
* **Interface Gráfica:** MongoDB Compass
* **Shell:** `mongosh`
* **Controle de Versão:** Git & GitHub

## 4. Como Executar o Projeto

Para recriar o ambiente e executar todas as demonstrações, siga os passos abaixo:

1.  **Pré-requisitos:**
    * Ter o MongoDB instalado localmente.
    * Ter o `mongosh` acessível no seu terminal.

2.  **Clonar o Repositório:**
    ```bash
    git clone [https://github.com/dudalbuquerque/Projeto-MongoDB.git]
    ```

3.  **Inicie o `mongosh`:**
    Com o terminal **já dentro da pasta do projeto**, inicie o shell do MongoDB.
    ```bash
    mongosh
    ```

4.  **Execute o Script:**
    Agora que o `mongosh` está rodando a partir da pasta correta, você pode carregar o script usando apenas o nome do arquivo (um caminho relativo).
    ```javascript
    load('scripts.js')
    ```
    
Isso irá apagar qualquer versão anterior do banco `cinemaDB`, recriá-lo do zero, inserir todos os dados de exemplo e, em seguida, executar todas as consultas de demonstração listadas no arquivo.
    
## 5. Estrutura do Repositório

* `README.md`: Este arquivo, com a documentação completa do projeto.
* `scripts.js`: O arquivo principal contendo todos os comandos MongoDB. Ele é responsável por:
    * Limpar e preparar o banco de dados.
    * Inserir todos os dados de exemplo (carga inicial).
    * Executar uma consulta de exemplo para cada um dos 31 itens exigidos na checklist do projeto.
 
## 6. Equipe

* Adriana Theil Melcop Castro - atmc@cin.ufpe.br
* Eduarda Vitória Albuquerque Sales - evas@cin.ufpe.br
* Gustavo Felipe Alves da Silva - gfas2@cin.ufpe.br
* Júlia Zovka de Souza - jzs@cin.ufpe.br
* Lucas Guimarães Fernandes - lgf@cin.ufpe.br
* Marcela Pereira Raposo - mpr@cin.ufpe.br
