import express from 'express';
import router from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setupSwagger } from './swagger';
// Initialize Express app
const app = express();
// Middleware to parse JSON requests
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
// Mount the main API router at /api
app.use('/api', router);
// Setup Swagger documentation at /api-docs
setupSwagger(app);
// Export the app instance for use in server or testing
export default app;