const express = require('express');
const router = express.Router();
const userRegistrationController = require('../controllers/UserRegistrationController')
const userRegistrationEndPointPath = "/register"

/**
 * @swagger
 * definition:
 *   userprofile:
 *     properties:
 *       name:
 *         type: string
 *       savingsAmount:
 *         type: integer
 *       loanAmount:
 *         type: integer
 *       profile:
 *         type: string
 *   userprofilerequest:
 *     properties:
 *      name:
 *        type: string
 *      savingsAmount:
 *        type: integer
 *      loanAmount:
 *        type: integer
 */

/**
 * @swagger
 * /v1/register:
 *   post:
 *     tags:
 *       - user
 *     description: Register a user and assign the user a profile based on savings and loan amount
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            $ref: '#/definitions/userprofilerequest'
 *     responses:
 *       200:
 *         description: user profile created successfully
 *         schema:
 *           $ref: '#/definitions/userprofile'
 */
router.post(userRegistrationEndPointPath, userRegistrationController.register)

module.exports = router;