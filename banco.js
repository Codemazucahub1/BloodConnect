// Importa o MySQL para permitir que o Node.js converse com o banco
// O "/promise" permite trabalhar com Promises
const mysql = require('mysql2/promise');




// Cria um pool de conexões com o banco de dados
// O pool permite reutilizar conexões com o MySQL
const banco = mysql.createPool({


    // MySQL está rodando no próprio computador
    host: 'localhost',


    // Usuário do MySQL
    user: 'root',


    // Senha do usuário do MySQL
    password: '*****',


    // Banco de dados que será utilizado pela aplicação
    database: 'bloodconnect'
});




// Permite que outros arquivos do projeto utilizem essa conexão
module.exports = banco;
