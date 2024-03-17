const express = require("express");
const users = require("./router/Users.js");
const auth = require("./router/Auth.js");

// rest api swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

// nodemailer
const sendEmail = require("./router/SendEmail.js");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Belajar NodeJS",
      version: "0.0.1",
      description: "Belajar NodeJS dengan ExpressJS",
      contact: {
        name: "Bariq",
      },
    },
  },
  apis: ["./src/router/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
swaggerDocs.components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};
// router
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// node mailer
app.use("/sendEmail", sendEmail);

app.use("/users", users);
app.use("/auth", auth);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
}); 