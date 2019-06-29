const express = require('express') ;
const app = express();

/* string conexao DB
mongodb+srv://usuario_admin:<password>@clusterapi-pj4ki.mongodb.net/test?retryWrites=true&w=majority
*/

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/',indexRoute) ;
app.use('/users',usersRoute) ;

app.listen(3000) ;

module.exports = app ;
