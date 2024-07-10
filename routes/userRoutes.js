import express from 'express'
import {
	getUserInfo,
	updateUserProfile,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/id/:userId', getUserInfo)
router.get('/login/:username', getUserInfo)
router.get('/:username', getUserInfo)
router.put('/:username/edit', updateUserProfile)

export default router
