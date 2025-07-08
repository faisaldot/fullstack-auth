import { Router } from 'express'
import { handleRegister } from './auth.controller'

const authRoute = Router()

authRoute.post('/register', handleRegister)

export default authRoute
