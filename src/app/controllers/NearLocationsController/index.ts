import { Request, Response } from 'express'
import Location, { LocationDocument } from '../../models/Location'
import validateShowRequest from './showValidation'

const EARTH_SIZE = 3963.2

function convertKmToMiles(km: number): number {
  return km / 1.609
}

class NearLocationsController {
  async show(
    req: Request,
    res: Response<LocationDocument[]>
  ): Promise<Response<LocationDocument[]>> {
    const { lat, lng } = validateShowRequest(req)

    const location = await Location.where('locations').within({
      center: [lat, lng],
      radius: convertKmToMiles(60) / EARTH_SIZE,
      spherical: true,
    })

    return res.json(location)
  }
}

export default new NearLocationsController()
