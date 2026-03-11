import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Launchpad API',
      version: '1.0.0',
      description: 'CPE461 — Launchpad idea validation platform API',
    },
    servers: [{ url: '/api/v1' }],
  },
  apis: ['./src/routes/*.ts'],
});
