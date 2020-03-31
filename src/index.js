import  express from 'express';
import {db_connections} from './db/connection';
import config from '../config/config';


require('dotenv').config();

const app = express();

//middlewares
app.use(express.json());

const port = config.app.port;


//connecting to mongodb data base;
db_connections();

app.listen(port, 
    ()=> console.log(`🚀Our app is running, can be accessed now on http://localhost:${port}/lostAndFound`));