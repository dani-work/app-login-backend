const jwt           = require('jsonwebtoken');
const { GENERAL }   = require('../_constants/constants');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.JWTSECRETPRIVATEKEY, { expiresIn: "9h"}, (err, token) => {

            if (err) {
                console.log(err);
                reject(GENERAL.MSG_NOK_TOKEN_ERR_GENERATION)
            } else {
                resolve(token);
            }
        })

    })
}

module.exports = {
    generateJWT
}

