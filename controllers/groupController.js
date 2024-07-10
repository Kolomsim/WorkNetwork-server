import Group from '../models/groupModel.js'

export const createNewGroup = async (req, res) => {
	try {
		const {
			name,
			description,
			avatar,
			header,
			creator,
			admins,
			members,
			subscribers,
		} = req.body

		const newGroup = new Group({
			name,
			description,
			avatar,
			header,
			creator,
			admins,
			members,
			subscribers,
		})

		const savedGroup = await newGroup.save()
		if (savedGroup) {
			res.status(201).json({
				_id: savedGroup._id,
				name: savedGroup.name,
				description: savedGroup.description,
				avatar: savedGroup.avatar,
				header: savedGroup.header,
				creator: savedGroup.creator,
				admins: savedGroup.admins,
				members: savedGroup.members,
				subscribers: savedGroup.subscribers,
			})
		}
	} catch (error) {
		res.status(500).json({ error: 'Произошла ошибка при создании группы' })
	}
}

export const getAllGroups = async (req, res) => {
	try {
		const groups = await Group.find()
		res.json(groups)
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Произошла ошибка при получении списка групп' })
	}
}

export const getGroup = async (req, res) => {
	try {
		const groupId = req.params.id
		const group = await Group.findById(groupId).populate('creator')

		if (!group) {
			return res.status(404).json({ error: 'Группа не найдена' })
		}

		res.json(group)
	} catch (error) {
		res.status(500).json({ error: 'Произошла ошибка при получении группы' })
	}
}

export const createForum = async (req, res) => {
	try {
		const { id } = req.params
		const { title, description } = req.body

		const group = await Group.findById(id)
		if (!group) {
			return res.status(404).json({ error: 'Группа не найдена' })
		}

		const newForum = {
			title,
			description,
			posts: [],
		}

		group.forums.push(newForum)
		await group.save()

		res.status(201).json(newForum)
	} catch (error) {
		res.status(500).json({ error: 'Произошла ошибка при создании форума' })
	}
}
