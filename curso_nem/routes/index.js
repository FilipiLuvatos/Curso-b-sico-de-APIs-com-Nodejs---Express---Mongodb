const express = require('exprss');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send("Deu certo o index.js/GET");
})
router.post('/', (req, res) => {
    return res.send("Deu certo o index.js/POST");
})

module.exports = router;



//Por enquanto tive que ignorar aqui pois, o mesmo, estava igual ao do
//professor, mas não estava funcionando, aguardando suporte