import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { getMongoOptionConnection } from '../../../helper/mongo'
import Location, { LocationModel } from '../../models/Location'
import NearLocationsController from '.'

describe('Near locations controller suite tests', () => {
  let mongod: MongoMemoryServer

  beforeAll(async () => {
    mongod = new MongoMemoryServer()
    await mongoose
      .connect(await mongod.getUri(), getMongoOptionConnection())
      .then(() => console.log('mongo connected'))
      .catch((e) => console.error('error to connect mongo ', e))
  })

  afterAll(async () => {
    await mongoose.connection.close()
    await mongod.stop()
  })

  test('should be defined', () => {
    expect(NearLocationsController).toBeDefined()
  })

  test('should throw an error if latitude is not passed via query', async (cb) => {
    const request: Request = ({
      query: {},
    } as unknown) as Request

    const response: Response = ({
      json: jest.fn(),
    } as unknown) as Response

    await expect(
      async () => await NearLocationsController.show(request, response)
    ).rejects.toThrowError('Latitude parameter need to be informed')

    cb()
  })

  test('should throw an error if latitude is passed but longitude is not passed via query', async (cb) => {
    const request: Request = ({
      query: {
        lat: -12.12,
      },
    } as unknown) as Request

    const response: Response = ({
      json: jest.fn(),
    } as unknown) as Response

    await expect(
      async () => await NearLocationsController.show(request, response)
    ).rejects.toThrowError('Longitude parameter need to be informed')

    cb()
  })

  test('should return response like empty location', async (cb) => {
    const request: Request = ({
      query: {
        lat: -12.12,
        lng: 24.02,
      },
    } as unknown) as Request

    const response: Response = ({
      json: (response) => response,
    } as unknown) as Response

    const result = await NearLocationsController.show(request, response)

    expect(result).toHaveLength(0)

    cb()
  })

  test('should return response with one record of location inside radius spherical', async (cb) => {
    const locationDocument: LocationModel = {
      id: 12,
      lat: -12,
      lng: 24,
      estabelecimento: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      telefone: '',
      particular: false,
      locations: {
        type: 'Point',
        coordinates: [-12, 24],
      },
    }
    await Location.create(locationDocument)

    const request: Request = ({
      query: {
        lat: -12.01,
        lng: 24.009,
      },
    } as unknown) as Request

    const response: Response = ({
      json: (response) => response,
    } as unknown) as Response

    const result = await NearLocationsController.show(request, response)

    expect(result).toHaveLength(1)

    cb()
  })

  test('should return response with none data if raius spherical not match', async (cb) => {
    const request: Request = ({
      query: {
        lat: -12.12,
        lng: 40.07,
      },
    } as unknown) as Request

    const response: Response = ({
      json: (response) => response,
    } as unknown) as Response

    const result = await NearLocationsController.show(request, response)

    expect(result).toHaveLength(0)

    cb()
  })

  test('should return response with two data if raius spherical match', async (cb) => {
    const locationDocument: LocationModel = {
      id: 12,
      lat: -12.03,
      lng: 24.05,
      estabelecimento: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      telefone: '',
      particular: false,
      locations: {
        type: 'Point',
        coordinates: [-12.01, 24.004],
      },
    }
    await Location.create(locationDocument)

    const request: Request = ({
      query: {
        lat: -12.003,
        lng: 24.006,
      },
    } as unknown) as Request

    const response: Response = ({
      json: (response) => response,
    } as unknown) as Response

    const result = await NearLocationsController.show(request, response)

    expect(result).toHaveLength(2)

    cb()
  })

  test('should throw if lat is not a number', async (cb) => {
    const request: Request = ({
      query: {
        lat: 'abc',
        lng: 24.05,
      },
    } as unknown) as Request

    const response: Response = ({
      json: (response) => response,
    } as unknown) as Response

    await expect(
      async () => await NearLocationsController.show(request, response)
    ).rejects.toThrowError('Latitude is not a number')

    cb()
  })

  test('should throw if lng is not a number', async (cb) => {
    const request: Request = ({
      query: {
        lat: '-12',
        lng: 'abc',
      },
    } as unknown) as Request

    const response: Response = ({
      json: (response) => response,
    } as unknown) as Response

    await expect(
      async () => await NearLocationsController.show(request, response)
    ).rejects.toThrowError('Longitude is not a number')

    cb()
  })
})
