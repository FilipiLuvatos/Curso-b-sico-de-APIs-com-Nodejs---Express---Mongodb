const express = require('express');
const app = express();
const indexRoute = require('./routes/index.');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute)



console.log("Server run")

app.listen(3000);

module.exports = app; 