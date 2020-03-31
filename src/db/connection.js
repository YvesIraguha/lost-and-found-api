import mongoose from 'mongoose';
import config from '../../config/config';
import dotenv from 'dotenv';
dotenv.config();

export const db_connections =()=>{

    //Laoding variables from config files
    const {db: {username, password, host, port, name}} = config;

    const url = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`;

    mongoose.connect(url,
        { useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex:true,
            useUnifiedTopology: true  },
        (err) => {
            if(err){
                console.log(err);
            }else{
                console.log(`Connected to ${name} database`);
            }
        });
}