process.env.JWT_SECRET = "testsecret"
process.env.NODE_ENV = "test"

const mockRedisInstance = {
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue("OK"),
  del: jest.fn().mockResolvedValue(1),
  on: jest.fn(),
  quit: jest.fn(),
  disconnect: jest.fn(),
}
const MockRedis = jest.fn().mockImplementation(() => mockRedisInstance)

jest.mock("ioredis", () => ({
  __esModule: true,
  Redis: MockRedis,
  default: MockRedis,
}))

jest.mock("bullmq", () => ({
  __esModule: true,
  Queue: jest.fn().mockImplementation(() => ({
    add: jest.fn(), close: jest.fn(), on: jest.fn(),
  })),
  Worker: jest.fn().mockImplementation(() => ({
    close: jest.fn(), on: jest.fn(),
  })),
  QueueScheduler: jest.fn().mockImplementation(() => ({
    close: jest.fn(), on: jest.fn(),
  })),
}))