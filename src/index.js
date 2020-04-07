import morgan from 'morgan';
import  express from 'express';

import {dbConnection} from './db/connection';
import config from '../config/config';

require('dotenv').config();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

const port = config.app.port;


//connecting to mongodb data base;
dbConnection();

app.listen(port, 
    ()=> console.log(`Our app is running on ${port} ....🚀....`));