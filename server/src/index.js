import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { LOGGER } from './log/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './configs/DatabaseConfig.js';
import dotenv from 'dotenv';
import routes from './routes/index.js';
dotenv.config();

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect database
connectDatabase();

// Connect routes
app.use('/api/v1', routes.authRoute);
app.use('/api/v1', routes.boardRoute);
app.use('/api/v1', routes.sectionRoute);
app.use('/api/v1', routes.taskRoute);

// Running server
const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  LOGGER.info('Server running at %s', PORT);
});
