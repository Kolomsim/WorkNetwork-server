import express from 'express'
import {
	getMessages,
	sendMessage,
	deleteMessage,
} from '../controllers/messageContoller.js'

const router = express.Router()

router.get('/chats/:chatId/messages', getMessages)
router.post('/chats/:chatId/messages', sendMessage)
router.delete('/messages/:messageId', deleteMessage)

export default router
