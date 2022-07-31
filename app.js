import express from "express";
import dotenv from "dotenv";


import bodyParser from "body-parser";
import cors from "cors";

import publicRoutes from "./src/routes/public";
import errorHandler from "./src/middleware/errorHandler";
const swaggerUi = require("swagger-ui-express");

const app = express();
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Buying Frenzy",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"], // files containing annotations as above
};

const openApiSpecification = swaggerJsdoc(options);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));
app.use(publicRoutes);
app.use(errorHandler);

module.exports = app;
