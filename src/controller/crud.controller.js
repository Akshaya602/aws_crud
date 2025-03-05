import { logger } from '../logger/logger.js';
import { userModel } from '../models/crud.model.js';
import BasicCrud from '../services/crud.js';

const createUser = async (req,res) =>{
    logger.info('CreateUser API executing');
    const basicCrud = new BasicCrud(userModel);
    const responseMessage = await basicCrud.createOne(req);
    logger.info('CreateUser Api executed');
    res.status(responseMessage.status).json(responseMessage);
};

const getOneUser = async (req,res) =>{
    logger.info('GetOneUser API executing');
    const basicCrud = new BasicCrud(userModel);
    const responseMessage = await basicCrud.getOne(req);
    logger.info('GetOneUser Api executed');
    res.status(responseMessage.status).json(responseMessage);
};

const getAllUser = async (req,res) =>{
    logger.info('GetAllUser API executing');
    const basicCrud = new BasicCrud(userModel);
    const responseMessage = await basicCrud.getAll(req);
    logger.info('GetAllUser Api executed');
    res.status(responseMessage.status).json(responseMessage);
};

const updateUser = async (req,res) =>{
    logger.info('UpdateUser API executing');
    const basicCrud = new BasicCrud(userModel);
    const responseMessage = await basicCrud.updateOne(req);
    logger.info('UpdateUser Api executed');
    res.status(responseMessage.status).json(responseMessage);
};

const deleteUser = async (req,res) => {
    logger.info('DeleteUser API executing');
    const basicCrud = new BasicCrud(userModel);
    const responseMessage = await basicCrud.deleteOne(req);
    logger.info('DeleteUser Api executed');
    res.status(responseMessage.status).json(responseMessage);
};

export{
    createUser,
    getOneUser,
    getAllUser,
    updateUser,
    deleteUser
};
