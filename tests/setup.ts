import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoose.connect(uri)
}, 30000)

afterEach(async () => {
  if (!mongoose.connection.db) return
  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) {
    await collection.deleteMany({})
  }
}, 30000)

afterAll(async () => {
  await mongoose.connection.close()
  await mongo.stop()
}, 30000)