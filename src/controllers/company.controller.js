import initModels from "../models/init-models.js";
import { sequelize } from "../database/connection.js";


let models = initModels(sequelize);

// function to get all Companies from the database and return them as a JSON object
// the endpoint config is Petition type GET url "some host" /api/getCompanies
// has no parameters
// returns a JSON object with all the companies

export const getCompanies = async (req, res) => {
    let response;
    try{
        response = await models.company.findAll({
            order:[[ 'id_company', 'ASC' ]],
            exclude: ['createdAt', 'updatedAt']
        })
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar las empresas inténtalo mas tarde"});
    }
    res.status(200).json(response);
}


// function to get one Company from the database and return as a JSON object
// the endpoint config is Petition type GET url "some host" /api/getCompany/id
// has no parameters
// returns a JSON object with company data
// if there is an error returns a JSON object with a message

export const getCompanyById = async (req,res) =>{
    let response;
    let {id} = req.params;

    try{
        response = await models.company.findOne({
            where: {id_company: id},
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servido, no pudimos recuperar la compañía solicitada"})
    }
    res.status(200).json(response);
}

// Update a Company by the id in the request
// the endpoint config is Petition type PUT url "some host" /api/updateCompany/id
// has no parameters
// returns a JSON object with the updated company data
// if there is an error returns a JSON object with a message

export const updateCompany = async (req, res) => {
    let response;
    let {id} = req.params;

    try{
        response = await models.company.update(req.body, {
            where: {id_company: id}
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servidor, no pudimos actualizar la compañía solicitada"})
    }
    res.status(200).json(response);
};

// function to create a new Company in the database
// the endpoint config is Petition type POST url "some host" /api/createCompany
// has no parameters
// returns a JSON object with the new company data
// if there is an error returns a JSON object with a message

export const createCompany = async (req, res) =>{
    let response;
    let {company_name, account_type, company_logo } = req.body;

    try{
        response = await models.company.create(req.body)

        /*
        {
            "company_name": "nombre de la compañía",
            "account_type": "enterprice",
            "company_logo": "url de la imagen"
        } 
        
        */
    }catch(error){
        res.status(500).json({"message": "Error en el servidor, no pudimos crear la compañía inténtalo mas tarde"})
    }
    res.status(200).json(response);
}

// function to delete a Company from the database
// the endpoint config is Petition type DELETE url "some host" /api/deleteCompany/id
// has no parameters
// returns a JSON object with the deleted company data
// if there is an error returns a JSON object with a message

export const deleteCompany = async (req, res) => {
    let response;
    let {id} = req.params;

    try{
        response = await models.company.destroy({
            where: {id_company: id}
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servidor, no pudimos eliminar la compañía solicitada"})
    }
    res.status(200).json(response);
}
