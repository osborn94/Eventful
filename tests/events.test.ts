import request from "supertest"
import app from "../src/app.js"
import Event from "../src/models/event.model.js"
import User from "../src/models/user.model.js"
import jwt from "jsonwebtoken"

jest.mock("../src/jobs/index.js")
jest.mock("../src/jobs/reminder.worker.js")

let authCookie: string

beforeAll(async () => {
  const user = await User.create({
    name: "Test User",
    email: "testevents@test.com",
    password: "password123"
  })
  const token = jwt.sign({ id: user._id }, "testsecret")  // must match setup-mocks.ts
  authCookie = `token=${token}`
}, 30000)

describe("Event Routes", () => {

  describe("POST /api/v1/events", () => {
    it("should create event successfully", async () => {
      const response = await request(app)
        .post("/api/v1/events")
        .set("Cookie", authCookie)
        .send({
          title: "Test Event",
          description: "Test Description",
          location: "Lagos",
          price: 5000,
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
      console.log("POST response body:", response.body) 
      expect(response.status).toBe(201)
      expect(response.body.data.title).toBe("Test Event")

      const event = await Event.findOne({ title: "Test Event" })
      expect(event).not.toBeNull()
    })
  })

  describe("GET /api/v1/events", () => {
    it("should return events", async () => {
      await Event.create({
        title: "Sample Event",
        description: "Test",
        location: "Abuja",
        price: 2000,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })

      const response = await request(app)
        .get("/api/v1/events")

      expect(response.status).toBe(200)
      // Log body shape once to confirm structure:
      console.log("GET /events body:", JSON.stringify(response.body).slice(0, 200))
      
      // Adjust this based on what your API actually returns:
      expect(response.body.data.length).toBeGreaterThan(0)
    })
  })
})




















// import request from "supertest"
// import app from "../src/app.js"
// import Event from "../src/models/event.model.js"

// describe("Event Routes", () => {

//   describe("POST /api/v1/events", () => {

//     it("should create event successfully", async () => {

//       const response = await request(app)
//         .post("/api/v1/events")
//         .send({
//           title: "Test Event",
//           description: "Test Description",
//           location: "Lagos",
//           price: 5000,
//           date: new Date()
//         })

//       expect(response.status).toBe(201)

//       expect(response.body.title).toBe("Test Event")

//       const event = await Event.findOne({ title: "Test Event" })

//       expect(event).not.toBeNull()

//     })

//   })

//   describe("GET /api/v1/events", () => {

//     it("should return events", async () => {

//       await Event.create({
//         title: "Sample Event",
//         description: "Test",
//         location: "Abuja",
//         price: 2000,
//         date: new Date()
//       })

//       const response = await request(app)
//         .get("/api/v1/events")

//       expect(response.status).toBe(200)

//       expect(response.body.length).toBe(1)

//     })

//   })

// })