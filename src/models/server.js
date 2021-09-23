require('dotenv').config();
const express                   = require('express');
const cors                      = require('cors');
const dbConnection              = require('../database/dbconfig');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.login_path         = '/api/v1/login';

        // Connect MongoDB
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json({limit: '10mb', extended: true}));
        this.app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit:50000}));

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.login_path,       require('../routes/routes-login'));
    }

    listen() {
        this.app.listen(this.port)
    }

}


module.exports = Server;