import { Router } from 'express'
import NearLocationsController from './app/controllers/NearLocationsController'

const routes = Router()

routes.get('/', NearLocationsController.index)

export default routes
