const env = process.env.NODE_ENV || 'dev' ;

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://usuario_admin:wbIEFEM6V6vlwIDR@clusterapi-pj4ki.mongodb.net/test?retryWrites=true&w=majority' ,
                jwt_pass: 'ChaveSecreta' ,
                jwt_expires_in: '7d'
            }

        case 'hml' :
            return {
                bd_string: 'mongodb+srv://usuario_adminHML:wbIEFEM6V6vlwIDR@clusterapi-pj4ki.mongodb.net/test?retryWrites=true&w=majority' ,
                jwt_pass: 'ChaveSecretaHML' ,
                jwt_expires_in: '7d'

            }

        case 'prd':
            return {
                bd_string: 'mongodb+srv://usuario_adminPRD:wbIEFEM6V6vlwIDR@clusterapi-pj4ki.mongodb.net/test?retryWrites=true&w=majority' ,
                jwt_pass: 'ChaveSecretaPRD' ,
                jwt_expires_in: '7d'
            }
        
        
    }
}

console.log(`API iniciada no ambiente ${env.toUpperCase()}`);

module.exports = config () ;