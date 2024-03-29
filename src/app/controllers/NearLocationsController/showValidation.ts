import { Request } from 'express'

export default function validateShowRequest(req: Request): { lat: number; lng: number; radius: number } {
  const { query } = req

  if (!query.lat) {
    throw new Error('Latitude parameter need to be informed')
  }

  if (!query.lng) {
    throw new Error('Longitude parameter need to be informed')
  }

  const lat = Number(query.lat)

  if (isNaN(lat)) {
    throw new Error('Latitude is not a number')
  }

  const lng = Number(query.lng)

  if (isNaN(lng)) {
    throw new Error('Longitude is not a number')
  }

  let radius = 0

  if (query.radius) {
    radius = Number(query.radius)

    if (isNaN(radius)) {
      throw new Error('Radius is not a number')
    }
  }

  return {
    lat,
    lng,
    radius,
  }
}
