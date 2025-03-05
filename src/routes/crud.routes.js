import express from 'express';
import {
    createUser,
    getOneUser,
    getAllUser,
    updateUser,
    deleteUser
} from '../controller/crud.controller.js';

const crudRouter = express.Router();

crudRouter.post('/api/create', createUser);
/**
 * @swagger
 * /api/crud/create:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the DynamoDB database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                  type: integer
 *                  example: 425
 *               name:
 *                 type: string
 *                 example: "Akshaya"
 *               email:
 *                 type: string
 *                 example: "akshaya6@gmail.com"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

crudRouter.get('/api/getUser/:id', getOneUser);
/**
 * @swagger
 * /api/crud/getUser/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     description: Fetches a user from DynamoDB using their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to fetch.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

crudRouter.get('/api/getUsers', getAllUser);
/**
 * @swagger
 * /api/crud/getUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users from DynamoDB.
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       500:
 *         description: Internal server error
 */

crudRouter.put('/api/updateDetails/:id', updateUser);
/**
 * @swagger
 * /api/crud/updateDetails/{id}:
 *   put:
 *     summary: Update user details
 *     description: Updates user details in DynamoDB using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

crudRouter.delete('/api/deleteDetails/:id', deleteUser);
/**
 * @swagger
 * /api/crud/deleteDetails/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user from DynamoDB using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

export { crudRouter };
