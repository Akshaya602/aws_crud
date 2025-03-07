import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'; // For loading the Swagger YAML file
import path from 'path';
import serverless from 'serverless-http'; // Import serverless-http


// Initialize a mini Express app for Swagger
const swaggerApp = express();

// Load Swagger YAML file
const swaggerDocument = YAML.load(path.resolve('./swagger.yml'));
console.log('Swagger Document:', swaggerDocument); // Debugging

// Serve Swagger UI at /api-docs
swaggerApp.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Export the Swagger app
const swagger = serverless(swaggerApp);
export { swagger };