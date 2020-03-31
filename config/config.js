require('dotenv').config();
const env = process.env.NODE_ENV;

const development = {
    app: {
        port: 3000
    },
    db: {
        username: process.env.USER,
        password: process.env.DB_PWD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: 'lost_and_found'
    }
};
const testing = {
    app: {
        port: 3000
    },
    db: {
        username: process.env.USER,
        password: process.env.DB_PWD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: 'lost_and_found_test'
    }
};
const production = {
    app: {
        port: process.env.PORT
    },
    db: {
        database_url: process.env.PROD_DB
    }
};

const config = {
    development,
    testing,
    production
};

module.exports = config[env];