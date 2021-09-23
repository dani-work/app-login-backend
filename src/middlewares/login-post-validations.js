const { check }                     = require('express-validator');
const { validateCheckErrors, 
        checkPetitionHeadersJson,
        validateJWT,
        hasRole }                   = require('./general-middleware');
const { CONST_APPLICATION }         = require('../_constants/constants');

// Data validation from request
const validateLoginData = [
    check('email', 'El email tiene formato incorrecto').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
];
// All middlewares
const loginPostMiddlewares = [
    checkPetitionHeadersJson,
    ...validateLoginData,
    validateCheckErrors
];


// Check Auth on reloading - All middlewares
const loginCheckAuthMiddlewares = [
    validateJWT,
    validateCheckErrors
];


module.exports = {
    loginPostMiddlewares,
    loginCheckAuthMiddlewares
}