// ============================================================
// 1. IMPORTANDO AS FERRAMENTAS
// ============================================================


// Express: ajuda a criar o servidor e as rotas da API
const express = require('express');


// mysql2: permite que o Node.js se comunique com o MySQL
const mysql = require('mysql2');




// ============================================================
// 2. CRIANDO O SERVIDOR
// ============================================================


const app = express();


// Permite que a API receba dados no formato JSON
app.use(express.json());


// Porta onde o servidor vai funcionar
const PORTA = 3000;




// ============================================================
// 3. CONEXÃO COM O BANCO DE DADOS
// ============================================================


// Configura a conexão com o banco MySQL
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*****',
    database: 'bloodconnect',
    port: 3306
});


// Conectar a API ao banco MySQL
conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar com o MySQL:', erro.message);
        return;
    }


    console.log('Conectado ao banco bloodconnect!');
});




// ============================================================
// 4. DOADORES
// ============================================================


// GET = consultar/buscar dados
// Busca todos os doadores no banco
app.get('/doadores', (req, res) => {


    conexao.query(
        'SELECT id_doador, nome, cpf, DATE_FORMAT(data_nascimento, "%Y-%m-%d") AS data_nascimento, tipo_sanguineo, telefone, email, apto_doar FROM doadores',
        (erro, resultados) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao buscar doadores'
                });
                return;
            }


            // Devolve os resultados em formato JSON
            res.json(resultados);
        }
    );
});




// GET = consultar hemocentros
app.get('/hemocentros', (req, res) => {


    conexao.query('SELECT * FROM hemocentros', (erro, resultados) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao buscar hemocentros'
            });
            return;
        }


        res.json(resultados);
    });
});




// GET = consultar estoques
app.get('/estoques', (req, res) => {


    conexao.query('SELECT * FROM estoques', (erro, resultados) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao buscar estoques'
            });
            return;
        }


        res.json(resultados);
    });
});




// GET = consultar hospitais
app.get('/hospitais', (req, res) => {


    conexao.query('SELECT * FROM hospitais', (erro, resultados) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao buscar hospitais'
            });
            return;
        }


        res.json(resultados);
    });
});




// GET = consultar solicitações
app.get('/solicitacoes', (req, res) => {


    conexao.query('SELECT * FROM solicitacoes', (erro, resultados) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao buscar solicitações'
            });
            return;
        }


        res.json(resultados);
    });
});




// ============================================================
// 5. CADASTRAR DOADOR
// ============================================================


// POST = cadastrar/inserir um novo dado
app.post('/doadores', (req, res) => {


    // Pega os dados enviados no JSON
    const {
        nome,
        cpf,
        data_nascimento,
        tipo_sanguineo,
        telefone,
        email,
        apto_doar
    } = req.body;


    // Comando SQL para inserir o novo doador
    // Os ? serão substituídos pelos valores enviados
    const sql = `
        INSERT INTO doadores
        (nome, cpf, data_nascimento, tipo_sanguineo, telefone, email, apto_doar)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;


    conexao.query(
        sql,
        [nome, cpf, data_nascimento, tipo_sanguineo, telefone, email, apto_doar],


        (erro, resultado) => {


            if (erro) {
                console.log(erro);


                res.status(500).json({
                    erro: 'Erro ao cadastrar doador',
                    detalhe: erro.message
                });


                return;
            }


            // insertId = ID criado automaticamente pelo MySQL
            res.status(201).json({
                mensagem: 'Doador cadastrado com sucesso!',
                id_doador: resultado.insertId
            });
        }
    );
});




// ============================================================
// 6. ALTERAR DOADOR
// ============================================================


// PUT = alterar um dado existente
// O :id recebe o ID do doador pela URL
// Exemplo: PUT /doadores/5
app.put('/doadores/:id', (req, res) => {


    // Pega o ID que veio na URL
    const { id } = req.params;


    // Pega o novo telefone enviado no JSON
    const { telefone } = req.body;


    // Comando SQL para alterar o telefone
    const sql = 'UPDATE doadores SET telefone = ? WHERE id_doador = ?';


    conexao.query(sql, [telefone, id], (erro, resultado) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao alterar doador'
            });
            return;
        }


        res.json({
            mensagem: 'Doador alterado com sucesso!'
        });
    });
});




// ============================================================
// 7. EXCLUIR DOADOR
// ============================================================


// DELETE = excluir um dado
// Exemplo: DELETE /doadores/5
app.delete('/doadores/:id', (req, res) => {


    const { id } = req.params;


    // Comando SQL para excluir o doador pelo ID
    const sql = 'DELETE FROM doadores WHERE id_doador = ?';


    conexao.query(sql, [id], (erro, resultado) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao excluir doador'
            });
            return;
        }


        res.json({
            mensagem: 'Doador excluído com sucesso!'
        });
    });
});




// ============================================================
// 8. HOSPITAIS
// ============================================================


// GET = consultar hospitais
app.get('/hospitais', (req, res) => {


    conexao.query(
        'SELECT * FROM hospitais',
        (erro, resultados) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao buscar hospitais'
                });
                return;
            }


            res.json(resultados);
        }
    );
});




// POST = cadastrar hospital
app.post('/hospitais', (req, res) => {


    // Pega os dados enviados pelo usuário
    const { nome, endereco, telefone, email } = req.body;


    const sql = `
        INSERT INTO hospitais
        (nome, endereco, telefone, email)
        VALUES (?, ?, ?, ?)
    `;


    conexao.query(
        sql,
        [nome, endereco, telefone, email],
        (erro, resultado) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao cadastrar hospital'
                });
                return;
            }


            res.status(201).json({
                mensagem: 'Hospital cadastrado com sucesso!',
                id_hospital: resultado.insertId
            });
        }
    );
});




// PUT = alterar hospital
app.put('/hospitais/:id', (req, res) => {


    const { id } = req.params;


    const { nome, endereco, telefone, email } = req.body;


    const sql = `
        UPDATE hospitais
        SET nome = ?, endereco = ?, telefone = ?, email = ?
        WHERE id_hospital = ?
    `;


    conexao.query(
        sql,
        [nome, endereco, telefone, email, id],
        (erro, resultado) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao alterar hospital'
                });
                return;
            }


            res.json({
                mensagem: 'Hospital alterado com sucesso!'
            });
        }
    );
});




// DELETE = excluir hospital
app.delete('/hospitais/:id', (req, res) => {


    const { id } = req.params;


    const sql = 'DELETE FROM hospitais WHERE id_hospital = ?';


    conexao.query(sql, [id], (erro, resultado) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao excluir hospital'
            });
            return;
        }


        res.json({
            mensagem: 'Hospital excluído com sucesso!'
        });
    });
});




// ============================================================
// 9. HEMOCENTROS
// ============================================================


// POST = cadastrar hemocentro
app.post('/hemocentros', (req, res) => {


    const { nome, endereco, telefone, email } = req.body;


    const sql = `
        INSERT INTO hemocentros
        (nome, endereco, telefone, email)
        VALUES (?, ?, ?, ?)
    `;


    conexao.query(
        sql,
        [nome, endereco, telefone, email],
        (erro, resultado) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao cadastrar hemocentro'
                });
                return;
            }


            res.status(201).json({
                mensagem: 'Hemocentro cadastrado com sucesso!',
                id_hemocentro: resultado.insertId
            });
        }
    );
});




// PUT = alterar hemocentro
app.put('/hemocentros/:id', (req, res) => {


    const { id } = req.params;
    const { nome, endereco, telefone, email } = req.body;


    const sql = `
        UPDATE hemocentros
        SET nome = ?, endereco = ?, telefone = ?, email = ?
        WHERE id_hemocentro = ?
    `;


    conexao.query(
        sql,
        [nome, endereco, telefone, email, id],
        (erro, resultado) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao alterar hemocentro'
                });
                return;
            }


            res.json({
                mensagem: 'Hemocentro alterado com sucesso!'
            });
        }
    );
});




// DELETE = excluir hemocentro
app.delete('/hemocentros/:id', (req, res) => {


    const { id } = req.params;


    const sql = 'DELETE FROM hemocentros WHERE id_hemocentro = ?';


    conexao.query(sql, [id], (erro, resultado) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao excluir hemocentro'
            });
            return;
        }


        res.json({
            mensagem: 'Hemocentro excluído com sucesso!'
        });
    });
});




// ============================================================
// 10. ESTOQUES
// ============================================================


// POST = cadastrar estoque
app.post('/estoques', (req, res) => {


    const { id_hemocentro, tipo_sanguineo, quantidade_bolsas } = req.body;


    const sql = `
        INSERT INTO estoques
        (id_hemocentro, tipo_sanguineo, quantidade_bolsas)
        VALUES (?, ?, ?)
    `;


    conexao.query(
        sql,
        [id_hemocentro, tipo_sanguineo, quantidade_bolsas],
        (erro, resultado) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao cadastrar estoque'
                });
                return;
            }


            res.status(201).json({
                mensagem: 'Estoque cadastrado com sucesso!',
                id_estoque: resultado.insertId
            });
        }
    );
});




// PUT = alterar estoque
app.put('/estoques/:id', (req, res) => {


    const { id } = req.params;


    const { tipo_sanguineo, quantidade_bolsas } = req.body;


    const sql = `
        UPDATE estoques
        SET tipo_sanguineo = ?, quantidade_bolsas = ?
        WHERE id_estoque = ?
    `;


    conexao.query(
        sql,
        [tipo_sanguineo, quantidade_bolsas, id],
        (erro, resultado) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao alterar estoque'
                });
                return;
            }


            res.json({
                mensagem: 'Estoque alterado com sucesso!'
            });
        }
    );
});




// DELETE = excluir estoque
app.delete('/estoques/:id', (req, res) => {


    const { id } = req.params;


    const sql = 'DELETE FROM estoques WHERE id_estoque = ?';


    conexao.query(sql, [id], (erro, resultado) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao excluir estoque'
            });
            return;
        }


        res.json({
            mensagem: 'Estoque excluído com sucesso!'
        });
    });
});




// ============================================================
// 11. SOLICITAÇÕES
// ============================================================


// POST = cadastrar solicitação de sangue
app.post('/solicitacoes', (req, res) => {


    const {
        id_hospital,
        tipo_sanguineo,
        quantidade_bolsas,
        status
    } = req.body;


    const sql = `
        INSERT INTO solicitacoes
        (id_hospital, tipo_sanguineo, quantidade_bolsas, status)
        VALUES (?, ?, ?, ?)
    `;


    conexao.query(
        sql,
        [id_hospital, tipo_sanguineo, quantidade_bolsas, status],
        (erro, resultado) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao cadastrar solicitação'
                });
                return;
            }


            res.status(201).json({
                mensagem: 'Solicitação cadastrada com sucesso!',
                id_solicitacao: resultado.insertId
            });
        }
    );
});




// PUT = alterar solicitação
app.put('/solicitacoes/:id', (req, res) => {


    const { id } = req.params;


    const {
        tipo_sanguineo,
        quantidade_bolsas,
        status
    } = req.body;


    const sql = `
        UPDATE solicitacoes
        SET tipo_sanguineo = ?, quantidade_bolsas = ?, status = ?
        WHERE id_solicitacao = ?
    `;


    conexao.query(
        sql,
        [tipo_sanguineo, quantidade_bolsas, status, id],
        (erro, resultado) => {


            if (erro) {
                res.status(500).json({
                    erro: 'Erro ao alterar solicitação'
                });
                return;
            }


            res.json({
                mensagem: 'Solicitação alterada com sucesso!'
            });
        }
    );
});




// DELETE = excluir solicitação
app.delete('/solicitacoes/:id', (req, res) => {


    const { id } = req.params;


    const sql = 'DELETE FROM solicitacoes WHERE id_solicitacao = ?';


    conexao.query(sql, [id], (erro, resultado) => {


        if (erro) {
            res.status(500).json({
                erro: 'Erro ao excluir solicitação'
            });
            return;
        }


        res.json({
            mensagem: 'Solicitação excluída com sucesso!'
        });
    });
});




// ============================================================
// 12. INICIANDO O SERVIDOR
// ============================================================


// Inicia a API na porta 3000
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
