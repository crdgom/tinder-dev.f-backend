import initModels from "../models/init-models.js";
import moment from "moment";
import { getUserById } from "./user.controller.js";
import { getCompanyById } from "./company.controller.js";
import { sequelize } from "../database/connection.js";


let models = initModels(sequelize);

// function to get all Services from the database and return them as a JSON object
// the endpoint config is Petition type GET url "some host" /api/getServices
// has no parameters
// returns a JSON object with all the Services

export const getServices = async (req, res) => {
    let response;
    try{
        response = await models.services.findAll({
            order:[[ 'id_services', 'ASC' ]],
            exclude: ['createdAt', 'updatedAt']
        })
    }catch(error){
        console.error(error);
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar los servicios inténtalo mas tarde"});
    }
    res.status(200).json(response);
}


// function to get one service from the database and return as a JSON object
// the endpoint config is Petition type GET url "some host" /api/getService/id
// has no parameters
// returns a JSON object with service data
// if there is an error returns a JSON object with a message

export const getServiceById = async (req,res) =>{
    let response;
    let {id} = req.params;

    try{
        response = await models.services.findOne({
            where: {id_services: id},
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servido, no pudimos recuperar el servicio solicitado"})
    }
    res.status(200).json(response);
}

// Update a service by the id in the request
// the endpoint config is Petition type PUT url "some host" /api/updateService/id
// has no parameters
// returns a JSON object with the updated service data
// if there is an error returns a JSON object with a message

export const updateService = async (req, res) => {
    let response;
    let {id} = req.params;

    try{
        response = await models.services.update(req.body, {
            where: {id_services: id}
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servidor, no pudimos actualizar el servicio solicitado solicitada"})
    }
    res.status(200).json(response);
};

// function to create a new service in the database
// the endpoint config is Petition type POST url "some host" /api/createService
// has no parameters
// returns a JSON object with the new service data
// if there is an error returns a JSON object with a message

export const createService = async (req, res) =>{
    let response;
    let response_person;
    let id_person;
    let person_hourly_rate;
    let response_company;
    let company;

    const workStartDate = Date(req.body.set_date);
    let setWorkStartDate = new Date(workStartDate);
    let retrieveWorkHour = setWorkStartDate.getHours();
    let setWorkDuration = Number(req.body.work_duration);
    let workDuration = retrieveWorkHour + setWorkDuration;
    let ServiceEnd = setWorkStartDate.setHours(workDuration);

    let service_id = 1;


    try{
        response_person = await models.person.findByPk(req.body.person_id);
        person_hourly_rate = response_person.dataValues.hourly_rate;
        id_person = parseInt(response_person.dataValues.id_person);
        
        console.log("Valor de persona precio hora", person_hourly_rate);

        response_company = await models.company.findByPk(req.body.company_id);
        console.log("id Encontrado ", response_company);
        company = response_company.dataValues.id_company;

        response = await models.services.create({
            person_id: id_person,
            company_id: company,
            service_description: req.body.service_description,
            rate_hour: person_hourly_rate,
            work_duration: req.body.work_duration,
            work_start_date: workStartDate,
            work_end_date: ServiceEnd,
            work_status: service_id,
            calification: 0,
        })

        /*
        {
            "person_id": "Nombre de la persona",
            "company_id": "Nombre de la compañía",
            "service_description": "Descripción del servicio",
            "rate_hour": "Tarifa por hora",
            "work_duration": "Duración del trabajo",
            "work_start_date": "Fecha de inicio del trabajo",
            "work_end_date": "Fecha de finalización del trabajo",
            "work_status": "Estado del trabajo",
            "calification": "Calificación del trabajo",
        } 
        
        */
    }catch(error){
        console.error(error);
        res.status(500).json({"message": "Error en el servidor, no pudimos crear el servicio inténtalo mas tarde"})
    }
    res.status(200).json(response);
}