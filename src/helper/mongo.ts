import { ConnectionOptions } from 'mongoose'

require('dotenv/config')

const mongoURI = process.env.MONGO_URI

export function getMongoURI(): string {
  return mongoURI
}

export function getMongoOptionConnection(): ConnectionOptions {
  const options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  return options
}
