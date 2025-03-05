import { logger } from '../logger/logger.js';
import { sendResponse } from '../common/common.js';
import { CODES } from '../common/response-code.js';
import { generateAccessToken } from '../security/auth.js';


export default class BasicCrud {
    #Model;

    constructor(Model){
        this.#Model = Model;
    }

//createOneItem
createOne = async (req) => {
    try{
        logger.info('Create a user');
        logger.info(req.body);

        const { id, name, email } = req.body;


        if(!id || !name || !email){
            return sendResponse(CODES.BAD_REQUEST,'Id,name and email are required');
        }

        logger.info('Checking whether the userId exist');
        
        let userExists = await this.#Model.get(id);
        if(userExists) {
            return sendResponse(CODES.BAD_REQUEST, 'ID already exists.Please use a different ID');
        }

        const newUser = new this.#Model({
            id,
            name,
            email: email.toLowerCase(),
        });

        await newUser.save();

        logger.info("User created successfully");
        if(newUser){
            const token = await generateAccessToken({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            });
            return sendResponse(CODES.CREATED,'User added',{ token });
        }


    }catch (error){
        logger.error(`Error in create one API: ${error.message}`);
        return sendResponse(CODES.INTERNAL_SERVER_ERROR, 'Error in createOne method');
    }
};


//getOneItem
getOne = async(req) => {
    try{
        logger.info('GetOne User');
        let { id } = req.params;
        id = Number(id);

        const data = await this.#Model.get(id)
        if(!data)
            return sendResponse(CODES.NOT_FOUND, 'User Not Found');
        return sendResponse(CODES.OK, data);

    }catch(error){
        logger.error(`Error in getOne API: ${error.message}`);
        return sendResponse(CODES.INTERNAL_SERVER_ERROR,'Error in getOne method');
    }

}

//getAllItems
getAll = async(req) => {
    try{
        logger.info("GetAll User");

        const data = await this.#Model.scan().exec();
        return sendResponse(CODES.OK, data);
    }catch(error){
        logger.error(`Error in getAll API: ${error.message}`);
        return sendResponse(CODES.INTERNAL_SERVER_ERROR,'Error in getAll method');
    }


}

//updateOne
updateOne = async(req) => {
    try{
        logger.info('Update user');
        let { id } = req.params;
        const { email } = req.body;
        if (!id || isNaN(Number(id))) {
            logger.error(`Invalid ID received: ${id}`);
            return sendResponse(CODES.BAD_REQUEST, 'Invalid ID: ID must be a number');
        }

        id = Number(id);

        if(!email)
            return sendResponse(CODES.BAD_REQUEST, 'Email is required for updation');

        logger.info('Checking if the user Id exists');

        const user = await this.#Model.get(id);

        if(!user)
            return sendResponse(CODES.NOT_FOUND, 'User not found');

        const updatedUser = await this.#Model.update({ id },{ email:email.toLowerCase() });

        logger.info('User email updated successfully');
        return sendResponse(CODES.OK,'User email updated successfully', updatedUser)

    }catch(error){
        logger.error(`Error in update one API: ${error.message}`);
        return sendResponse(CODES.INTERNAL_SERVER_ERROR, 'Error in update API');  
    }
}

deleteOne = async(req) => {
    try{
        logger.info('Delete User');
        let { id } = req.params;
        if (!id || isNaN(Number(id))) {
            logger.error(`Invalid ID received: ${id}`);
            return sendResponse(CODES.BAD_REQUEST, 'Invalid ID: ID must be a number');
        }

        id = Number(id);
        if(!id)
            return sendResponse(CODES.BAD_REQUEST, 'Give correct id');

        const data = await this.#Model.get(id)
        if(!data)
            return sendResponse(CODES.NOT_FOUND,'Not found');

        await this.#Model.delete(id);
        return sendResponse(CODES.OK,'User deleted');
    }catch(error){
        logger.error(`Error in deleteOne API: ${error.message}`);
        return sendResponse(CODES.INTERNAL_SERVER_ERROR, 'Error in deleteOne method');
    }

}



}
