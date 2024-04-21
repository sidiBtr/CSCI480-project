// Import necessary modules
import express from "express"; // Framework for Node.js
import mongoose from "mongoose"; // MongoDB object modeling tool
import dotenv from 'dotenv'; // Loads environment variables from .env file
import adminRouter from "./routes/adminRoute.js"; // Router for admin-related routes
import cors from 'cors'; // Middleware for enabling CORS (Cross-Origin Resource Sharing)
import eventRouter from "./routes/eventsRoutes.js"; // Router for event-related routes
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import path from 'path'; // Provides utilities for working with file and directory paths
import { fileURLToPath } from 'url'; // Converts a file URL to a file path

// Configure environment variables
dotenv.config();

// Set file and directory paths
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

// Create an Express app
const app = express();

// Middleware setup
app.use(express.json()); // Middleware for parsing JSON data in requests
app.use(cors()); // Middleware for enabling CORS
app.use(cors())
app.use(
    cors({
        origin: `${process.env.ORIGIN}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)
app.use(cookieParser()); // Middleware for parsing cookies
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static files

// Connect to MongoDB database
mongoose.connect(process.env.MONGO)
    .then(() => {
        // Start the server
        app.listen(process.env.PORT, () => {
            console.log('App is listening on port', process.env.PORT);
            console.log('Successful connection to the database');
        });
    })
    .catch(error => {
        console.log('Error connecting to the database', error);
    });

// Route setup
app.use('/api/user', adminRouter); // Route for admin-related API endpoints
app.use('/api/events', eventRouter); // Route for event-related API endpoints

// Catch-all route to serve the index.html file for client-side routing
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/dist/index.html')));
