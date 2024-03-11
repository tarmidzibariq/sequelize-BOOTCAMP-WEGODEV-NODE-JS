const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');

/**
 * @swagger
 * /auth/register:
 *   post:
 *    tags: 
 *        - Auth
 *    description: Register Auth
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
 *      description: Success Register user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
*/
router.post("/register", authController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *    tags: 
 *        - Auth
 *    description: Login Auth
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string          
 *    responses:
 *     200:
 *      description: Success Register user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
*/
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

module.exports = router;