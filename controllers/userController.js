import User from '../models/userModel.js'

export const getUserInfo = async (req, res) => {
	try {
		const { username, userId } = req.params
		let user

		if (username) {
			user = await User.findOne({ username })
		} else if (userId) {
			user = await User.findById(userId)
		}

		if (user) {
			const userResInfo = {
				id: user._id,
				fullname: user.fullname,
				username: user.username,
				email: user.email,
				avatar: user.avatar
					? `${req.protocol}://${req.get('host')}/${user.avatar}`
					: null,
				education: user.education || '',
				contacts: user.contacts || '',
				dateOfBirth: user.dateOfBirth || '',
				workExperience: user.workExperience || '',
				additionalInfo: user.additionalInfo || '',
			}
			res.json(userResInfo)
		} else {
			res.status(404).json({ error: 'Пользователь не найден' })
		}
	} catch (error) {
		console.error('Ошибка при получении данных пользователя:', error)
		res.status(500).json({ error: 'Ошибка при получении данных пользователя' })
	}
}

export const updateUserProfile = async (req, res) => {
	try {
		const { username } = req.params
		const {
			fullname,
			avatar,
			education,
			contacts,
			dateOfBirth,
			workExperience,
			additionalInfo,
		} = req.body

		const updateFields = {}
		if (fullname) updateFields.fullname = fullname
		if (avatar) updateFields.avatar = avatar
		if (education) updateFields.education = education
		if (contacts) updateFields.contacts = contacts
		if (dateOfBirth) updateFields.dateOfBirth = dateOfBirth
		if (workExperience) updateFields.workExperience = workExperience
		if (additionalInfo) updateFields.additionalInfo = additionalInfo

		const updatedUser = await User.findOneAndUpdate(
			{ username: username },
			{ $set: updateFields },
			{ new: true }
		)

		if (updatedUser) {
			res.json(updatedUser)
		} else {
			res.status(404).json({ error: 'Пользователь не найден' })
		}
	} catch (error) {
		console.error('Ошибка при обновлении данных пользователя:', error)
		res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' })
	}
}
