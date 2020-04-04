require('dotenv').config();
const env = process.env.NODE_ENV || "development";

const development = {
    app: {
        port: 3000
    },
    db: {
        username: process.env.USER,
        password: process.env.PASS,
        host: process.env.HOST,
        port: process.env.PORT,
        name: process.env.DB_NAME,
    }
};
const testing = {
    app: {
        port: 3000
    },
    db: {
        username: process.env.USER,
        password: process.env.PASS,
        host: process.env.HOST,
        port: process.env.PORT,
        name: process.env.TEST_DB,
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