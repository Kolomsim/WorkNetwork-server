import jwt from 'jsonwebtoken'
import { signatureAccess, signatureRefresh } from './constants.js'

const accessTokenAge = 60 * 60 * 1000
export const refreshTokenAge = 14 * 24 * 60 * 60 * 1000

export const generateTokens = userId => ({
	accessToken: jwt.sign({ userId }, signatureAccess, {
		expiresIn: accessTokenAge,
	}),
	refreshToken: jwt.sign({ userId }, signatureRefresh, {
		expiresIn: refreshTokenAge,
	}),
})
