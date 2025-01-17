import {
	loginUser,
	logoutUser,
	signupUser,
} from '../controllers/authСontroller.js'
import express from 'express'

const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router
