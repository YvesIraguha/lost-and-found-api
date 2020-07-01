require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const development = {
  app: {
    port: 3000,
    secretKey: process.env.SECRET_KEY,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    sendgridKey:process.env.SENDGRID_API_KEY
  },
  db: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    name: process.env.DB_NAME_DEV
  }
};
const test = {
  app: {
    port: 3000,
    secretKey: process.env.SECRET_KEY,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    sendgridKey:process.env.SENDGRID_API_KEY
  },
  db: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    name: process.env.DB_NAME_TEST
  }
};
const staging = {
  app: {
    port: process.env.PORT,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
    sendgridKey:process.env.SENDGRID_API_KEY
  },
  db: {
    database_url: process.env.DATABASE_URL
  }
};
const production = {
  app: {
    port: process.env.PORT,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
    sendgridKey:process.env.SENDGRID_API_KEY
  },
  db: {
    database_url: process.env.DATABASE_URL
  }
};

const config = {
  development,
  test,
  staging,
  production
};

module.exports = config[env];
