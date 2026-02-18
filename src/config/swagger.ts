import swaggerJsdoc from "swagger-jsdoc"

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Eventful API",
      version: "1.0.0",
      description: "API documentation for Eventful"
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      }
    ],
    tags: [
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Events", description: "Event management" },
      { name: "Dashboard", description: "User dashboards" },
      { name: "Tickets", description: "Ticket operations" },
      { name: "Analytics", description: "Creator analytics" }
    ],

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
  ? ["./dist/routes/**/*.js"]
  : ["./src/routes/**/*.ts"]

})
