import { Router } from 'express'
import NearLocationsController from './app/controllers/NearLocationsController'

const routes = Router()

routes.get('/locations', NearLocationsController.show)

export default routes
