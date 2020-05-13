import { Request, Response } from 'express'

class NearLocationsController {
  async index(req: Request, res: Response) {
    res.json({
      message: 'ola mundo',
    })
  }
}

export default new NearLocationsController()
