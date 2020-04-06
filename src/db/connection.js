import mongoose from 'mongoose';
import config from '../../config/config';
import dotenv from 'dotenv';
dotenv.config();

export const dbConnection =()=>{

    //Laoding variables from config files
    const {db: {username, password, host, port, name}} = config;

    const url = `mongodb://${host}:${port}/${name}?authSource=admin` || config.db.database_url;

    mongoose.connect(url,
        { useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex:true,
            useUnifiedTopology: true  },
        (err) => {
            if(err){
                console.log('Failed to connect to MongoDB');
            }else{
                console.log(`Connected to ${name} database`);
            }
        });
}