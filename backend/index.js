import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import adminRouter from "./routes/adminRoute.js";
import cors from 'cors'
import eventRouter from "./routes/eventsRoutes.js";
dotenv.config()

const app = express()
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)
app.use('/uploads', express.static('uploads'));
mongoose.connect(process.env.MONGO)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('succssfull connection to the database', process.env.PORT)
    })
})
.catch(error => {
    console.log('error connecting to the database', error)
})
app.use('/api/user', adminRouter)
app.use('/api/events', eventRouter)