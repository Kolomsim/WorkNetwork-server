import Forum from '../models/forumModel.js'

export const createForum = async (req, res) => {
	const { title, description, creator, attachments } = req.body

	try {
		const newForum = new Forum({
			title,
			description,
			creator,
			attachments,
		})

		console.log('форум' + newForum)

		const savedForum = await newForum.save()

		res.status(201).json({
			_id: savedForum._id,
			title: savedForum.title,
			description: savedForum.description,
			creator: savedForum.creator,
			createdAt: savedForum.createdAt,
			attachments: savedForum.attachments,
		})
	} catch (error) {
		console.error('Произошла ошибка при создании форума:', error)
		res.status(500).json({ error: 'Произошла ошибка при создании форума' })
	}
}

export const getForums = async (req, res) => {
	try {
		const forums = await Forum.find().populate('attachments')

		res.status(200).json(forums)
	} catch (error) {
		console.error('Произошла ошибка при получении форумов:', error)
		res.status(500).json({ error: 'Произошла ошибка при получении форумов' })
	}
}
