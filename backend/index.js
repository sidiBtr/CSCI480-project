import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const app = express()
mongoose.connect(process.env.MONGO)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('succssfull connection to the database', process.env.PORT)
    })
})
.catch(error => {
    console.log('error connecting to the database', error)
})
