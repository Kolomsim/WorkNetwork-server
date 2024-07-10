import multer from 'multer'
import File from '../models/fileModel.js'
import { fileTypes } from '../utils/constants.js'
import path from 'path'

const getFileTypeFolder = mimetype => {
	for (const [category, formats] of Object.entries(fileTypes)) {
		if (
			formats.includes(mimetype) ||
			(category !== 'other' && mimetype.startsWith(category))
		) {
			return category
		}
	}

	return 'other'
}

const timestamp = Date.now()
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const destinationFolder = `public/${getFileTypeFolder(file.mimetype)}`
		cb(null, destinationFolder)
	},
	filename: function (req, file, cb) {
		const modifiedFilename = file.originalname
			.replace(/[^\w.-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/_+/g, '-')
			.toLowerCase()
		const uniqueFilename = `${Date.now()}-${modifiedFilename}`
		cb(null, uniqueFilename)
	},
	createParentPath: true,
})

const upload = multer({ storage: storage }).single('file')

export const postFiles = async (req, res) => {
	upload(req, res, async function (err) {
		if (err) {
			console.error('Ошибка при загрузке файла:', err)
			return res.status(500).json({ error: 'Ошибка при загрузке файла' })
		}

		try {
			const { userId } = req.params
			const { filename, mimetype } = req.file
			const fileTypeFolder = getFileTypeFolder(mimetype)
			const filePath = path.join(`${fileTypeFolder}/`, filename)
			const newFile = new File({
				filename: filename,
				path: filePath,
				createdBy: userId,
				createdAt: timestamp,
			})
			console.log(newFile)
			await newFile.save()
			res
				.status(201)
				.json({ message: 'Файл успешно загружен', filePath: filePath })
		} catch (error) {
			console.error('Ошибка при сохранении файла в базу данных:', error)
			res
				.status(500)
				.json({ error: 'Ошибка при сохранении файла в базу данных' })
		}
	})
}

export const getFiles = async (req, res) => {
	try {
		const { userId } = req.params
		const files = await File.find({ createdBy: userId })
		const fileLinks = files.map(file => ({
			filename: file.filename,
			url: `${req.protocol}://${req.get('host')}/images/${file.filename}`,
		}))

		res.json(fileLinks)
	} catch (error) {
		console.error('Ошибка при получении файлов из базы данных:', error)
		res
			.status(500)
			.json({ error: 'Ошибка при получении файлов из базы данных' })
	}
}
