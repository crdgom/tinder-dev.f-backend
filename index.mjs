import express from "express";
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerJson from './swagger.json' assert { type: "json" };
import userRoutes from "./src/routes/user.routes.js";
import companyRoutes from "./src/routes/company.routes.js";
import servicesRoutes from "./src/routes/services.routes.js";
import { sequelize } from './src/database/connection.js';


async function main() {
    try {
        await sequelize.sync({ force: false });
        await sequelize.authenticate();
        console.log("Conexión exitosa");
    } catch (error) {
        console.log("Conexión fallida, error -> " + error);
    }
    const app = express();
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.disable("x-powered-by");
    app.use(userRoutes);
    app.use(companyRoutes);
    app.use(servicesRoutes);

    const swaggerOptions = {
        swaggerDefinition: {
            swagger: '2.0',
            info: {
                title: 'Tinder de servicios',
                version: '1.0.0',
                description: 'Tinder de servicios'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Servidor local DEV'
                },
                {
                    url: 'https://nodejs-production-b112.up.railway.app/',
                    description: 'Servidor PROD'
                }
            ]
        },
        apis: ['./src/routes/*.js']
    };

    const combinedSwaggerJson = {
      ...swaggerJson,
      ...swaggerOptions.swaggerDefinition
  };

  const swaggerDocs = swaggerJsDoc({
      ...swaggerOptions,
      swaggerDefinition: combinedSwaggerJson,
  });

  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(3000, () => {
        console.log(`
            Server running on port 3000
            
            http://localhost:3000/
            
            Press CTRL+C to stop server
            `);
    });

};

main();
