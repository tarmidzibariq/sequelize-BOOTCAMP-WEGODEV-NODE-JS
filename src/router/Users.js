const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth.js");
const userController = require('../controller/userController.js');
const isAdmin =  require("../middleware/isAdmin.js");
const isUser =  require("../middleware/isUser.js");

/**
 * @swagger
 * /users:
 *   post:
 *    tags: 
 *        - Users
 *    description: Store user
 *    security:
 *        - bearerAuth: [] 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nama:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string              
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.post("/", [auth(), isAdmin() ], userController.store);
/**
 * @swagger
 * /users:
 *    get:
 *      tags: 
 *        - Users
 *      description: Get all users
 *      responses:
 *       200:
 *          description: Success
 *       400:
 *         description: Error
 *      500:
 *        description: Internal Server Error
 */
router.get("/", [auth(), isUser() ],userController.index);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *    tags: 
 *      - Users
 *    description: Show ID user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer        
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.get("/:id",[auth(), isAdmin() ], userController.show);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *    tags: 
 *      - Users
 *    description: Update user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nama:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string              
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.put("/:id",[auth(), isAdmin() ], userController.update);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *    tags:
 *      - Users
 *    description: Delete ID user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer        
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.delete("/:id",[auth(), isAdmin() ], userController.delete);

module.exports = router;