import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router } from './src/routes/routes.js';
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs'; // For loading the Swagger YAML file
// import path from 'path';

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(express.json({ limit: '1mb' }));

// CORS setup to allow all origins
app.use(cors());

// Handle preflight requests
app.options('*', cors());

// Add headers to all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify a particular origin
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// // Load Swagger YAML file
// const swaggerDocument = YAML.load(path.resolve('./swagger.yml'));

// // Serve Swagger UI at /api-docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes setup
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Welcome');
});

// Start the server locally (for development)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

// Export the serverless handler
const handler = serverless(app);
export { handler };