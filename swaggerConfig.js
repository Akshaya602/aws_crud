import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title:"aws api",
            version: "1.0.0",
            description: "Api documentation for CRUD project",
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSdoc(options);
console.log(swaggerSpec);


const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};




export default setupSwagger;