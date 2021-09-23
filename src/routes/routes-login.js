const { Router }                        = require('express');
const { loginPost, loginCheckAuth }     = require('../controllers/controller-login');
const { apiError404 }                   = require('../controllers/controller-general');
const { loginPostMiddlewares,
        loginCheckAuthMiddlewares}      = require('../middlewares');
const router                            = Router();

/* Ruta: [BASE]/api/v1/login */

router.get('/auth/me',     loginCheckAuthMiddlewares,  loginCheckAuth);
router.post('/',           loginPostMiddlewares,       loginPost);


// Always last one - 404
router.all('*', apiError404)

module.exports = router