import jwt from 'jsonwebtoken'
import { signatureAccess } from './constants.js'

export const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	if (!authHeader) {
		return res.status(401).json({ error: 'Нет токена доступа' })
	}

	const token = authHeader.split(' ')[1]

	jwt.verify(token, signatureAccess, (err, decoded) => {
		if (err) {
			req.user = decoded
			return res.status(403).json({ error: 'Доступ получен' })
		}
		req.user = decoded
		next()
	})
}
