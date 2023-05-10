import initModels from "../models/init-models.js";
import { sequelize } from "../database/connection.js";
import {Op} from "sequelize";

let models = initModels(sequelize);

export const getUsers = async (req, res) =>{
    let response;
    try{
        response = await models.person.findAll();
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar los usuarios"});
    }
    res.status(200).json(response);
}