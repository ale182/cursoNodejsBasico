const express = require('express') ;
const router = express.Router();

router.get('/',(req , res)=> {
    return res.send({message: "OK GET da Raiz"});
})

router.post('/',(req , res)=> {
    return res.send({message: "OK POST da Raiz"});
})

module.exports = router ;