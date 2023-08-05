import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import bodyParser from "body-parser"
import mongo from "mongoose"
import cors from "cors"

const app = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1/users', require('./routes/usersRoutes.js'))
const start = async () => {
    const PORT = process.env.PORT || 6000;

    try {
        await mongo.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`⚡️ Started at port ${PORT}`));
    } catch (e:any) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start()