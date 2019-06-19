const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    
    return res.send("Deu Certo Filipi")
});

app.post('/',(req,res)=>{
    return res.send("Deu Certo Filipi")
})

console.log("Server run")

app.listen(3000);

module.exports = app; 