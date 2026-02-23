import { listEvents } from "../../src/controllers/event.controller.js"

jest.mock("../../src/models/event.model.js", () => ({
  __esModule: true,
  default: {
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue([{ title: "Test Event" }])
        })
      })
    })
  }
}))

describe("Event Controller", () => {
  it("should return events", async () => {
    const req: any = {}
    const res = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as any

    await listEvents(req, res)

    expect(res.render).toHaveBeenCalledWith(
      "events/index",
      expect.objectContaining({ events: expect.any(Array) })
    )
  })
})