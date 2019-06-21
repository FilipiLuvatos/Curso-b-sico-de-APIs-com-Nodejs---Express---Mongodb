const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token_header = req.headers.auth;

    if (!token_header) return res.status(401).send(console.log("Atenticação recusada!!!"));

    jwt.verify(token_header,'Filipi123', (err, decoded) => {

        if(err) return res.status(401).send(console.log("Erro: Token Invalido!!!"));
        res.locals.auth_data = decoded;
        return next();
    })
}
 module.exports = auth;