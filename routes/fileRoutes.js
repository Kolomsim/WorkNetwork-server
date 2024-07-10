import express from 'express'
import { postFiles, getFiles } from '../controllers/fileController.js'

const router = express.Router()

router.post('/:userId', postFiles)
router.get('/:userId', getFiles)

export default router
