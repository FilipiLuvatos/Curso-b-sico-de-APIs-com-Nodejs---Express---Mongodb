const express = require('exprss');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config/config');

//Funções auxiliares

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: jwt_expires_in });
}


router.get('/', async (req, res) => {


    try {
        const users = await Users.find({});
        return res.send(users);

    } catch (err) {
        return res.status(500).send(console.log("Erro na consulta do usuario"));
    }


});

router.post('/create', async (req, res) => {//Refatorado a baixo

    const { email, password } = req.body;
    if (!email || !password) return res.send(console.log('Dados insuficientes'));

    try {

        if (await Users.findOne({ email })) return res.status(400).send(console.log("Usuario já registrado!!!!"))
        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({ user, token: createUserToken(user.id) });

        return res.send(user);

    } catch (err) {

        if (err) return res.status(500).send(console.log("Erro ao buscar o usuario!!!"));

    }

});



/*router.post('/create', (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.send(console.log('Dados insuficientes'));

    Users.findOne({ email }), (err, data) => {
        if (err) return res.send(console.log("Erro ao buscar o usuario!!!"));
        if (data) return res.send(console.log("Usuario ja registrado!!!"));

        Users.create(req.body, (err, data) => {
            if (err) return res.send(console.log("Erro ao criar o usuario!"));

            data.password = undefined;// impede que mande a senha do usuário

            return res.send(data);
        });


    }


    return res.send("Seu usuario foi criado con sucesso");
});*/


router.post('/auth', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send(console.log("Dados insuficientes"));

    try {
        const user = await Users.findOne({ email }).select('+select');
        if (!user) return res.status(400).send(console.log("Usuario não registrado"));

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok) return res.status(401).send(console.log("Erro ao autenticar usuario"));
        user.password = undefined;

        return res.send({ user, token: createUserToken(user.id) });

        return res.send(user);


    } catch (err) {
        return res.status(500).send(console.log("Erro ao buscar o usuario"));

    }


});



/*router.post('/auth', (req, res) => {//Refatorado acima.

    const { email, password } = req.body;

    if (!email || !password) return res.send(console.log("Dados insuficientes"));
    Users.findOne({ email }, (err, data) => {

        if (err) return res.send(console.log("Erro ao buscar o usuario"));
        if (!data) return res.send(console.log("Usuario não registrado"));

        bcrypt.compare(password, data.password, (err, same) => {
            if (same) return res.send(console.log("Erro ao autenticar usuario"));

            return res.send(data);
        })

    }).select('+password');

});*/


module.exports = router;


/*
Códgigos de Processamento do Servidor 

200 - OK = Deu certo, não vou processar mais nada.

201 - Created = É usando quando você cria, um novo registro de 
usuário

202 - Accepted = Aceitei sua requisição, mas não terminei de processar

Faixa 400 - Problemas 

400 = Deu problemas, deu ruim

401 = Unauthorized -- Autenticação, tem carater temporario, 
ou seja a pessoa precisa se atenticar.

403 = Forbidden = Carater permanente (autorização);

404 = Not Found.

Faixa 500  - Erro Geral

500 = Internal server error (Deu erro geral na Api).

501 = Not Implemented (api não suporta esta funcionalidade).

503 = Service Unavalible (Api executa a operação, mas o serviço esta indisponivél).
*/ 