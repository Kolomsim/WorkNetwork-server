import express from 'express'
import { getAllChats, makeNewChat } from '../controllers/chatController.js'

const router = express.Router()

router.get('/chats', getAllChats)
router.post('/chats', makeNewChat)

export default router
