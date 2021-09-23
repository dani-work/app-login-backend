
const generalValidations            = require('../middlewares/general-middleware');
const loginPostValidations          = require('../middlewares/login-post-validations');

module.exports = {
    ...generalValidations,
    ...loginPostValidations
}