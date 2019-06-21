const express = require('exprss');
const router = express.Router();
const auth = require('../middleares/auth');



router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send("Deu certo o index.js/GET");
})
router.post('/', (req, res) => {
    return res.send("Deu certo o index.js/POST");
})

module.exports = router;


