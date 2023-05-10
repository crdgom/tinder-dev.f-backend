import express from "express";
import helmet from "helmet";
import user from "./src/routes/user.routes.js";
import { sequelize } from './src/database/connection.js';

async function main(){
    try{
        await sequelize.sync({force:false});
        await sequelize.authenticate();
        console.log("Conexion exitosa");
    }catch(error){
        console.log("Conexion fallida, error -> "+error);
    }
    const app = express();
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.disable("x-powered-by");
    app.use(user);
    app.listen(3000, () => {
        console.log(`
            Server running on port 3000
            
            http://localhost:3000/
            
            Press CTRL+C to stop server
            `);
    });
};

main();

