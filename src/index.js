import  express from 'express';
import mongoose from 'mongoose';
import router from './routes/route';
import { json } from 'express';


require('dotenv').config();

const app = express();

//middlewares
app.use(express.json());
app.use('/lostAndFound', router);

const port = process.env.PORT || 3000;

//connecting to mongodb data base;
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex:true,
        useUnifiedTopology: true  },
    () => console.log('connected to database'));

app.listen(port, 
    ()=> console.log(`our app is running, can be accessed now on http://localhost:${port}/lostAndFound`));