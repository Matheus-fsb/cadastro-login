const express = require('express')
const app = express();
const mysql = require('mysql2');
const path = require('path');

// Adicionando o middleware para processar o corpo da requisição como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cadastro.html'));
});

// cria a conexao com o banco de dados
const connection = mysql.createPool({
    host: 'localhost', // coloque aqui o ip ou nome da máquina
    user: 'root', // mude aqui o usuário
    password: 'root', // mude aqui a senha
    database: 'dbcadastro' // mude aqui o nome do bd
});

app.get('/usuario', function (req, res) {
    connection.query('SELECT * FROM usuarioCadastrado ',
        function (err, results) {
            res.send(results)
        }
    );
})

app.get('/usuario/:idUser', function (req, res) {
    connection.query('SELECT * FROM usuarioCadastrado where idUser= ?', [req.params.idUser],
        function (err, results) {
            res.send(results)
        }
    );
})

app.post('/cadastro', function (req, res) {
    const { nomUser, emailUser, senha, senhaValidacao } = req.body;

    if (senha == senhaValidacao) {
        console.log(nomUser);
        connection.query('INSERT INTO usuarioCadastrado (nomUser, emailUser, senha) VALUES (?, ?, ?)', [nomUser, emailUser, senha], function (err, results) {
            if (err) {
                res.status(500).send('Erro ao inserir cadastro.');
            }
            else {
                res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cadastro.html'));
            }
        });
    }
    else{
        //PAROU AQUI
    }
});


app.listen(80) //execucao do servidor http