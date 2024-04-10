import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import adminRouter from "./routes/adminRoute.js"
import cors from 'cors'
import eventRouter from "./routes/eventsRoutes.js"
dotenv.config()
import cookieParser from "cookie-parser";
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const app = express()
app.use(express.json())
// 'https://mswoodcarving.onrender.com'
//'http://localhost:5173'
//https://mswoodcarving.onrender.com
app.use(cors())
app.use(
    cors({
        origin: `${process.env.ORIGIN}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../frontend/dist')));
mongoose.connect(process.env.MONGO)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('app is listening on port', process.env.PORT)
        console.log('suucessful connection to the database')
    })
})
.catch(error => {
    console.log('error connecting to the database', error)
})
app.use('/api/user', adminRouter)
app.use('/api/events', eventRouter)
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/dist/index.html')))