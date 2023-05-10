import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "railway",//nombre de la base
    "postgres", // nombre de usuario
    "yN0wFJrRr59vuEOXKGSi", // contrasena de la base
    {
        host: "containers-us-west-22.railway.app",
        port: 6228,
        dialect: "postgres" //Que motor de base se utiliza
    }
);