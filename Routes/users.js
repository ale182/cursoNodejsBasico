const express = require('express') ;
const router = express.Router();
const Users = require('../model/user');


router.get('/',(req , res)=> {
    Users.find({}, (err,data) => {
        if (err) return res.send({error: 'Erro consulta de usuarios'});
        return res.send(data);
         });
    });

router.post('/create' , (req , res) => {
    /* Jeito antigo 
    const obj = req.body ;
    if(!obj.email || !obj.password) return res.send({ error: 'Dados insuficientes'});
    */

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
})

module.exports = router ;