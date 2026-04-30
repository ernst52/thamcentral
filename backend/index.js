import express from 'express'; // These niggas are important! For easy routing!
import dotenv from 'dotenv'; // For .env
import helmet from 'helmet'; // For securing thing automatically setting a bunch of HTTP security headers 
import morgan from 'morgan'; // for logging HTTP requests
import cookieParser from 'cookie-parser'; // Cookie stuff
import cors from 'cors'; // For connecting frontend and backend

// CONFIGS
dotenv.config(); // Loads env file into process.env
import pool from './src/config/db.js'; // Pool, so every request won't opens a brand new connection
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express(); // Using express
app.use(helmet()); // It just quietly sets secure HTTP headers on every response.
app.use(morgan('dev')); // For logging every request with method, path, status code and response time.
app.use(express.json()); // For turning fetched json into readable chunks used to be const bodyParser = require('body-parser'); but that's ancient
app.use(cookieParser()); // Make cookies readable
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
})); // This config applies to all routes

// Error handler
app.use(errorHandler)

// PORT STUFF
const PORT = process.env.PORT; // Picking up PORT from .env
app.listen(PORT, () => console.log(`Sever running on port: http://localhost:${PORT}`));