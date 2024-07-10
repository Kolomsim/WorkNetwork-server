import crypto from 'crypto'

export default function generateSignature(url, secretKey) {
	const hmac = crypto.createHmac('sha256', secretKey)
	hmac.update(url)
	return hmac.digest('hex')
}
