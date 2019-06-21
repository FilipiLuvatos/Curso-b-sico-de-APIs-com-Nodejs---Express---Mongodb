const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({

    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },//select false para não receber a senha 
    created: { type: Date, default: Date.now }

});

UserSchema.pre('save', async function (next) { // não usar função de seta, porque ele vai 
    // dar problema por causa do this. 
    let user = this;
    if (!user.isModified('passoword')) return next();

    user.password = await bcrypt.hash(user.password, 10);

   /* bcrypt.hash(user.password, 10, (err, encryted) => { //Refatorada acima
        user.password = encryted;
        return next();
    })*/

});

module.exports = mongoose.model('User', UserSchema); 