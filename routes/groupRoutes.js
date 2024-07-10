import express from 'express'
import {
	createNewGroup,
	getAllGroups,
	getGroup,
} from '../controllers/groupController.js'

const router = express.Router()

router.get('/groups', getAllGroups)
router.post('/groups', createNewGroup)
router.get('/groups/:id', getGroup)

export default router
