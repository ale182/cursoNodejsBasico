const express = require('express') ;
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Funcoes Auxiliares
const createUserToken = (userId) => {
    return jwt.sign({ id:userId} , 'ChaveSecreta' , { expiresIn: '7d' }) ;
}

/* funcao antiga, antes de colocar aSync - erro de CallBack Hell
router.get('/',(req , res)=> {
    Users.find({}, (err,data) => {
        if (err) return res.send({error: 'Erro consulta de usuarios'});
        return res.send(data);
         });
    });
*/

// Funcao com async
router.get('/', async(req , res)=> {
    try{
        const users = await Users.find({});
        return res.send(users);
    } catch (err){
        return res.status(500).send({error: 'Erro consulta de usuarios'});
    }
});


/*
/* funcao antiga, antes de colocar aSync - erro de CallBack Hell
router.post('/create' , (req , res) => {
    /* Jeito antigo 
    const obj = req.body ;
    if(!obj.email || !obj.password) return res.send({ error: 'Dados insuficientes'});
    /

    // Agora desestruturado
    const {email , password } = req.body ;

    if(!email || !password) return res.send({ error: 'Dados insuficientes'});

    Users.findOne({email}, (err , data) => {
        if (err) return res.send({error: 'Erro ao buscar usuario'});
        if (data) return res.send({error: 'Usuario ja criado'});

        Users.create(req.body , (err,data) => {
        // ou
        // Users.create({email,password})

            if (err) return res.send({error: 'Erro ao criar usuario'});
            data.password = undefined ;
            return res.send(data);
        } )
    })
}) */

// Funcao com async
router.post('/create' ,  async (req , res) => {
    const {email , password } = req.body ;

    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes'});

    try {
        if (await Users.findOne({email})) 
            return res.status(400).send({error: 'Usuario ja criado'});

        const user = await Users.create(req.body);
        user.password = undefined ;

        return res.status(201).send({user , token: createUserToken(user.id)});
    } 
    catch (err) {
        return res.status(500).send({error: 'Erro ao buscar usuario'});
    }
});

/* funcao antiga, antes de colocar aSync - erro de CallBack Hell
router.post('/auth' , (req,res) => {
    const { email , password} = req.body ;

    if (!email || !password) return res.send({ error: 'Dados insuficientes'})

    Users.findOne({ email} , (err,data) => {
        if(err) return res.send({ error: 'Erro ao buscar usuario'}) ;
        if(!data) return res.send({ error: 'Usuario nao registrado'});

        bcrypt.compare(password ,data.password , (err , same) => {
            if(!same) return res.send({error: 'Erro ao autenticar usuario'}) ;

            data.password = undefined ;
            return res.send(data);
        })
    }).select('+password');
})
*/

router.post('/auth' , async (req,res) => {
    const { email , password} = req.body ;

    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes'})

    try {
        const user = await Users.findOne({email}).select('+password');
        if(!user) 
          return res.status(400).send({ error: 'Usuario nao registrado'});

        const pass_ok = await bcrypt.compare(password ,user.password);
        if(!pass_ok) return res.status(401).send({error: 'Erro ao autenticar usuario'}) ;

        user.password = undefined ;
        return res.send({ user , token: createUserToken(user.id)});
    } 
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuario'}) ;
    }

});

module.exports = router ;

/* Codigos de retorno API

200 - OK
201 - Created
202 - Accepted

Faixa de Erros
400 - Bad Request
401 - Unauthorized -- Erro Autenticação , carater temporario
403 - Forbidden -- Autorização , tem carater permanente
404 - Not Found

500 - Internal Server Error
501 - Not implemented - API nao suporta a funcionalidade
503 - Service Unavaliable - No momento Serviço indisponivel



*/