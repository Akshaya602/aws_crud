import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router } from './src/routes/routes.js';
import setupSwagger from "./swaggerConfig.js";


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

// Initialize Swagger
setupSwagger(app);

// Routes setup
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Welcome');
});



  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));



// Export the serverless handler
const handler = serverless(app);
export { handler };
