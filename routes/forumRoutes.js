import express from 'express'
import { getForums, createForum } from '../controllers/forumController.js'

const router = express.Router()

router.post('/forums', createForum)
router.get('/forums', getForums)

export default router
