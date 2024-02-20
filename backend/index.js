import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.listen(process.env.PORT, () => {
    console.log('app is listening on port', process.env.PORT)
})