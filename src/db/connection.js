import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const db_connections =()=>{
    const db_user = process.env.USER;
    const db_password = process.env.PWD;
    const db_host = process.env.HOST_NAME;
    const db_port = process.env.PORT_NAME;
    const db_name = process.env.DB_NAME;

    const url = `mongodb://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}?authSource=admin`;

    mongoose.connect(url,
        { useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex:true,
            useUnifiedTopology: true  },
        (err) => {
            if(err){
                console.log('failed to connect to database');
            }
            console.log('connected to database')
        });
}