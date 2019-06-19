const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Users = require('../model/user');

const url = 'mongodb+srv://Filipi:intelligir123@cluster0-xm1li.mongodb.net/test?retryWrites=true&w=majority';
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };
mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexao com o banco de dados:' + err)
})

mongoose.connection.on('disconnected', (err) => {
    console.log('Aplicação desconectada')
})






app.get('/', (req, res) => {

    if (err) return res.send(console.error("Erro na consulta do usuário"));

    return res.send(data);
});

app.post('/create', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.send(console.error("Dados insuficientes"));

    Users.findOne({ email }, (err, data) => {
        if (err) return res.send(console.error("Erro ao buscar usuário!"));
        if (data) return res.send(console.error("Usuário ja exisitente"));

        Users.create(req.body, (err, data) => {
            if (err) return res.send(console.error("Erro ao criar usuário!"));
            return res.send(data);

        })
    })


    return res.send("Seu usuário foi criado =)");
})






//const indexRoute = require('./routes/index.');
//const usersRoute = require('./routes/users');

//app.use('/', indexRoute);
//app.use('/users', usersRoute)


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    return res.send("Deu certo o GET");
})
app.post('/', (req, res) => {
    return res.send("Deu certo o POST");
})


console.log("Server run")

app.listen(3000);

module.exports = app; 