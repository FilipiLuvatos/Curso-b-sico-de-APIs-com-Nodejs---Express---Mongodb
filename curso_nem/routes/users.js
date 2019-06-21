const express = require('exprss');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Funções auxiliares

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, 'Filipi123', { expiresIn: '7d' });
}


router.get('/', async (req, res) => {


    try {
        const users = await Users.find({});
        return res.send(users);

    } catch (err) {
        return res.send(console.log("Erro na consulta do usuario"));
    }


});

router.post('/create', async (req, res) => {//Refatorado a baixo

    const { email, password } = req.body;
    if (!email || !password) return res.send(console.log('Dados insuficientes'));

    try {

        if (await Users.findOne({ email })) return res.send(console.log("Usuario já registrado!!!!"))
        const user = await Users.create(req.body);
        user.password = undefined;

        return res.send({ user, token: createUserToken(user.id) });

        return res.send(user);

    } catch (err) {

        if (err) return res.send(console.log("Erro ao buscar o usuario!!!"));

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

    if (!email || !password) return res.send(console.log("Dados insuficientes"));

    try {
        const user = await Users.findOne({ email }).select('+select');
        if (!user) return res.send(console.log("Usuario não registrado"));

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok) return res.send(console.log("Erro ao autenticar usuario"));
        user.password = undefined;

        return res.send({ user, token: createUserToken(user.id) });

        return res.send(user);


    } catch (err) {
        return res.send(console.log("Erro ao buscar o usuario"));

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


