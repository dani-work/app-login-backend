const { response, request } = require('express');
const to                    = require('await-to-js').default
const jwt                   = require('jsonwebtoken');
const { validationResult }  = require('express-validator');
const Person                = require('../models/person');
const { sendResponse }      = require('../helpers/general');
const { GENERAL }           = require('../_constants/constants');


const checkPetitionHeadersJson = (req, resp, next) => {
    if (!req.is('application/json')) {
        return sendResponse(resp, 400, false, "", GENERAL.HEADERS);        
    }
    next();
}

const validateCheckErrors = (req, resp, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(resp, 400, false, "", errors.array());
    }
    next();
}


const validateJsonRequest = (err, req, resp, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return sendResponse(resp, 500, false, GENERAL.MSG_NOK_JSON, "");
    }   

    // Pass the error to the next middleware if it wasn't a JSON parse error
    next(err);
};

const validateJWT = async( req = request, resp = response, next ) => {

    const token = req.header('x-auth-token');
    if (!token) { return sendResponse(resp, 401, false, GENERAL.MSG_NOK_TOKEN, ""); }

    try {        
        const { uid } = jwt.verify( token, process.env.JWTSECRETPRIVATEKEY );
        // Get user info and if exists
        const [errUsuario, usuario] = await to(Person.findById( uid )
                                                    .select({password:0})
                                                    .lean());        
        if( !usuario ) { return sendResponse(resp, 401, false, GENERAL.MSG_NOK_TOKEN_INVALID_DB, ""); }
     
        req.userinfo = usuario;
        next();

    } catch (error) {
        return sendResponse(resp, 401, false, GENERAL.MSG_NOK_TOKEN_INVALID, "");
    }
}



module.exports = {
    validateCheckErrors,
    checkPetitionHeadersJson,
    validateJsonRequest,
    validateJWT,
}