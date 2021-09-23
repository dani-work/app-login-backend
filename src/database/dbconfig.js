const moongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await moongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("Base de datos online");

    } catch (error) {
        console.log(error);
        throw new Error('Error - Failed to connect to MongoDB')
    }
}

module.exports = dbConnection;