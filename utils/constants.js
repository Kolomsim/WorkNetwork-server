export const signatureAccess = process.env.SIGNATURE_ACCESS
export const signatureRefresh = process.env.SIGNATURE_REFRESH

export const fileTypes = {
	images: ['image/jpeg', 'image/png', 'image/gif'],
	videos: ['video/mp4', 'video/mpeg'],
	documents: [
		'application/pdf',
		'application/vnd.ms-excel',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.oasis.opendocument.text',
	],
	audio: ['audio/mpeg', 'audio/wav'],
	archives: ['application/zip', 'application/x-rar-compressed'],
}
