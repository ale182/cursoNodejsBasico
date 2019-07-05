const express = require('express') ;
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth , (req , res)=> {
    console.log(res.locals.auth_data);
    return res.send({message: "OK GET da Raiz"});
})

router.post('/',(req , res)=> {
    return res.send({message: "OK POST da Raiz"});
})

module.exports = router ;