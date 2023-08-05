import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import bodyParser from "body-parser"
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors"
import usersRoutes from './routes/usersRoutes.js'
const app = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1/users', usersRoutes)
const start = async () => {
    const PORT = process.env.PORT || 6000;

    try {
        await mongoose.connect('mongodb+srv://skyrocket:pWzcc4QI1Mi5ZOnQ@skyrocket.xsg4k5u.mongodb.net/skyrocket?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);

        app.listen(PORT, () => console.log(`⚡️ Started at port ${PORT}`));
    } catch (e:any) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start()