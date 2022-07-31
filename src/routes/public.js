import express from "express";
import { validate } from "../middleware/validate";

import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

/**
 *  @swagger
 *  /health-check/:
 *    get:
 *      summary: Lists all the restaurants
 *      tags: [Default]
 *      responses:
 *        200:
 *          description: Success Response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 code:
 *                  type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                      message:
 *                        type: string
 *                 success:
 *                  type: boolean
 */
router.get("/health-check", userController.healthCheck);
/**
 *  @swagger
 *  /restaurants/:
 *    get:
 *      summary: Lists all the restaurants
 *      tags: [Restaurants]
 *      parameters:
 *        - name: 'day'
 *          in: 'query'
 *          schema:
 *            type: string
 *            format: 'sunday'
 *        - name: 'from'
 *          in: 'query'
 *          schema:
 *            type: 'time'
 *            format: '09:00'
 *        - name: 'to'
 *          in: 'query'
 *          schema:
 *            type: 'time'
 *            format: '20:00'
 *      responses:
 *        200:
 *          description: Success Response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 code:
 *                  type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                   properties:
 *                      restaurantName:
 *                        type: string
 *                      cashBalance:
 *                        type: integer
 *                 success:
 *                  type: boolean
 */

/**
 *  @swagger
 *  /paySlip/:
 *    get:
 *      summary: Generate pay slip for user
 *      tags: [Users]
 *      requestBody:
 *        description: should validate user first name, last name,annual-salary, super-rate (%) & payment-start-date
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                 type: string
 *                lastName:
 *                 type: string
 *                annualSalary:
 *                 type: float
 *                superRate:
 *                 type: number
 *                paymentStartDate:
 *                 type: string
 *      responses:
 *        200:
 *          description: Success Response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 code:
 *                  type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                      message:
 *                        type:   string
 *                 success:
 *                  type: boolean
 */
router.get(
  "/paySlip",
  validate(userValidator.generatePaySlip, "query"),
  userController.generatePaySlip
);

module.exports = router;
