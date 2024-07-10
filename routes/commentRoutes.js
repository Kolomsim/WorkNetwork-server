import express from 'express'
import {
	getComments,
	sendComment,
	deleteComments,
} from '../controllers/commentsController.js'

const router = express.Router()

router.get('/forums/:forumId/comments', getComments)
router.post('/forums/:forumId/comments', sendComment)
router.delete('/comments/:commentsId', deleteComments)

export default router
