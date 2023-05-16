import initModels from "../models/init-models.js";
import { sequelize } from "../database/connection.js";
import {Op} from "sequelize";
import { response } from "express";

let models = initModels(sequelize);


// Function to get all users from the database and return them as a JSON object
// also include the skills and personality of each user
// the endpoint config is Petition type GET url "some host" /api/getUsers
// has no parameters
// returns a JSON object with all the users
// if there is an error returns a JSON object with a message


export const getUsers = async (req, res) =>{
    let response;
    try{
        response = await models.person.findAll( {
            order: [['id_person', 'ASC']],
            include:[
            {
                model: models.skills,
                as: "skill",
                attributes:{ exclude: ['id_skills']}
            },
            {
                model: models.personality,
                as: "personality",
                attributes:{ exclude: ['id_personality']}
            }
            ]
        });
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar los usuarios inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

// Function to get one user from the database and return as a JSON object
// also include the skills and personality of the user
// the endpoint config is Petition type GET url "some host" /api/getUser/id
// has no parameters
// returns a JSON object with user data
// if there is an error returns a JSON object with a message

export const getUserById = async (req, res) => {
    let response;
    let {id} = req.params;
    try{
        response = await models.person.findOne({
            include:[
                {
                    model: models.skills,
                    as: "skill",
                    attributes:{ exclude: ['id_skills']}
                },
                {
                    model: models.personality,
                    as: "personality",
                    attributes:{ exclude: ['id_personality']}
                }
                ],
            where: {
                id_person: id,
            },
          }
          )
    }catch(error){
        console.log(error);
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar el usuario inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

// Function to update a user from the database and return as a JSON object
// the endpoint config is Petition type PUT url "some host" /api/updateUser/id
// has no parameters
// returns 1 if the user was updated
// if there is an error returns a JSON object with a message

export const updateUser = async (req, res) =>{
    let response;
    let {id} = req.params;
    try{
        response = await models.person.update(req.body,
            {
                where:
                {
                    id_person:id,
                }
            }
            )
    }catch(error){
        console.log(error);
        res.status(500).json({"message":"Error en el servidor, no pudimos actualizar el usuario inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

// Function to create a user from the database and return as a JSON object
// the endpoint config is Petition type POST url "some host" /api/createUser
// has no parameters
// returns 1 if the user was created
// if there is an error returns a JSON object with a message

export const createUser = async (req,res) => {
    let {person_name, skills_id, personality_id, hourly_rate, account_type = "user", created_at = new Date(), updated_at = new Date()} = req.body;
    let response = null;
    try{
        response = await models.person.create(req.body)
        /* 
            {
                "person_name": "Juan",
                "skills_id": 1,
                "personality_id": 1,
                "hourly_rate": 100,
                "account_type": "user",
                "profile_image": "https://www.google.com"
            }
        */
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos crear el usuario inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

// Function to delete a user from the database
// the endpoint config is Petition type DELETE url "some host" /api/deleteUser/id
// has no parameters
// returns 1 if the user was deleted
// if there is an error returns a JSON object with a message

export const deleteUser = async (req,res) => {
    let response;
    let {id} = req.params;

    try{
        response = await models.person.destroy(
            {
                where:
                {
                    id_person: id,
                }
            })
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos eliminar el usuario inténtalo mas tarde"});
    }
    res.status(200).json(response);
}
