import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';


/**
 * Swagger definition for the API documentation.
 * This includes metadata such as the API title, version, and description,
 * as well as the server environment information.
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Quiz Application API',
    version: '1.0.0',
    description: 'A RESTful API built with TypeScript, Express, and Node.js to manage quizzes, accept user submissions, and provide result tracking. This documentation describes all available endpoints, request/response formats, and usage guidelines.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development Server',
    },
  ],
};

/**
 * Swagger options for generating the API documentation.
 * The `apis` array points to files where Swagger annotations are defined.
 */
const swaggerOptions = {
  swaggerDefinition,
  apis: [ './src/swagger/*.swagger.ts', './src/dtos/*.ts'], 
};

// Generate Swagger specification based on the options
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Sets up Swagger UI in the Express app.
export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger Docs available at http://localhost:3000/api-docs');
}