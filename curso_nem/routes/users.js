const express = require('exprss');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {

    Users.find({}, (err, data) => {

        if (err) return res.send(console.log('Erro na consulta de usuario'))
        return res.send(data);

    });


});


router.post('/create', (req, res) => {

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
});


router.post('/auth', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.send(console.log("Dados insuficientes"));
    Users.findOne({ email }, (err, data) => {

        if(err)return res.send(console.log("Erro ao buscar o usuario"));
        if(!data)return res.send(console.log("Usuario não registrado"));

        bcrypt.compare(password, data.password,(err,same)=>{
            if(same)return res.send(console.log("Erro ao autenticar usuario"));

            return res.send(data);
        })

    }).select('+password');

});


module.exports = router;


//Por enquanto tive que ignorar aqui pois, o mesmo, estava igual ao do
//professor, mas não estava funcionando, aguardando suporte