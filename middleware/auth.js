const jwt = require('jsonwebtoken');

const auth = (req , res, next) => {
    const token_header = req.headers.auth;

    if(!token_header)
      return res.send({ error: 'Token nao enviado'}) ;
      
      jwt.verify(token_header, 'ChaveSecreta', ( err , decoded) => {
          if (err) return res.send ({ error : 'Token invalido'});
          res.locals.auth_data = decoded ;
            
          return next() ;
      })
}

module.exports = auth ;