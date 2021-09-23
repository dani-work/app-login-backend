const { response }          = require('express');
const to                    = require('await-to-js').default
const bcrypt                = require('bcrypt');
const Person                = require('../models/person');
const { generateJWT }       = require('../helpers/generate-jwt');
const { sendResponse }      = require('../helpers/general');
const { GENERAL }           = require('../_constants/constants');

const loginPost = async (req, resp = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const [errUser, user] = await to(Person.findOne({ email }).lean());
        if (!user) {
            return sendResponse(resp, 400, true, GENERAL.MSG_NOK_AUTH, "");
        }
        
        // Verificar la contraseña
        const [errValidPass, validPassword] = await to(bcrypt.compare(password, user.password));
        if (!validPassword) { return sendResponse(resp, 400, true, GENERAL.MSG_NOK_AUTH, ""); }

        // Generar el JWT
        const [errToken, token] = await to(generateJWT(user._id.toString()));
        if (!token) { return sendResponse(resp, 400, true, GENERAL.MSG_NOK_AUTH, ""); }

        let returnData = {
            token,
            name:  user?.name.trim()
        }
        return sendResponse(resp, 200, true, "", returnData);

    } catch (error) {
        return sendResponse(resp, 500, true, GENERAL.MSG_NOK_AUTH_ERROR, "");
    }
}

const loginCheckAuth = async (req, resp = response) => {
    
    if (!req.userinfo.name)
        return sendResponse(resp, 400, false, GENERAL.MSG_NOK_AUTH_ERROR, "");

    return sendResponse(resp, 200, true, "", "");
}


module.exports = {
    loginPost,
    loginCheckAuth
}
