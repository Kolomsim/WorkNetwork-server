import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'

dotenv.config()

const db = process.env.DB_URL

mongoose
	.connect(db, {
		authSource: 'admin',
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Подключение к MongoDB успешно'))
	.catch(err => console.error('Ошибка подключения к MongoDB:', err))

const app = express()

const port = process.env.PORT

app.options('*', (req, res) => {
	res.set('Access-Control-Allow-Origin', '*')
	res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	res.send()
})

app.use((req, res, next) => {
	res.setHeader('Content-Security-Policy', "default-src 'self'")
	next()
})

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

app.use(express.json())

const server = http.createServer(app)

server.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})

app.use(express.static('public'))

import { authenticateToken } from './utils/authenticateToken.js'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import userRoutes from './routes/userRoutes.js'
import fileRoutes from './routes/fileRoutes.js'
import groupRoutes from './routes/groupRoutes.js'
import forumRoutes from './routes/forumRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

app.use('/auth', authRoutes)
app.use('/', authenticateToken, messageRoutes)
app.use('/', authenticateToken, chatRoutes)
app.use('/user', authenticateToken, userRoutes)
app.use('/files', fileRoutes)
app.use('/', authenticateToken, groupRoutes)
app.use('/', authenticateToken, forumRoutes)
app.use('/', authenticateToken, commentRoutes)
