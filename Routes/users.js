const express = require('express') ;
const router = express.Router();

router.get('/',(req , res)=> {
    return res.send({message: "OK GET da Rota Usuarios"});
})

router.post('/',(req , res)=> {
    return res.send({message: "OK POST da Rota Usuarios"});
})


router.post('/create' , (req , res) => {
    return res.send({message:'Usuario criado'})
})

module.exports = router ;