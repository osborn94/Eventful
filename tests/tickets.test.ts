import request from "supertest"
import app from "../src/app.js"
import Event from "../src/models/event.model.js"
import Ticket from "../src/models/ticket.model.js"
import User from "../src/models/user.model.js"
import jwt from "jsonwebtoken"

jest.mock("../src/jobs/index.js")
jest.mock("../src/jobs/reminder.worker.js")

let authCookie: string

beforeAll(async () => {
  const user = await User.create({
    name: "Ticket User",
    email: "testtickets@test.com",
    password: "password123"
  })
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? "testsecret")
  authCookie = `token=${token}`
})

describe("Ticket Routes", () => {
  it("should attend free event and create ticket", async () => {
    const event = await Event.create({
      title: "Free Event",
      slug: "free-event", 
      description: "Free",
      location: "Lagos",
      price: 0,
      date: new Date()
    })

    console.log("Event slug:", event.slug)

    const response = await request(app)
      .post(`/api/v1/tickets/events/${event.slug}/attend`)
      .set("Cookie", authCookie)

    expect(response.status).toBe(201)

    const ticket = await Ticket.findOne()
    expect(ticket).not.toBeNull()
  })
})
