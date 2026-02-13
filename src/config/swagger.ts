import swaggerJsdoc from "swagger-jsdoc"

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Eventful API",
      version: "1.0.0",
      description: "API documentation for Eventful"
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token"
        }
      }
    }
  },
  // apis: ["./src/routes/*.ts"]
  apis: process.env.NODE_ENV === "production"
  ? ["./dist/routes/*.js"]
  : ["./src/routes/*.ts"]

})
