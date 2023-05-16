import Sequelize from "sequelize";

/* export const sequelize = new Sequelize(
    "railway",//nombre de la base
    "postgres", // nombre de usuario
    "yN0wFJrRr59vuEOXKGSi", // contrasena de la base
    {
        host: "containers-us-west-22.railway.app",
        port: 6228,
        dialect: "postgres" //Que motor de base se utiliza
    }
); */


export const sequelize = new Sequelize(
    "tinder",//nombre de la base
    "postgres", // nombre de usuario
    "Spark85.", // contrasena de la base
    {
        host: "localhost",
        port: 5432,
        dialect: "postgres" //Que motor de base se utiliza
    }
);

/* node_modules\.bin\sequelize-auto -o "./src/models" -d "tinder" -h "localhost" -u "postgres" -p 5432 -x "2222222" -e postgres -l esm */